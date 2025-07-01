import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import World from "./world";
import Stats from 'stats.js';
import { createUI } from "./ui";
import { Player } from "./player";
import { Physics } from "./physics";

console.log("Start");

//Render Setup

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement);

//camera

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight
);
camera.position.set(-32, 16, -32);


//Orbit control

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(16,0,16)
controls.update()

//scene
const scene = new THREE.Scene();

//World 
const world=new World()
world.generate()
scene.add(world)

//Physics

const physics=new Physics(scene)


//Player
const player=new Player(scene)

//FPS
const stats=new Stats()
document.body.append(stats.dom)
//Lights

function setUpLights() {
  const sun = new THREE.DirectionalLight();
  sun.position.set(50, 50, 50);
  sun.castShadow=true
  sun.shadow.camera.left=-50
  sun.shadow.camera.right=50
  sun.shadow.camera.top=50
  sun.shadow.camera.bottom=-50
  sun.shadow.camera.near=0.1
  sun.shadow.camera.far=100
  sun.shadow.bias=-0.0005;
  

  const ambient = new THREE.AmbientLight();
  ambient.intensity = 0.1;

  scene.add(sun, ambient);
}



//Loop
let prevoiusTime=performance.now()
function animate() {
  let currentTime=performance.now();
  let dt=(currentTime-prevoiusTime)/1000;
  requestAnimationFrame(animate);


  physics.update(dt,player,world)
  renderer.render(scene,player.controls.isLocked ? player.camera : camera);

  prevoiusTime=currentTime;
}
// Resize

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  player.camera.aspect = window.innerWidth / window.innerHeight;
  player.camera.updateProjectionMatrix();



  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);

  stats.update()
});





setUpLights();
createUI(world,player)
animate();
