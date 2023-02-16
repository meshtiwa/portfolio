

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial( { color: 0xC1EA48} );
const torus = new THREE.Mesh(geometry, material);

scene.add( torus );

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5,5,5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//scene.add(lightHelper);


//const controls = new OrbitControls(camera, renderer.domElement);






function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xFFFFFF});
  const star = new THREE.Mesh(geometry, material);

  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//background
const sherbertTexture = new THREE.TextureLoader().load('redsherbert.jpg');
scene.background = sherbertTexture;

//avatar
const animeshTexture = new THREE.TextureLoader().load('picofme.jpg');
const animesh = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map: animeshTexture})
);
scene.add(animesh);


//ball
const redTexture = new THREE.TextureLoader().load('redpoly.jpg');
const whitepolyTexture = new THREE.TextureLoader().load('redpoly.jpg');

const ball = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map: redTexture,
    normalMap: whitepolyTexture
  }));
scene.add(ball);

ball.position.setZ(27);
ball.position.setX(-5);

animesh.position.z = -5;
animesh.position.x = 2;



function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  ball.rotation.x += 0.05;
  ball.rotation.y += 0.075;
  ball.rotation.z += 0.05;

  animesh.rotation.y += 0.01;
  animesh.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

function animate(){
  requestAnimationFrame(animate);
  torus.rotation.x += 0.03;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  //controls.update();

  renderer.render(scene, camera);
}

animate();



