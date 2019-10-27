import boxTexture from '!file-loader?name=[name].[ext]!./uv_test_bw.png';

function ChessBox() {
  const geometry = new THREE.BoxBufferGeometry( 2, 2, 2 );
  const textureLoader = new THREE.TextureLoader();

  const texture = textureLoader.load(boxTexture);

  texture.encoding = THREE.sRGBEncoding;
  texture.anisotropy = 16;
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.MeshStandardMaterial({ map: texture });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

export default ChessBox;
