import * as THREE from 'three';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

let camera, stats;
let composer, renderer, mixer, clock;

const params = {
    exposure: 1,
    bloomStrength: 1.5,
    bloomThreshold: 0,
    bloomRadius: 0
};



    const container = document.getElementById( 'container' );

    clock = new THREE.Clock();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    // renderer.setClearColor( 0x101000 );
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ReinhardToneMapping;
    container.appendChild( renderer.domElement );

    const scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 300 );
    camera.layers.enable(1);
    camera.position.set( -1, 5,-2);
    scene.add( camera );

    const controls = new OrbitControls( camera, renderer.domElement );
    // controls.maxPolarAngle = Math.PI * 0.5;
    // controls.minDistance = 1;
    // controls.maxDistance = 200;

    scene.add( new THREE.AmbientLight( 0x404040 ) );

    const pointLight = new THREE.PointLight( 0xffffff, 1 );
    camera.add( pointLight );

    const renderScene = new RenderPass( scene, camera );

    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    const gltfloader = new GLTFLoader()

    composer = new EffectComposer( renderer );
    composer.addPass( renderScene );
    composer.addPass( bloomPass );
    var dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
    dracoLoader.preload();
    gltfloader.setDRACOLoader(dracoLoader);
    gltfloader.load( 'scenetest.glb', function ( gltf ) {
console.log(gltf);
        const model = gltf.scene
        gltf.scene.traverse( function( object ) {

            object.layers.set( 0 );
        
        } );
        
        scene.add( model);

        mixer = new THREE.AnimationMixer( model );
     
        animate();

    } );
  
    var objBack = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 1), new THREE.MeshBasicMaterial({color: "red", wireframe: false}));
    objBack.position.z = -20    ;
    objBack.layers.set(0);
    scene.add(objBack);
    
    var ob = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 1), new THREE.MeshBasicMaterial({color: "yellow", wireframe: false}));
    ob.position.z = -40    ;
    ob.layers.set(1);
    scene.add(ob);
    const gui = new GUI();

    gui.add( params, 'exposure', 0.1, 2 ).onChange( function ( value ) {

        renderer.toneMappingExposure = Math.pow( value, 4.0 );

    } );

    gui.add( params, 'bloomThreshold', 0.0, 1.0 ).onChange( function ( value ) {

        bloomPass.threshold = Number( value );

    } );

    gui.add( params, 'bloomStrength', 0.0, 3.0 ).onChange( function ( value ) {

        bloomPass.strength = Number( value );

    } );

    gui.add( params, 'bloomRadius', 0.0, 1.0 ).step( 0.01 ).onChange( function ( value ) {

        bloomPass.radius = Number( value );

    } );

    window.addEventListener( 'resize', onWindowResize );



function onWindowResize() {

    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize( width, height );
    composer.setSize( width, height );

}

function animate() {
    requestAnimationFrame(animate);
  
    renderer.clear();
    
    camera.layers.set(0);
    composer.render();
    
    renderer.clearDepth();
    camera.layers.set(1);
    renderer.render(scene, camera);

}