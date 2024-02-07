import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import "./styles.css";

// Импорт только необходимых классов из THREE

// Инициализация сцены
const scene = new THREE.Scene();

// Инициализация камеры
const cameraConfig = {
  fov: 75,
  aspect: window.innerWidth / window.innerHeight,
  near: 0.1,
  far: 1000,
};
const camera = new THREE.PerspectiveCamera(
  cameraConfig.fov,
  cameraConfig.aspect,
  cameraConfig.near,
  cameraConfig.far
);
const canvas = document.querySelector("canvas");
// Инициализация рендерера
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
const loader = new FontLoader();
// Создание текста
function createText() {
  loader.load("./fonts/helvetiker_regular.typeface.json", function (font) {
    const geometry = new TextGeometry("Hello Friend !", {
      font: font,
      size: 8,
      height: 1.5,
    });
    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(geometry, textMaterial);
    textMesh.position.x = -30;
    textMesh.position.y = 0;
    textMesh.position.z = -10;
    scene.add(textMesh);
  });
}

createText();
// Кнопка старт
function createStartButton() {
  const buttonGeometry = new THREE.PlaneGeometry(15, 10);
  const buttonMaterial = new THREE.MeshBasicMaterial({
    color: 0x808080,
    transparent: true,
    opacity: 0,
  });
  const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.x = 0;
  buttonMesh.position.y = -10;
  buttonMesh.position.z = -10;
  scene.add(buttonMesh);
  const raycaster = new THREE.Raycaster();
  // Добавить логику для обработки клика на кнопку
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
      if (obj === buttonMesh) {
        window.location.href = "./earth.html";
      }
    }
  }
  canvas.addEventListener("click", handleClick);
  // load
  loader.load("./fonts//helvetiker_regular.typeface.json", function (font) {
    const buttonTextGeometry = new TextGeometry("Start", {
      font: font,
      size: 3,
      height: 1,
    });
    const buttonTextMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });
    const buttonTextMesh = new THREE.Mesh(
      buttonTextGeometry,
      buttonTextMaterial
    );
    buttonTextMesh.position.x = -4;
    buttonTextMesh.position.y = -12;
    buttonTextMesh.position.z = -10;
    scene.add(buttonTextMesh);
  });
}
createStartButton();
// Создание звезд
function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });
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
createStars();

// Позиция камеры
camera.position.z = 25;

// Обработка изменения размера окна
function handleResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener("resize", handleResize);

// Анимация
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  // Анимация вращения текста
}
animate();
