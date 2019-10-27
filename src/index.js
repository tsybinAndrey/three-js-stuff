import 'three/examples/js/controls/OrbitControls';
// import ChessBox from './ChessBox';
import Train from './Train';

// reset css
import './index.css';

// Load the favicon
import '!file-loader?name=[name].[ext]!./favicon.ico';
/**
 * Main Visualisation class
 * domElementContainer - reference to our app container
 */
class Visualisation {
  constructor({
    domElementContainer,
    cameraOptions: {
      fov, near, far,
    },
  }) {
    this.container = domElementContainer;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      fov,
      domElementContainer.clientWidth / domElementContainer.clientHeight,
      near,
      far,
    );
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.controls = new THREE.OrbitControls(this.camera, this.container);
  }

  init() {
    this.camera.position.set(-5, 5, 10);

    this.scene.background = new THREE.Color('skyblue');

    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.renderer.gammaFactor = 2.2;
    this.renderer.gammaOutput = true;
    this.renderer.physicallyCorrectLights = true;

    this.container.appendChild(this.renderer.domElement);

    return this;
  }

  setupLight() {
    const ambientLight = new THREE.HemisphereLight(
      0xddeeff, // bright sky color
      0x202020, // dim ground color
      3, // intensity
      );
    
    const light = new THREE.DirectionalLight(0xffffff, 3.0);
    
    light.position.set( 10, 10, 10 );

    this.scene.add( ambientLight, light );

    return this;
  }

  render() {
    this.renderer.setAnimationLoop(() => {
      this.renderer.render( this.scene, this.camera );
    });

    return this;
  }

  resizeEventHandler() {
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;

    // update the camera's frustum
    this.camera.updateProjectionMatrix();
  
    // update the size of the renderer AND the canvas
    this.renderer.setSize( this.container.clientWidth, this.container.clientHeight );
  }
}

const visualization = new Visualisation({
  domElementContainer: document.getElementById('scene-container'),
  cameraOptions: {
    fov: 35,
    near: 0.5,
    far: 1000,
  },
});

// const chessBox = new ChessBox();
const train = new Train();
visualization.scene.add(train);

window.addEventListener('resize', visualization.resizeEventHandler);

visualization.init().setupLight().render();
