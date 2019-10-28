import 'three/examples/js/controls/OrbitControls';
// import ChessBox from './ChessBox';
import Train from './Train';

// reset css
import './index.css';

// Load the favicon
import '!file-loader?name=[name].[ext]!./favicon.ico';

/**
 * Things needed for developing 3D shit
 */
function configureScene({ color }) {
  const scene = new THREE.Scene();

  scene.background = new THREE.Color(color);

  return scene;
}

function configureCamera({ fov, near, far, aspectRatio }, { x, y, z }) {
  const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

  // set camera position
  camera.position.set(x, y, z);

  return camera;
}

function configureLight(
  hemisphereLightOptions,
  directionalLightOptions,
) {
  const ambientLight = new THREE.HemisphereLight(
    hemisphereLightOptions.color,
    hemisphereLightOptions.dimColor,
    hemisphereLightOptions.intensity,
  );
  
  const light = new THREE.DirectionalLight(
    directionalLightOptions.color,
    directionalLightOptions.intensity,
  );
  
  light.position.set( 
    directionalLightOptions.position.x,
    directionalLightOptions.position.y,
    directionalLightOptions.position.z,
  );

  return { ambientLight, light };
}

function configureRenderer({
  devicePixelRatio,
  clientHeight,
  clientWidth,
}) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });

  renderer.setSize(clientWidth, clientHeight);
  renderer.setPixelRatio(devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;
  renderer.physicallyCorrectLights = true;

  return renderer;
}

function render({ renderer, camera, scene }) {
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
}

function getAspectRatio(container) {
  return container.clientWidth / container.clientHeight;
}

/**
 * Setup the main parts
 */
const appContainer = document.getElementById('scene-container');
const scene = configureScene({ color: 'skyblue' });
const camera = configureCamera({
  fov: 45,
  near: 1,
  far: 1000,
  aspectRatio: getAspectRatio(appContainer),
}, {
  x: -5,
  y: 5,
  z: 10,
});
const {ambientLight, light} = configureLight({
  color: 0xddeeff,
  dimColor: 0x202020, 
  intensity: 3,
}, {
  color: 0xffffff,
  intensity: 3,
  position: {
    x: -10,
    y: -10,
    z: 10,
  }
});
const renderer = configureRenderer({
  devicePixelRatio: window.devicePixelRatio,
  clientHeight: appContainer.clientHeight,
  clientWidth: appContainer.clientWidth,
});

appContainer.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, appContainer);

window.addEventListener('resize', () => {
  camera.aspect = getAspectRatio(appContainer);

  camera.updateProjectionMatrix();

  renderer.setSize(appContainer.clientWidth, appContainer.clientHeight);
});

// const chessBox = new ChessBox();
const train = new Train();


scene.add(ambientLight, light);
scene.add(train);

render({
  renderer,
  camera,
  scene,
});

