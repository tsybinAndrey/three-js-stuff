import 'three/examples/js/loaders/GLTFLoader';

export function renderChair(scene) {
  const loader = new THREE.GLTFLoader();

  loader.load(
    '/chair/chair.gltf',
    function ( gltf ) {
      const root = gltf.scene;
      root.position.y = 1;
      root.scale.set(0.002, 0.002, 0.002);
      scene.add( root );
    },
    function(xhr) {
      console.log(( xhr.loaded / xhr.total * 100 ) + '% loaded');
    },
    function ( error ) {
      console.log(error);
    },
  );
}

