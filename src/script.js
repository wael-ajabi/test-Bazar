import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import * as dat from "dat.gui";

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(12571109);

//fog
const fog=new THREE.Fog('#262837',1,5)
scene.fog=fog

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials
const gltfloader = new GLTFLoader();
var   mixer1=null
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
dracoLoader.preload();
gltfloader.setDRACOLoader(dracoLoader);
gltfloader.load("./LevelTest.glb", function (gltf) {
  console.log(gltf);
  mixer1 = new THREE.AnimationMixer(gltf.scene);
            const action = mixer1.clipAction(gltf.animations[0]);
            action.play();
  (gltf.scene.rotation.y = 3.1),
    // gltf.scene.position.set(pos_x, pos_y, pos_z),
    // gltf.scene.scale.set(scale_x, scale_y, scale_z),
    (gltf.scene.castShadow = !0),
    (gltf.scene.receiveShadow = !0),
    scene.add(gltf.scene),
    (gltf.scene.userData.ground = !0);
});

// Lights

const pointLight = new THREE.DirectionalLight(16777215, 6);
const light = new THREE.PointLight( 0xff0000, 4, 100 );
pointLight.position.x = 2 ;
  pointLight.position.y = 3 ;
   pointLight.position.z = 4 ;
light.position.set( 50, 50, 50 );
scene.add( light );
scene.add(pointLight,light)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.gammaOutput = !0
    renderer.gammaFactor = 2
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 2
scene.add(camera)

// Controls
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

//orbit angle limitation
controls.maxPolarAngle =  Math.PI * 0.4;
//orbit zoom limitation
controls.minDistance = 1;
controls.maxDistance = 3;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = !0
/**
 * Animate
 */
// sky
var sky = new Sky();
sky.scale.setScalar(450000);
scene.add(sky);

var sun = new THREE.Vector3();

const effectController = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.7,
    elevation: 2,
    azimuth: 180,
    exposure: renderer.toneMappingExposure,
};

function guiChanged() {
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = effectController.turbidity;
    uniforms["rayleigh"].value = effectController.rayleigh;
    uniforms["mieCoefficient"].value = effectController.mieCoefficient;
    uniforms["mieDirectionalG"].value =
        effectController.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(
        90 - effectController.elevation
    );
    const theta = THREE.MathUtils.degToRad(effectController.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);

    renderer.toneMappingExposure = effectController.exposure;
}
gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );
guiChanged();


const clock = new THREE.Clock()
var oldElaspsedTime=0
const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()
    var deltaTime=elapsedTime-oldElaspsedTime
    oldElaspsedTime=elapsedTime

    // update mixer
if(mixer1){

    mixer1.update(deltaTime)
}

    // Update objects

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()