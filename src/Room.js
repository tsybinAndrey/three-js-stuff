function createMaterials() {
  const floor = new THREE.MeshStandardMaterial({
    color: 0x111111,
    flatShading: true,
  });

  const wall = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    flatShading: true,
  })

  return {floor, wall}
}

function createGeometries() {
  const floor = new THREE.BoxBufferGeometry(20, 0.5, 20);

  const wall = new THREE.BoxBufferGeometry(0.5, 2, 20);

  return {floor, wall};
}

function Room() {
  const materials = createMaterials();
  const geometries = createGeometries();

  const floor = new THREE.Mesh(geometries.floor, materials.floor);

  const wall = new THREE.Mesh(geometries.wall, materials.wall);
  wall.position.y = 0.75;

  const wallUp = wall.clone();
  wallUp.rotation.y = Math.PI / 2;
  wallUp.position.z = 10

  const wallDown = wall.clone();
  wallDown.rotation.y = Math.PI / 2;
  wallDown.position.z = -10

  const wallLeft = wall.clone();
  wallLeft.position.set(10, 0.75, 0);

  const wallRight = wall.clone();
  wallRight.position.x = -10;

  const room = new THREE.Group();

  room.add(floor, wallLeft, wallRight, wallUp, wallDown);

  return room;
}

export default Room;