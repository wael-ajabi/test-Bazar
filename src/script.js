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
scene.background = new THREE.Color(0xdddddddd);
var fog = new THREE.FogExp2( 0xefd1b5, 0.1 );
scene.fog = fog

  
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Renderer
const renderer = new THREE.WebGLRenderer({
   canvas: canvas
})
renderer.toneMapping = THREE.ReinhardToneMapping
renderer.toneMappingExposure = 2.3
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = !0
renderer.shadowMap.enabled=true
// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );

// Materials
const gltfloader = new GLTFLoader();
var   mixer1=null
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
dracoLoader.preload();
gltfloader.setDRACOLoader(dracoLoader);
gltfloader.load("./CityLP_Wael.glb", function (gltf) {
    gltf.scene.traverse(n=>{if (n.isMesh){n.castShadow=true;n.receiveShadow=true;
    if(n.material.map){n.material.map.anisotropy=16;}
    }})
  console.log(gltf);
  mixer1 = new THREE.AnimationMixer(gltf.scene);
            const action = mixer1.clipAction(gltf.animations[0]);
            action.play();
  (gltf.scene.rotation.y = 3.1),
  (gltf.scene.position.y = -3);
  const cubeFolder1 = gui.addFolder('position');
  cubeFolder1.add(gltf.scene.position, 'x');
  cubeFolder1.add(gltf.scene.position, 'y');
  cubeFolder1.add(gltf.scene.position, 'z');
  cubeFolder1.add(gltf.scene.rotation, 'x');
  cubeFolder1.add(gltf.scene.rotation, 'y');
  cubeFolder1.add(gltf.scene.rotation, 'z');
  cubeFolder1.open();
    // gltf.scene.position.set(pos_x, pos_y, pos_z),
    // gltf.scene.scale.set(scale_x, scale_y, scale_z),
    (gltf.scene.castShadow = !0),
    (gltf.scene.receiveShadow = !0),
    scene.add(gltf.scene),
    (gltf.scene.userData.ground = !0);
});


//  * Sizes
//  */

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
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 1, 5000)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 2
scene.add(camera)

// Lights

// scene.add( new THREE.AmbientLight( 0xffffff,1 ) );

const hemiLight = new THREE.HemisphereLight( 0xa9a9a9a9,0xff8c31, 2 );
// pointLight.layers.set(1)
scene.add( hemiLight );

const spotLight = new THREE.SpotLight(0xffffff,20)
spotLight.position.set( 0, 2.6, -12.6 );
spotLight.scale.set( 0.005, 0.005, 0.005 );
spotLight.castShadow=true
spotLight.shadow.bias=-0.0001;
spotLight.shadow.mapSize.width=1024*4
spotLight.shadow.mapSize.height=1024*4
spotLight.shadow.bias=-0.0001;
scene.add(spotLight)
const spotLightHelper = new THREE.SpotLightHelper( spotLight );
scene.add( spotLightHelper );
const shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
				scene.add( shadowCameraHelper );

				//

// Controls
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


//  * Animate
//  */
// sky
// var sky = new Sky();
// sky.scale.setScalar(450000);
// scene.add(sky);

// var sun = new THREE.Vector3();

// const effectController = {
//     turbidity: 10,
//     rayleigh: 3,
//     mieCoefficient: 0.005,
//     mieDirectionalG: 0.7,
//     elevation: 2,
//     azimuth: 180,
//     exposure: renderer.toneMappingExposure,
// };

// function guiChanged() {
//     const uniforms = sky.material.uniforms;
//     uniforms["turbidity"].value = effectController.turbidity;
//     uniforms["rayleigh"].value = effectController.rayleigh;
//     uniforms["mieCoefficient"].value = effectController.mieCoefficient;
//     uniforms["mieDirectionalG"].value =
//         effectController.mieDirectionalG;

//     const phi = THREE.MathUtils.degToRad(
//         90 - effectController.elevation
//     );
//     const theta = THREE.MathUtils.degToRad(effectController.azimuth);

//     sun.setFromSphericalCoords(1, phi, theta);

//     uniforms["sunPosition"].value.copy(sun);

//     renderer.toneMappingExposure = effectController.exposure;
// }
// gui.add( effectController, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
// gui.add( effectController, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
// gui.add( effectController, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
// gui.add( effectController, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
// gui.add( effectController, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
// gui.add( effectController, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
// gui.add( effectController, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );
// guiChanged();

//particles
const geometry = new THREE.BufferGeometry();
				const vertices = [];

				const textureLoader = new THREE.TextureLoader();

				const sprite1 = textureLoader.load( './particle.png' );
				const sprite2 = textureLoader.load( './particle.png' );
				const sprite3 = textureLoader.load( './particle.png' );
				const sprite4 = textureLoader.load( './particle.png' );
				const sprite5 = textureLoader.load( './particle.png' );

				for ( let i = 0; i < 10000; i ++ ) {

					const x = Math.random() * 2000 - 1000;
					const y = Math.random() * 2000 - 1000;
					const z = Math.random() * 2000 - 1000;

					vertices.push( x, y, z );

				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

				var parameters = [
					[[ 1.0, 0.2, 0.5 ], sprite2, 2],
					[[ 0.95, 0.1, 0.5 ], sprite3, 2 ],
					[[ 0.90, 0.05, 0.5 ], sprite1, 2 ],
					[[ 0.85, 0, 0.5 ], sprite5, 2 ],
					[[ 0.80, 0, 0.5 ], sprite4, 2 ]
				];

				for ( let i = 0; i < parameters.length; i ++ ) {

					const color = parameters[ i ][ 0 ];
					const sprite = parameters[ i ][ 1 ];
					const size = parameters[ i ][ 2 ];
                    var materials
					 materials = new THREE.PointsMaterial( { size: size, map: sprite, blending: THREE.AdditiveBlending, depthTest: false, transparent: true } );
					materials.color.set(0xA0522D);
                    materials.fog=false

					const particles = new THREE.Points( geometry, materials );

					particles.rotation.x = Math.random() * 6;
					particles.rotation.y = Math.random() * 6;
					particles.rotation.z = Math.random() * 6;

					scene.add( particles );
                }
////////////


const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()/100

    // Update objects

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)
// spotLight.position.set(camera.position.x+10,camera.position.y+10,camera.position.z+10)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

    for ( let i = 0; i < scene.children.length; i ++ ) {

        const object = scene.children[ i ];

        if ( object instanceof THREE.Points ) {

            object.rotation.y = elapsedTime * ( i < 4 ? i + 1 : - ( i + 1 ) );

        }

    }


}

tick()
