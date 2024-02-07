import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";
import vertexShader from "./shaders/vertex.glsl";
import fragmentShader from "./shaders/fragment.glsl";
import atmosphereVertexShader from "./shaders/atmosphereVetex.glsl";
import atmosphereFragmentShader from "./shaders/atmosphereFragment.glsl";

// scene
const scene = new THREE.Scene();
// camera
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

const canvas = document.querySelector("canvas");
// renderer
function createRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: canvas,
    preserveDrawingBuffer: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio || 1);

  return renderer;
}
const renderer = createRenderer();

//Earth
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      globeTexure: {
        value: new THREE.TextureLoader().load("./img/textures/earth.jpg"),
      },
    },
  })
);
scene.add(sphere);
var textureLoader = new THREE.TextureLoader();
// Asteroid_1
var asteroid1Textrure = textureLoader.load(
  "./img/textures/rocks_ground_04_diff_4k.jpg"
);
var Asteroid1Geometry = new THREE.SphereGeometry(4, 32, 32);
var asteroid1Material = new THREE.MeshBasicMaterial({
  map: asteroid1Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid1 = new THREE.Mesh(Asteroid1Geometry, asteroid1Material);
asteroid1.position.set(20, 0, 10);
scene.add(asteroid1);
// asteroid_2
var asteroid2Textrure = textureLoader.load("./img/textures/rock_fitness.jpg");
var Asteroid2Geometry = new THREE.SphereGeometry(4, 32, 32);
var asteroid2Material = new THREE.MeshBasicMaterial({
  map: asteroid2Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid2 = new THREE.Mesh(Asteroid2Geometry, asteroid2Material);
asteroid2.position.set(-30, 0, 5);
scene.add(asteroid2);
// asteroid3
var asteroid3Textrure = textureLoader.load("./img/textures/rock-thrive.jpg");
var Asteroid3Geometry = new THREE.SphereGeometry(3, 32, 32);
var asteroid3Material = new THREE.MeshBasicMaterial({
  map: asteroid3Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid3 = new THREE.Mesh(Asteroid3Geometry, asteroid3Material);
asteroid3.position.set(-20, -5, 5);
scene.add(asteroid3);
// asteroid4
var asteroid4Textrure = textureLoader.load("./img/textures/rock-powepoint.jpg");
var Asteroid4Geometry = new THREE.SphereGeometry(3, 32, 32);
var asteroid4Material = new THREE.MeshBasicMaterial({
  map: asteroid4Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid4 = new THREE.Mesh(Asteroid4Geometry, asteroid4Material);
asteroid4.position.set(15, -5, 5);
scene.add(asteroid4);
// asteroid5
var asteroid5Textrure = textureLoader.load("./img/textures/rock-bose.jpg");
var Asteroid5Geometry = new THREE.SphereGeometry(3, 32, 32);
var asteroid5Material = new THREE.MeshBasicMaterial({
  map: asteroid5Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid5 = new THREE.Mesh(Asteroid5Geometry, asteroid5Material);
asteroid5.position.set(-5, -10, 10);
scene.add(asteroid5);
// asteroid6
var asteroid6Textrure = textureLoader.load("./img/textures/rock-diplom.jpg");
var Asteroid6Geometry = new THREE.SphereGeometry(3, 32, 32);
var asteroid6Material = new THREE.MeshBasicMaterial({
  map: asteroid6Textrure,
  blending: THREE.AdditiveBlending,
  side: THREE.FrontSide,
});
const asteroid6 = new THREE.Mesh(Asteroid6Geometry, asteroid6Material);
asteroid6.position.set(5, -10, 10);
scene.add(asteroid6);
// create atmosphere
const atmosphere = new THREE.Mesh(
  new THREE.SphereGeometry(5, 50, 50),
  new THREE.ShaderMaterial({
    vertexShader: atmosphereVertexShader,
    fragmentShader: atmosphereFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.FrontSide,
  })
);

atmosphere.scale.set(1.1, 1.1, 1.1);
scene.add(atmosphere);
function CreateStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
  });
  const starVertices = [];
  for (let i = 0; i < 10000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = -Math.random() * 3000;

    starVertices.push(x, y, z);
  }
  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

camera.position.z = 30;
//Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Анимация требуется, когда включены затухание или автоматическое вращение
controls.dampingFactor = 0.25;
controls.enablePan = true; // Включить перемещение (панорамирование)
controls.enableZoom = true; // Включить масштабирование (приближение / отдаление)
controls.enableRotate = true; // Включить вращение
controls.minDistance = 10; // Минимальное расстояние от камеры до цели
controls.maxDistance = 100; // Максимальное расстояние от камеры до цели
controls.minPolarAngle = 0; // Минимальный полюсный угол (вертикальный угол)
controls.maxPolarAngle = Math.PI; // Максимальный полюсный угол (вертикальный угол)
controls.enableRotate = false;
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleResize);
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  sphere.rotation.y += 0.004;
  // Измените направление вращения сферы
  asteroid1.rotation.y += 0.002;
  asteroid1.rotation.x -= 0.002;
  asteroid2.rotation.y += 0.002;
  asteroid2.rotation.x -= 0.002;
  asteroid3.rotation.y += 0.001;
  asteroid3.rotation.x -= 0.002;
  asteroid4.rotation.y += 0.001;
  asteroid4.rotation.x -= 0.002;
  asteroid5.rotation.y += 0.001;
  asteroid5.rotation.x -= 0.002;
  asteroid6.rotation.y += 0.001;
  asteroid6.rotation.x -= 0.002;
}
const raycaster = new THREE.Raycaster();
function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const mouse = new THREE.Vector2(
    ((event.clientX - rect.left) / rect.width) * 2 - 1,
    -((event.clientY - rect.top) / rect.height) * 2 + 1
  );
  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObjects(scene.children);

  for (let i = 0; i < intersects.length; i++) {
    const obj = intersects[i].object;
    if (obj === asteroid1) {
      window.location.href = "https://raider2019.github.io/Resume/";
    } else if (obj === asteroid2) {
      window.location.href = "https://raider2019.github.io/FitnessMeteor/";
    } else if (obj === asteroid3) {
      window.location.href = "https://raider2019.github.io/ThirveTalk/#home";
    } else if (obj === asteroid4) {
      window.location.href = "https://raider2019.github.io/PowerPointTemp/";
    } else if (obj === asteroid5) {
      window.location.href = "https://raider2019.github.io/BOSE/";
    } else if (obj === asteroid6) {
      window.location.href = "http://raider2019.pythonanywhere.com/index";
    }
  }
}
canvas.addEventListener("click", handleClick);
animate();
CreateStars();
