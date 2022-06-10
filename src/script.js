import './style.css'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Sky } from "three/examples/jsm/objects/Sky.js";
import * as dat from "dat.gui";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SAOPass  } from 'three/examples/jsm/postprocessing/SAOPass.js';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader.js';
			import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
      import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
      import TextSprite from '@seregpie/three.text-sprite';

            import gsap from "gsap";
import { Vector3 } from 'three';

            let composer;
            let	singleMaterial, zmaterial,nobjects, cubeMaterial;
            const materials1 = [], objects = [];


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
scene.background = new THREE.Color(0x000000);
var fonintensity=0.2

var fog = new THREE.FogExp2( new THREE.Color("rgb(188, 118, 067)"), fonintensity );
scene.fog = fog


    // const color = "rgb(133, 117, 223)";  // white
    // const near = 0.5;
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
// renderer.shadowMap.type=THREE.BasicShadowMap
// Objects
// const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
// Materials

const manager = new THREE.LoadingManager()

    manager.onLoad = function ( ) {
        console.log( "Loading complete!")
    }


    manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
        console.log(`Items loaded: ${itemsLoaded}/${itemsTotal}`)
    }

    manager.onError = function ( url ) {
        console.log( 'There was an error loading ' + url )
    }

const gltfloader = new GLTFLoader(manager);
var   mixer1=null
var   action=null
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
dracoLoader.preload();
// var blender_camera=null
gltfloader.setDRACOLoader(dracoLoader);
var totalSize = 4167680;
gltfloader.load("./city_7_without texture.glb", function (gltf) {
  console.log( gltf.scene.children[0].children[0].children[1].children[232])
  var mesh =gltf.scene.children[0].children[0].children[1].children[232]
  var texture = THREE.ImageUtils.loadTexture('./NormalMapDefinitiva in uso_1.jpg')
  texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 20, 20 );
  mesh.material.normalMap = texture;
  var basecolor = THREE.ImageUtils.loadTexture('./initialShadingGroup_Base_Color.png')
  mesh.material.map = basecolor;
  mesh.material.normalMap.needsUpdate = true;
  mesh.material.normalMap.updateMatrix();
  mesh.material.onBeforeCompile=(shader)=>{
    //console.log(shader.fragmentShader);
    shader.fragmentShader=shader.fragmentShader.replace("#include <normal_fragment_maps>",
    `vec3 mapN=texture2D( normalMap, vUv*vec2(6.0,2.0) ).xyz * 2.0 - 1.0;
    mapN.xy *= normalScale;
    normal = perturbNormal2Arb( - vViewPosition, normal, mapN, faceDirection );
    `)
    };
mesh.material.needsUpdate = true;
mesh.needsUpdate = true;

  var obj = gltf.scene;
  gltf.castShadow=true;gltf.receiveShadow=true;
    console.log(gltf);
    gltf.scene.traverse(n=>{if (n.isMesh){n.castShadow=true;n.receiveShadow=true;
    if(n.material.map){n.material.map.anisotropy=16;}
    }})
    // const cubeFolder2 = gui.addFolder('position');
    //     cubeFolder2.add( gltf.scene.children[9].position, 'x');
    //     cubeFolder2.add( gltf.scene.children[9].position, 'y');
    //     cubeFolder2.add( gltf.scene.children[9].position, 'z');
    //     cubeFolder2.add( gltf.scene.children[9].rotation, 'x');
    //     cubeFolder2.add( gltf.scene.children[9].rotation, 'y');
    //     cubeFolder2.add( gltf.scene.children[9].rotation, 'z');
    
    //     cubeFolder2.open();
    // blender_camera = gltf.cameras[0];
  mixer1 = new THREE.AnimationMixer(gltf.scene);
  for (var i=0;i<14;i++){
             action = mixer1.clipAction(gltf.animations[i]);
             action.play()

  }
  // scene.add(camera)
  (gltf.scene.rotation.y = 3.1),
  (gltf.scene.position.y = -3),
  (gltf.scene.position.x = -3.5);
    // gltf.scene.position.set(pos_x, pos_y, pos_z),
    // gltf.scene.scale.set(scale_x, scale_y, scale_z),
    (gltf.scene.castShadow = !0),
    (gltf.scene.receiveShadow = !0);
    (gltf.scene.userData.ground = !0);
    scene.add( obj );

    gltf.animations; // Array<THREE.AnimationClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
},function ( xhr ) {
    
  console.log( ( xhr.loaded / totalSize * 100 ) + '% loaded' );

  if (xhr.loaded / totalSize * 100 > 99.99) {
 }
},
// called when loading has errors
function ( error ) {

  console.log( 'An error happened' );

});
setTimeout(()=>{    document.getElementById( 'loading-screen' ).style.display='none'
},4000)
//loading
const loadingManager = new THREE.LoadingManager( () => {
	
  const loadingScreen = document.getElementById( 'loading-screen' );
  loadingScreen.classList.add( 'fade-out' );
  
  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
  
} );
const geomet = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geomet, material );
cube.name='cube'
cube.position.set(-0.8,-0.5,0.8)
cube.scale.set(0.4,0.5,0.8)
scene.add( cube );
cube.visible=false;
    // const cubeFolder2 = gui.addFolder('position');
    // cubeFolder2.add( cube.position, 'x')
    // cubeFolder2.add( cube.position, 'y')
    // cubeFolder2.add( cube.position, 'z')
    // cubeFolder2.add( cube.scale, 'x');
    // cubeFolder2.add( cube.scale, 'y');
    // cubeFolder2.add( cube.scale, 'z');

    // cubeFolder2.open();

    
    const cube2 = new THREE.Mesh( geomet, material );
    cube2.name='mercato'
    cube2.position.set(-0.101,-0.5,-0.24)
    cube2.scale.set(3.7,0.5,2.4)
    scene.add( cube2 );
    cube2.visible=false;
        const cube2Folder3 = gui.addFolder('positionsss');
        cube2Folder3.add( cube2.position, 'x')
        cube2Folder3.add( cube2.position, 'y')
        cube2Folder3.add( cube2.position, 'z')
        cube2Folder3.add( cube2.scale, 'x');
        cube2Folder3.add( cube2.scale, 'y');
        cube2Folder3.add( cube2.scale, 'z');
    
        cube2Folder3.open();
        const cube3 = new THREE.Mesh( geomet, material );
        cube3.name='Razzi'
        cube3.position.set(-1.2,-0.5,-0.41)
        cube3.scale.set(8,0.5,14)
        scene.add( cube3 );
        cube3.visible=false;
            // const cube3Folder2 = gui.addFolder('position');
            // cube3Folder2.add( cube3.position, 'x')
            // cube3Folder2.add( cube3.position, 'y')
            // cube3Folder2.add( cube3.position, 'z')
            // cube3Folder2.add( cube3.scale, 'x');
            // cube3Folder2.add( cube3.scale, 'y');
            // cube3Folder2.add( cube3.scale, 'z');
        
            // cube3Folder2.open();
// gltfloader.load("./BazarHouseGLB.glb", function (gltf) {
//     console.log(gltf);
    
//     gltf.scene.traverse(n=>{if (n.isMesh){n.castShadow=true;n.receiveShadow=true;
//     if(n.material.map){n.material.map.anisotropy=16;}
//     }})
//     const cubeFolder2 = gui.addFolder('position');
//     cubeFolder2.add( gltf.scene.position, 'x');
//     cubeFolder2.add( gltf.scene.position, 'y');
//     cubeFolder2.add( gltf.scene.position, 'z');
//     cubeFolder2.add( gltf.scene.rotation, 'x');
//     cubeFolder2.add( gltf.scene.rotation, 'y');
//     cubeFolder2.add( gltf.scene.rotation, 'z');

//     cubeFolder2.open();
//   console.log(gltf);
//   (gltf.scene.scale.set(4,4,4)),
//   (gltf.scene.position.y = -10),
//   (gltf.scene.position.z = 4.2),
//   (gltf.scene.position.x = 10.3);
//     // gltf.scene.position.set(pos_x, pos_y, pos_z),
//     // gltf.scene.scale.set(scale_x, scale_y, scale_z),
//     (gltf.scene.castShadow = !0),
//     (gltf.scene.receiveShadow = !0),
//     scene.add(gltf.scene),
//     (gltf.scene.userData.ground = !0);
// });


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
    renderer.gammaFactor = 5
})
renderer.gammaOutput = !0
renderer.gammaFactor = 2

/**
 * Camera
 */
// Base camera
var camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.005, 5000)
camera.position.x = -4.7
camera.position.y = -0.68
camera.position.z = 8.9
// camera.lookAt(20,20,20)


camera.rotation.set(77,77,77)
const cubeFolder1 = gui.addFolder('position');

cubeFolder1.add(camera.position, 'x');
cubeFolder1.add(camera.position, 'y');
cubeFolder1.add(camera.position, 'z');

cubeFolder1.open();
// scene.add(camera)
// Lights

// const renderScene = new RenderPass( scene, camera );

// const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// 				bloomPass.threshold = params.bloomThreshold;
// 				bloomPass.strength = params.bloomStrength;
// 				bloomPass.radius = params.bloomRadius;

// 				composer = new EffectComposer( renderer );
// 				composer.addPass( renderScene );
// 				composer.addPass( bloomPass );
// scene.add( new THREE.AmbientLight( 0xffffff,0.2 ) );

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
const pointLight3 = new THREE.PointLight(0xffffff,3.66,2)
pointLight3.position.set(-24,8,45)
pointLight3.scale.set(10,10,10)
pointLight3.intensity=20
pointLight3.frustumCulled=true
pointLight3.decay=1
pointLight3.distance=10
scene.add(pointLight3)
const pointLight3Helper= new THREE.PointLightHelper(pointLight3)
// scene.add(pointLight3Helper)
// const shadowCameraHelper4 = new THREE.CameraHelper( pointLight3.shadow.camera );
				// scene.add( shadowCameraHelper4 );

                // const cubeFolder1 = gui.addFolder('position');
                // cubeFolder1.add(pointLight3.position, 'x');
                // cubeFolder1.add(pointLight3.position, 'y');
                // cubeFolder1.add(pointLight3.position, 'z');
                // cubeFolder1.add(pointLight3.rotation, 'x');
                // cubeFolder1.add(pointLight3.rotation, 'y');
                // cubeFolder1.add(pointLight3.rotation, 'z');

                // cubeFolder1.open();
                

                
const pointLight4 = new THREE.PointLight(0xffffff,3.66,2)
    // pointLight4.position.set(-24,8,45)
pointLight4.scale.set(1,1,1)
pointLight4.position.x=-3.8
pointLight4.position.y=1.3
pointLight4.position.z=8.8
pointLight4.intensity=50
pointLight4.frustumCulled=true
pointLight4.decay=1
pointLight4.distance=2.5

scene.add(pointLight4)
const pointLight4Helper= new THREE.PointLightHelper(pointLight4)
  // scene.add(pointLight4Helper)
// const shadowCameraHelper4 = new THREE.CameraHelper( pointLight4.shadow.camera );
				// scene.add( shadowCameraHelper4 );

                const cubeFolder2 = gui.addFolder('positionss');
                cubeFolder2.add(pointLight4.position, 'x');
                cubeFolder2.add(pointLight4.position, 'y');
                cubeFolder2.add(pointLight4.position, 'z');
                cubeFolder2.add(pointLight4.rotation, 'x');
                cubeFolder2.add(pointLight4.rotation, 'y');
                cubeFolder2.add(pointLight4.rotation, 'z');

                cubeFolder2.open();
                



const PointLight2 = new THREE.PointLight(0xffffff,3.66,2)
// PointLight2.position.set(-3.320,2.900,0.272)
PointLight2.scale.set(1,1,1)
PointLight2.position.y=0.8
PointLight2.intensity=20
PointLight2.frustumCulled=true
PointLight2.shadow.bias = -0.0001;
// PointLight2.shadow.radius=8
//  PointLight2.shadow.mapSize.width=1024*4
//  PointLight2.shadow.mapSize.height=1024*4
PointLight2.distance=2.5
PointLight2.castShadow= true;
scene.add(PointLight2)
const PointLight2Helper= new THREE.PointLightHelper(PointLight2)
// scene.add(PointLight2Helper)
// const shadowCameraHelper3 = new THREE.CameraHelper( PointLight2.shadow.camera );
				// scene.add( shadowCameraHelper3 );
         

/////////////////////
                
                
const pointLight = new THREE.PointLight(0xffffff,3.66,2)
// pointLight.position.set(-3.320,2.900,0.272)
pointLight.scale.set(1,1,1)
pointLight.position.x=-3.5
pointLight.position.y=3
pointLight.position.z=3
pointLight.intensity=2
pointLight.frustumCulled=true
pointLight.decay=1
pointLight.distance=3.68
scene.add(pointLight)
const pointLightHelper= new THREE.PointLightHelper(pointLight)
// scene.add(pointLightHelper)
// const shadowCameraHelper2 = new THREE.CameraHelper( pointLight.shadow.camera );
				// scene.add( shadowCameraHelper2 );


//         const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );
                
// Controls
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle=Math.PI/1.8
controls.maxDistance=4  
controls.enabled=true
controls.target = new THREE.Vector3(15, 0, 8);
controls.update();

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

// galaxy geometry
const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
  map: THREE.ImageUtils.loadTexture("./galaxy1.png"),
  side: THREE.BackSide,
  transparent: true,
  fog:false
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
  map: THREE.ImageUtils.loadTexture("./moonmap4k1.jpg"),
  bumpMap: THREE.ImageUtils.loadTexture("./moonbump4k.jpg"),
  bumpScale: 0.02,
  fog:false,
  intensity:50
});

//moonMesh
const moonMesh = new THREE.Mesh(moongeometry, moonMaterial);
moonMesh.receiveShadow = true;
moonMesh.castShadow = true;
moonMesh.position.x = 2;
moonMesh.position.set(-27, 9, 52);
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

				for ( let i = 0; i < 25; i ++ ) {

					const x = Math.random() * 2000 - 1000;
					const y = Math.random() * 2000 - 1000;
					const z = Math.random() * 2000 - 1000;

					vertices.push( x, y, z );

				}

				geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

				var parameters = [
					[[ 1.0, 0.2, 0.5 ], sprite2, 5],
					[[ 0.95, 0.2, 0.5 ], sprite3, 5 ],
					[[ 0.90, 0.05, 0.5 ], sprite1, 5 ],
					[[ 0.85, 0, 0.5 ], sprite5, 5 ],
					[[ 0.80, 0, 0.5 ], sprite4, 5 ]
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
function  label(text,xstart,ystart,zstart,xfinish,yfinsh,zfinish){
  //adding names
const color2 = new THREE.Color("#C0C0C0");
const geometry2 = new THREE.IcosahedronGeometry(1, 15);
const material1 = new THREE.MeshBasicMaterial({ color: color2 });
const sphere = new THREE.Mesh(geometry2, material1);
sphere.fog=false
geometry2.fog=false
material1.fog=false
// sphere.position.set(-0.85, -0.5, 0.89);
sphere.position.set(xstart, ystart, zstart);
sphere.scale.set(0.01, 0.01, 0.01);
scene.add(sphere);

const material3 = new THREE.LineBasicMaterial({
	color: 0xC0C0C0
});



const material4 = new THREE.LineBasicMaterial({
	color: 0xC0C0C0
});

const points4 = [];
points4.push( new THREE.Vector3( - 8, 10, 0 ) );
points4.push( new THREE.Vector3( 0, 10, 0 ) );
points4.push( new THREE.Vector3( 3, 5, 0 ) );
points4.push( new THREE.Vector3( -8, 5, 0 ) );

const geometry4 = new THREE.BufferGeometry().setFromPoints( points4 );

const square = new THREE.Line( geometry4, material4 );
square.scale.set(0.05,0.05,0.05)
square.position.set(-1.2,-0.25,0.89)
// // square.position.set(-1.2,-0.25,0.89)
//  const cubeFolder2 = gui.addFolder('positions');
var  sprite = new TextSprite({
      text: text,
      fontFamily: 'Saira',
      fontSize: 0.09,
      color: '#FF0000',
      fontWeight: "bold",

    });
    // sprite.fontSize=0.3
    // // // scene.add(sprite);
    //  cubeFolder2.add(sprite.position, 'x');
    //  cubeFolder2.add(sprite.position, 'y');
    //  cubeFolder2.add(sprite.position, 'z');
    //  cubeFolder2.add(sprite.rotation, 'x');
    //  cubeFolder2.add(sprite.rotation, 'y');
    //  cubeFolder2.add(sprite.rotation, 'z');
    //  cubeFolder2.open();
    sprite.fog=false
    // sprite.position.set(-1.3  ,0.30,0.95)
    sprite.position.set(xfinish  ,yfinsh,zfinish)
    // sprite.add(line)
    const points = [];
    scene.add( sprite )
points.push( new THREE.Vector3(sphere.position.x, sphere.position.y,sphere.position.z ) );
points.push( new THREE.Vector3( sprite.position.x, sprite.position.y-0.07, sprite.position.z ) );
console.log(sprite.position);
const geometry3 = new THREE.BufferGeometry().setFromPoints( points );

const line = new THREE.Line( geometry3, material3 );
// line.position.set(-0.85, -0.5, 0.89);

scene.add( line )

  
}
// const tweenCamera1 = new TWEEN.Tween( {x: -5, y: 0, z: 10, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
//   .to( {x: -1, y: 0.5, z: 0.1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 18000 )
// const tweenCamera2 = new TWEEN.Tween( {x: -1, y: 0.5, z: 0.1, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
//   .to( {x: 1, y: 0.1, z: -1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 12000 )
const tweenCamera1 = new TWEEN.Tween( {x: -4.7, y: -0.68, z: 8.9 , lookAtX: 15, lookAtY: 0, lookAtZ: 0} )
  .to( {x: -1.62, y: 0.28, z: 6.28, lookAtX: 3, lookAtY: -5, lookAtZ: 0}, 10000 )
  // .to({x:-1,y:0.5,z:0.1,lookAtX: 0, lookAtY: -1, lookAtZ: 0}, 8000)
  const tweenCamera2 = new TWEEN.Tween( {x: -1.62, y: 0.28, z: 6.28, lookAtX: 3, lookAtY: -5, lookAtZ: 0} )
  .to({x:-1.89,y:0.97,z:3.9,lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 11000)
const tweenCamera3 = new TWEEN.Tween( {x:-1.89,y:0.97,z:3.9, lookAtX: 0, lookAtY:0, lookAtZ: 0} )
  .to( {x: -4, y: 0.8, z: -1.46, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 10000 )
  const tweenCamera4 = new TWEEN.Tween( {x: -4, y: 0.8, z: -1.46, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: 0.01, y: 0.8, z:-2.8, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 10000 )
  var camerarotation=false
  tweenCamera4.onComplete(function() {
    camerarotation=true
    controls.maxDistance=4
controls.maxPolarAngle=Math.PI/1.8 
controls.target = new THREE.Vector3(0, 0, 0);
label("Casa Di Bazzar",-0.85,-0.5,0.89,-1.3,0.30,0.95)
label("Mercato",-0.12,-0.5,-0.06,-0.30,0.5,-0.21)
label("Razzo",-0.87,-0.42,-0.19,-1.2,0.5,-0.57)
clearInterval(myInterval)

// sprite.position.set(-1.3  ,0.30,0.95)
// sphere.position.set(-0.85, -0.5, 0.89);
  })
tweenCamera1.chain(tweenCamera2)
tweenCamera2.chain(tweenCamera3)
tweenCamera3.chain(tweenCamera4)


const updateCamera = function (object ) {
  camera.position.set(object.x, object.y, object.z);
  camera.lookAt(new THREE.Vector3(object.lookAtX, object.lookAtY, object.lookAtZ))
}
tweenCamera1.onUpdate(updateCamera)
tweenCamera2.onUpdate(updateCamera)
tweenCamera3.onUpdate(updateCamera)
tweenCamera4.onUpdate(updateCamera)

var myInterval=null
document.getElementById('start-button').onclick=function(){
    document.getElementById('start-button').style.display='none'
     myInterval = setInterval(()=>{if(fog.density>0.39){return} ; if (fog.density<0.4){fonintensity+=0.01;fog.density=fonintensity , console.log(fonintensity);}}, 100);
     controls.maxDistance=4
    tweenCamera1.start()
    controls.enabled=true
    // controls.enablePan = false;
    const listener = new THREE.AudioListener();

    const audio = new THREE.Audio( listener );
    const file = './35059019_ambient-space-soundscape_by_andrewsound83_preview.mp3';

    if ( /(iPad|iPhone|iPod)/g.test( navigator.userAgent ) ) {

        const loader = new THREE.AudioLoader();
        loader.load( file, function ( buffer ) {

            audio.setBuffer( buffer );
            audio.play();

        } );

    } else {

        const mediaElement = new Audio( file );
        mediaElement.play();

        audio.setMediaElementSource( mediaElement );

    }

}
const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
const moveMouse = new THREE.Vector2();   // create once

/// bazar
function intersect(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube);
}
var clickActive=false
window.addEventListener('dblclick', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersect(clickMouse);
console.log(found);
if(found.length>0 && !clickActive){
  clickActive=true
    const tweenCamera3 = new TWEEN.Tween( {x: controls.object.position.x, y: controls.object.position.y, z: controls.object.position.z, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: -0.8+0.2, y: -0.5+0.1, z: 0.8, lookAtX: cube.position.x, lookAtY: cube.position.y, lookAtZ: cube.position.z}, 1000 )
tweenCamera3.onUpdate(updateCamera)
tweenCamera3.start()
controls.enabled=false
tweenCamera3.onComplete(function() {
  camerarotation=false
  document.getElementsByClassName('card')[0].style.display='block';
  document.getElementById('gui').style.display='block';
  document.getElementById('close').style.display='block'
  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.5,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  
  
})

}
})
var minPan = new THREE.Vector3( - 0.8, - 0.8, - 0.8 );
    var maxPan = new THREE.Vector3( 0.8, 0.8, 0.8 );
    var _v = new THREE.Vector3();
    
    controls.addEventListener("change", function() {
        _v.copy(controls.target);
        controls.target.clamp(minPan, maxPan);
        _v.sub(controls.target);
        camera.position.sub(_v);
    })
document.getElementById('close').onclick=function(){
  camerarotation=true
  document.getElementById('close').style.display='none';
  document.getElementById('gui').style.display='none';

    clickActive=false
		controls.enabled=true
        document.getElementsByClassName('card')[0].style.display='none'
        const tweenCamera4 = new TWEEN.Tween( {x: -0.8+0.2, y: -0.5+0.1, z: 0.8, lookAtX: cube.position.x, lookAtY: cube.position.y, lookAtZ: cube.position.z} )
  .to( {x: 1, y: 0.1, z: -1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 1000 )
tweenCamera4.onUpdate(updateCamera)
tweenCamera4.start()

var bokehPass = new BokehPass(scene, camera, {
  focus: 0,
  aperture: 0,
  maxblur: 0,
  width: window.innerWidth,
  height: window.innerHeight
});

composer.addPass(bokehPass);
	
};
//mercato
function intersectmercato(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube2);
}
var clickActive=false
window.addEventListener('dblclick', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectmercato(clickMouse);
console.log(found);
if(found.length>0 && !clickActive){
  clickActive=true
    const tweenCamera3 = new TWEEN.Tween( {x: controls.object.position.x, y: controls.object.position.y, z: controls.object.position.z, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: -0.20, y: -0.24, z: -0.58, lookAtX: cube2.position.x, lookAtY: cube2.position.y, lookAtZ: cube2.position.z}, 1000 )
tweenCamera3.onUpdate(updateCamera)
tweenCamera3.start()
controls.enabled=false
tweenCamera3.onComplete(function() {
  camerarotation=false

  document.getElementsByClassName('card')[0].style.display='block';
  document.getElementById('gui').style.display='block';
  document.getElementById('close3').style.display='block'
  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  
})
}
})
document.getElementById('close3').onclick=function(){
  document.getElementById('close3').style.display='none';
  document.getElementById('gui').style.display='none';
  camerarotation=true

    clickActive=false
		controls.enabled=true
        document.getElementsByClassName('card')[0].style.display='none'
        const tweenCamera4 = new TWEEN.Tween( {x: -0.20, y: -0.24, z: -0.58, lookAtX: cube2.position.x, lookAtY: cube2.position.y, lookAtZ: cube2.position.z} )
  .to( {x: 1, y: 0.1, z: -1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 1000 )
tweenCamera4.onUpdate(updateCamera)
tweenCamera4.start()
var bokehPass = new BokehPass(scene, camera, {
  focus: 0,
  aperture: 0,
  maxblur: 0,
  width: window.innerWidth,
  height: window.innerHeight
});

composer.addPass(bokehPass);
	
};

//razzi
function intersectrazzi(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube3);
}
var clickActive=false
window.addEventListener('dblclick', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectrazzi(clickMouse);
console.log(found);
if(found.length>0 && !clickActive){
  clickActive=true
    const tweenCamera3 = new TWEEN.Tween( {x: controls.object.position.x, y: controls.object.position.y, z: controls.object.position.z, lookAtX: 0, lookAtY: 0, lookAtZ: 0} )
  .to( {x: -0.08, y: 0.54, z: -1.25, lookAtX: cube3.position.x, lookAtY: cube3.position.y, lookAtZ: cube3.position.z}, 1000 )
tweenCamera3.onUpdate(updateCamera)
tweenCamera3.start()
controls.enabled=false
tweenCamera3.onComplete(function() {
  camerarotation=false
  document.getElementsByClassName('card')[0].style.display='block';
  document.getElementById('guirazi').style.display='block';
  document.getElementById('close2').style.display='block'
  var bokehPass = new BokehPass(scene, camera, {
    focus: 2,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  
})
}
})
document.getElementById('close2').onclick=function(){
  document.getElementById('close2').style.display='none';
  document.getElementById('guirazi').style.display='none';
  camerarotation=true

    clickActive=false
		controls.enabled=true
        const tweenCamera4 = new TWEEN.Tween( {x: -0.08, y: 0.54, z: -1.25, lookAtX: cube3.position.x, lookAtY: cube3.position.y, lookAtZ: cube3.position.z} )
  .to( {x: 1, y: 0.1, z: -1, lookAtX: 0, lookAtY: 0, lookAtZ: 0}, 1000 )
tweenCamera4.onUpdate(updateCamera)
tweenCamera4.start()
var bokehPass = new BokehPass(scene, camera, {
  focus: 0,
  aperture: 0,
  maxblur: 0,
  width: window.innerWidth,
  height: window.innerHeight
});

composer.addPass(bokehPass);
	
	
};

window.addEventListener('mousemove', event => {
    moveMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    moveMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });
const clock = new THREE.Clock()

const params = {
  exposure: 2,
  bloomStrength: 1.5,
  bloomThreshold: 0,
  bloomRadius: 0
};

composer = new EffectComposer( renderer );

var renderPass = new RenderPass( scene, camera );
				composer.addPass( renderPass );

// const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
// bloomPass.threshold = params.bloomThreshold;
// bloomPass.strength = params.bloomStrength;
// bloomPass.radius = params.bloomRadius;
 const saoPass = new SAOPass( scene, camera, sizes.width, sizes.height );
composer.addPass( saoPass );
saoPass.kernelRadius = 16;
saoPass.intensity=0.0002;
// composer.addPass(bloomPass );

// gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {

//   renderer.toneMappingExposure = Math.pow( value, 4.0 );

// } );

// gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {

//   bloomPass.threshold = Number( value );

// } );

// gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {

//   bloomPass.strength = Number( value );

// } );

// gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

//   bloomPass.radius = Number( value );

// } );
const postprocessing = {};

const effectController = {

  focus: 0,
  aperture: 0,
  maxblur: 0

};
// const matChanger = function ( ) {

//   postprocessing.bokeh.uniforms[ 'focus' ].value = effectController.focus;
//   postprocessing.bokeh.uniforms[ 'aperture' ].value = effectController.aperture * 0.00001;
//   postprocessing.bokeh.uniforms[ 'maxblur' ].value = effectController.maxblur;

// };

// gui.add( effectController, 'focus', 10.0, 3000.0, 10 ).onChange( matChanger );
// gui.add( effectController, 'aperture', 0, 10, 0.1 ).onChange( matChanger );
// gui.add( effectController, 'maxblur', 0.0, 0.01, 0.001 ).onChange( matChanger );
// gui.close();

// matChanger();


// // Init gui
				gui.add( saoPass.params, 'output', {
					'Beauty': SAOPass.OUTPUT.Beauty,
					'Beauty+SAO': SAOPass.OUTPUT.Default,
					'SAO': SAOPass.OUTPUT.SAO,
					'Depth': SAOPass.OUTPUT.Depth,
					'Normal': SAOPass.OUTPUT.Normal
				} ).onChange( function ( value ) {

					saoPass.params.output = parseInt( value );

				} );
			let saoBias =	gui.add( saoPass.params, 'saoBias', - 1, 1 );
      saoBias.setValue(2);
			let saoIntensity=	gui.add( saoPass.params, 'saoIntensity', 0, 1 ).step(0.00001);
      saoIntensity.setValue(0.00006)
				gui.add( saoPass.params, 'saoScale', 0, 10 );
			let saoKernelRadius=	gui.add( saoPass.params, 'saoKernelRadius', 1, 100 );
      saoKernelRadius.setValue(15)
				gui.add( saoPass.params, 'saoMinResolution', 0, 1 );
				gui.add( saoPass.params, 'saoBlur' );
			let saoBlurRadius=	gui.add( saoPass.params, 'saoBlurRadius', 0, 200 );
      saoBlurRadius.setValue(102.1)
			let saoBlurStdDev=	gui.add( saoPass.params, 'saoBlurStdDev', 0.5, 150 );
      saoBlurStdDev.setValue(4)
			let saoBlurDepthCutoff=	gui.add( saoPass.params, 'saoBlurDepthCutoff', 0.0, 10 );
      saoBlurDepthCutoff.setValue(4.072)
// //cam animation
const tick = () =>
{
if(camerarotation){
  var rotSpeed = .0007;
  var x = camera.position.x;
  var z = camera.position.z;
  camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
camera.lookAt(new Vector3(0,0,0))}
  if(scene.children[14]){
 scene.children[14].children[10].scale.set(0.07,0.07,0.07);
 scene.children[14].children[10].position.x=-0.02;
 scene.children[14].children[10].position.z=-8.5;
//  scene.children[14].children[0].children[0].children[1].children[229].material.bumpScale=8


//  scene.children[14].children[9].rotation.z=28;
}

    TWEEN.update()
    const elapsedTime = 0.015
    const elapsedTime2 = clock.getElapsedTime()/500

    // Update objects

    // Update Orbital Controls
    // controls.update()
   

    // Render
    
    composer.render(scene,camera)
    // postprocessing.composer.render( 0.1 );
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