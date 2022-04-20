import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import * as dat from "dat.gui";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
			import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
            import gsap from "gsap";

// Debug
const gui = new dat.GUI();
// let composer
// Canvas
const canvas = document.querySelector('canvas.webgl')
// const params = {
//     exposure: 1,
//     bloomStrength: 1.5,
//     bloomThreshold: 0,
//     bloomRadius: 0
// };
// Scene
const scene = new THREE.Scene()
// scene.background = new THREE.Color(0x000000);
// var fog = new THREE.FogExp2( new THREE.Color("rgb(133, 117, 223)"), 0.100 );
// scene.fog = fog

    // const color = 0xFFFFFF;  // white
    // const near = 3;
    // const far = 5;
    // scene.fog = new THREE.Fog(color, near, far);
  
  
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
gltfloader.load("./CityTest_Final.glb", function (gltf) {
    gltf.scene.traverse(n=>{if (n.isMesh){n.castShadow=true;n.receiveShadow=true;
    if(n.material.map){n.material.map.anisotropy=16;}
    }})
  console.log(gltf);
  mixer1 = new THREE.AnimationMixer(gltf.scene);
            const action = mixer1.clipAction(gltf.animations[1]);
            action.play();
  (gltf.scene.rotation.y = 3.1),
  (gltf.scene.position.y = -3),
  (gltf.scene.position.x = -3.5);
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
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.05, 5000)
camera.position.x = 5.3
camera.position.y = -0.2
camera.position.z = 9
scene.add(camera)
gsap.to(camera.position,{duration:4, z: 5,  ease: "power1.inOut"},3)
gsap.to(camera.position,{duration:4,y:1 ,ease: "power1.inOut"},"-=1")
gsap.to(camera.position,{duration:4,x:2 ,ease: "power1.inOut"},"-=1")
gsap.to(camera.position,{duration:4,z:0.5 ,ease: "power1.inOut"},"-=1")
gsap.to(camera.position,{duration:4,y:-0.05 ,ease: "power1.inOut"},"-=1")
gsap.to(camera.rotation,{duration:1,y:1 ,ease: "power1.inOut"},"-=1")
// Lights

// const renderScene = new RenderPass( scene, camera );

// const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// 				bloomPass.threshold = params.bloomThreshold;
// 				bloomPass.strength = params.bloomStrength;
// 				bloomPass.radius = params.bloomRadius;

// 				composer = new EffectComposer( renderer );
// 				composer.addPass( renderScene );
// 				composer.addPass( bloomPass );
scene.add( new THREE.AmbientLight( 0xffffff,1 ) );

// const hemiLight = new THREE.HemisphereLight( 0xa9a9a9a9,0xff8c31, 2 );
// // pointLight.layers.set(1)
// // scene.add( hemiLight );

// const spotLight = new THREE.SpotLight(0xffffff,50)
// spotLight.position.set( 0, 2.6, -12.6 );
// spotLight.scale.set( 0.005, 0.005, 0.005 );
// spotLight.castShadow=true
// spotLight.shadow.bias=-0.0001;
// spotLight.shadow.mapSize.width=1024*4
// spotLight.shadow.mapSize.height=1024*4
// spotLight.shadow.bias=-0.0001;
// scene.add(spotLight)
// const spotLightHelper = new THREE.SpotLightHelper( spotLight );
// scene.add( spotLightHelper );
// const shadowCameraHelper = new THREE.CameraHelper( spotLight.shadow.camera );
// 				scene.add( shadowCameraHelper );

				//
const pointLight = new THREE.PointLight(0xffffff,3.66,2)
// pointLight.position.set(-3.320,2.900,0.272)
pointLight.scale.set(1,1,1)
pointLight.intensity=5
pointLight.frustumCulled=true
scene.add(pointLight)
const pointLightHelper= new THREE.PointLightHelper(pointLight)
scene.add(pointLightHelper)
// const shadowCameraHelper2 = new THREE.CameraHelper( pointLight.shadow.camera );
// 				scene.add( shadowCameraHelper2 );

// Controls
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {

//     renderer.toneMappingExposure = Math.pow( value, 4.0 );

// } );

// gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {

//     bloomPass.threshold = Number( value );

// } );

// gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {

//     bloomPass.strength = Number( value );

// } );

// gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

//     bloomPass.radius = Number( value );

// } );

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

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("./galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
});

// galaxy mesh
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);

//sun object
// const color2 = new THREE.Color("#FDB813");
// const geometry2 = new THREE.IcosahedronGeometry(1, 15);
// const material = new THREE.MeshBasicMaterial({ color: color2 });
// const sphere = new THREE.Mesh(geometry2, material);
// sphere.fog=false
// geometry2.fog=false
// material.fog=false
// sphere.position.set(-50, 20, -60);
// sphere.scale.set(5, 5, 5);
// scene.add(sphere);


//moon geometry
const moongeometry = new THREE.SphereGeometry(0.1, 32, 32);

//moon material
const moonMaterial = new THREE.MeshPhongMaterial({
  roughness: 5,
  metalness: 0,
  map: THREE.ImageUtils.loadTexture("./moonmap4k.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("./moonbump4k.jpg"),
  bumpScale: 0.02,
  fog:false
});

//moonMesh
const moonMesh = new THREE.Mesh(moongeometry, moonMaterial);
moonMesh.receiveShadow = true;
moonMesh.castShadow = true;
moonMesh.position.x = 2;
moonMesh.position.set(-50, 20, -60);
moonMesh.scale.set(30,30,30)
scene.add(moonMesh);


//particles
const geometry = new THREE.BufferGeometry();
				const vertices = [];

                if (mixer1){mixer1.update()}
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
					[[ 1.0, 0.2, 0.5 ], sprite2, 1],
					[[ 0.95, 0.1, 0.5 ], sprite3, 1 ],
					[[ 0.90, 0.05, 0.5 ], sprite1, 1 ],
					[[ 0.85, 0, 0.5 ], sprite5, 1 ],
					[[ 0.80, 0, 0.5 ], sprite4, 1 ]
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

const tweenCamera1 = new TWEEN.Tween( {x: -5, y: 0, z: 10, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: -1, y: 0.5, z: 0.1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 12000 )
const tweenCamera2 = new TWEEN.Tween( {x: -1, y: 0.5, z: 0.1, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: 1, y: 0.1, z: -1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 12000 )

tweenCamera1.chain(tweenCamera2)


const updateCamera = function (object ) {
  camera.position.set(object.x, object.y, object.z);
  camera.lookAt(new THREE.Vector3(object.lookAtX, object.lookAtY, object.lookAtZ))
}
tweenCamera1.onUpdate(updateCamera)
tweenCamera2.onUpdate(updateCamera)

tweenCamera1.start()


const clock = new THREE.Clock()
//cam animation
const tick = () =>
{
    TWEEN.update()

    const elapsedTime = clock.getElapsedTime()/1500
    const elapsedTime2 = clock.getElapsedTime()/500

    // Update objects

    // Update Orbital Controls
    // controls.update()

    // Render
    
    renderer.render(scene, camera)

    // composer.render();

// spotLight.position.set(camera.position.x+10,camera.position.y+10,camera.position.z+10)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
    if(mixer1){

        mixer1.update(elapsedTime)
    }
    for ( let i = 0; i < scene.children.length; i ++ ) {

        const object = scene.children[ i ];

        if ( object instanceof THREE.Points ) {

            object.rotation.y = elapsedTime2 * ( i < 4 ? i + 1 : - ( i + 1 ) );

        }

    }

// console.log(camera.position);
}

tick()
