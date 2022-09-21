import './style.scss'
import * as THREE from 'three'
import * as TWEEN from '@tweenjs/tween.js'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Stats from 'three/examples/jsm/libs/stats.module'
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import * as dat from "dat.gui";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { SAOPass  } from 'three/examples/jsm/postprocessing/SAOPass.js';
			import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
			import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
      import { BokehPass } from './BokehPass.js';
      import TextSprite from '@seregpie/three.text-sprite';
     
            import {gsap} from "gsap";
import { ReinhardToneMapping, Vector3 } from 'three';
           window.arcade1=false
          //  const stats = Stats()
          //  document.body.appendChild(stats.dom)
            let composer;

            const button = document.querySelector('.menu__button');
            const menu = document.querySelector('.menu__body');
            const close = document.querySelector('.menu__header button');
            const overlay = document.querySelector('.menu__overlay');
            
            function showMenu () {
              button.setAttribute('hidden', '');
              menu.removeAttribute('hidden');
              overlay.removeAttribute('hidden');
            };
            
            function hideMenu () {
              menu.setAttribute('hidden', '');
              overlay.setAttribute('hidden', '');
              button.removeAttribute('hidden');
            };
            
            button.addEventListener('click', showMenu);
            close.addEventListener('click', hideMenu);
            overlay.addEventListener('click', hideMenu);




const $$ = (s, o = document) => o.querySelectorAll(s);

$$('.button').forEach(el => el.addEventListener('mousemove', function(e) {
  const pos = this.getBoundingClientRect();
  const mx = e.clientX - pos.left - pos.width/2; 
  const my = e.clientY - pos.top - pos.height/2;
   
  this.style.transform = 'translate('+ mx * 0.15 +'px, '+ my * 0.3 +'px)';
  this.style.transform += 'rotate3d('+ mx * -0.1 +', '+ my * -0.3 +', 0, 12deg)';
}));

$$('.button').forEach(el => el.addEventListener('mouseleave', function() {
  this.style.transform = 'translate3d(0px, 0px, 0px)';
  this.style.transform += 'rotate3d(0, 0, 0, 0deg)';
}));

$$('li').forEach(el => el.addEventListener('mousemove', function(e) {
  const pos = this.getBoundingClientRect();
  const mx = e.clientX - pos.left - pos.width/2; 
  const my = e.clientY - pos.top - pos.height/2;
   
  this.style.transform = 'translate('+ mx * 0.15 +'px, '+ my * 0.3 +'px)';
  this.style.transform += 'rotate3d('+ mx * -0.1 +', '+ my * -0.3 +', 0, 12deg)';
}));

$$('li').forEach(el => el.addEventListener('mouseleave', function() {
  this.style.transform = 'translate3d(0px, 0px, 0px)';
  this.style.transform += 'rotate3d(0, 0, 0, 0deg)';
}));
// if (window.innerWidth < 700) {

// else if (window.innerWidth > 700) {        init()
// }



var soundcheck=true
var tops=0
document.addEventListener("DOMContentLoaded", () => {

//   const element = document.getElementById("gui");
// element.remove();
// const element2 = document.getElementById("guirazi");
// element2.remove();
// const element3 = document.getElementById("guibazar");
// element3.remove();
// const element4 = document.getElementById("guicentro");
// element4.remove();
// const element5 = document.getElementById("guimarcato");
// element5.remove();
// const element6 = document.getElementById("guipalazzo");
// element6.remove();
// const element7 = document.getElementById("guisamy");
// element7.remove();
// const element8 = document.getElementById("guielectrono");
// element8.remove();
// const element9 = document.getElementById("guibazarstory");
// element9.remove();


  if (window.innerWidth < 700) {
    tops=0

  document.getElementById('sound').innerHTML=`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
</svg>
`
let element3 = document.getElementById('sound')
element3.setAttribute("class", "soundMobile");

}

else if (window.innerWidth > 700) {
  document.getElementById('sound').innerHTML=`
  <svg id="soundIcon" xmlns="http://www.w3.org/2000/svg" class="h-1 w-1" fill="#AB7C94" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
</svg>`
tops=30
}
});

var mediaElement=null;
var audio = null

document.getElementById('sound').onclick=function(){
  
  if(soundcheck) {
    mediaElement.pause();
    soundcheck=false ;
    if (window.innerWidth < 700) {
      document.getElementById('sound').style.backgroundColor='red';
    }
    else if (window.innerWidth > 700) {

document.getElementById('sound').innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
</svg>`
'<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">\n  <path stroke-linecap="round" stroke-linejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />\n  <path stroke-linecap="round" stroke-linejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />\n</svg>'
}}

else{
  if (window.innerWidth < 700) {
  
      document.getElementById('sound').style.backgroundColor='#00000099';
    mediaElement.play();
    soundcheck=true;
  }
  else if (window.innerWidth > 700) {

  mediaElement.play(); soundcheck=true;document.getElementById('sound').innerHTML=`<svg id="soundIcon" xmlns="http://www.w3.org/2000/svg" class="h-1 w-1" fill="#AB7C94" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
<path stroke-linecap="round" stroke-linejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
</svg>`}}

}

/// navbar function
             
             function init(){
               let toolTimeline = new gsap.timeline();
               let duration = .9;

               toolTimeline.staggerTo('li', duration, {
                 
                 top:30,
                 ease:"Back.easeOut"
               }, .1, .9);
               
             };

             function initsound(){
              let toolTimeline = new gsap.timeline();
              let duration = .9;

              toolTimeline.staggerTo('#sound', duration, {
                
                top:tops,
                ease:"Back.easeOut"
              }, .1, .9);
              
              toolTimeline.staggerTo('.soundMobile', duration, {
                
                top:tops,
                ease:"Back.easeOut"
              }, .1, .9);
            };

/// loading bar function   

function increase() {
  // Change the variable to modify the speed of the number increasing from 0 to (ms)
  let SPEED =120;
  // Retrieve the percentage value
  let limit = parseInt(document.getElementById("value1").innerHTML, 10);

  for(let i = 0; i <= limit; i++) {
      setTimeout(function () {

          document.getElementById("value1").innerHTML = i + "%";
      }, SPEED * i);
  }
}

increase();

/// loading background function

/*          *     .        *  .    *    *   . 
 .  *  move your mouse to over the stars   .
 *  .  .   change these values:   .  *
   .      * .        .          * .       */
   const STAR_COLOR = '#fff';
   const STAR_SIZE = 3;
   const STAR_MIN_SCALE = 0.2;
   const OVERFLOW_THRESHOLD = 50;
   const STAR_COUNT = ( window.innerWidth + window.innerHeight ) / 8;
   
   var canvas2 = document.getElementById('load'),
         context = canvas2.getContext( '2d' );
   
   let scale = 1, // device pixel ratio
       width,
       height;
   
   let stars = [];
   
   let pointerX,
       pointerY;
   
   let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0005 };
   
   let touchInput = false;
   
   generate();
   resize();
   step();
   
   window.onresize = resize;
   canvas2.onmousemove = onMouseMove;
   canvas2.ontouchmove = onTouchMove;
   canvas2.ontouchend = onMouseLeave;
   document.onmouseleave = onMouseLeave;
   
   function generate() {
   
      for( let i = 0; i < STAR_COUNT; i++ ) {
       stars.push({
         x: 0,
         y: 0,
         z: STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE )
       });
      }
   
   }
   
   function placeStar( star ) {
   
     star.x = Math.random() * width;
     star.y = Math.random() * height;
   
   }
   
   function recycleStar( star ) {
   
     let direction = 'z';
   
     let vx = Math.abs( velocity.x ),
         vy = Math.abs( velocity.y );
   
     if( vx > 1 || vy > 1 ) {
       let axis;
   
       if( vx > vy ) {
         axis = Math.random() < vx / ( vx + vy ) ? 'h' : 'v';
       }
       else {
         axis = Math.random() < vy / ( vx + vy ) ? 'v' : 'h';
       }
   
       if( axis === 'h' ) {
         direction = velocity.x > 0 ? 'l' : 'r';
       }
       else {
         direction = velocity.y > 0 ? 't' : 'b';
       }
     }
     
     star.z = STAR_MIN_SCALE + Math.random() * ( 1 - STAR_MIN_SCALE );
   
     if( direction === 'z' ) {
       star.z = 0.1;
       star.x = Math.random() * width;
       star.y = Math.random() * height;
     }
     else if( direction === 'l' ) {
       star.x = -OVERFLOW_THRESHOLD;
       star.y = height * Math.random();
     }
     else if( direction === 'r' ) {
       star.x = width + OVERFLOW_THRESHOLD;
       star.y = height * Math.random();
     }
     else if( direction === 't' ) {
       star.x = width * Math.random();
       star.y = -OVERFLOW_THRESHOLD;
     }
     else if( direction === 'b' ) {
       star.x = width * Math.random();
       star.y = height + OVERFLOW_THRESHOLD;
     }
   
   }
   
   function resize() {
   
     scale = window.devicePixelRatio || 1;
   
     width = window.innerWidth * scale;
     height = window.innerHeight * scale;
   
     canvas2.width = width;
     canvas2.height = height;
   
     stars.forEach( placeStar );
   
   }
   
   function step() {
   
     context.clearRect( 0, 0, width, height );
   
     update();
     render();
   
     requestAnimationFrame( step );
   
   }
   
   function update() {
   
     velocity.tx *= 0.3;
     velocity.ty *= 0.3;
   
     velocity.x += ( velocity.tx - velocity.x ) * 0.1;
     velocity.y += ( velocity.ty - velocity.y ) * 0.1;
   
     stars.forEach( ( star ) => {
   
       star.x += velocity.x * star.z;
       star.y += velocity.y * star.z;
   
       star.x += ( star.x - width/2 ) * velocity.z * star.z;
       star.y += ( star.y - height/2 ) * velocity.z * star.z;
       star.z += velocity.z;
     
       // recycle when out of bounds
       if( star.x < -OVERFLOW_THRESHOLD || star.x > width + OVERFLOW_THRESHOLD || star.y < -OVERFLOW_THRESHOLD || star.y > height + OVERFLOW_THRESHOLD ) {
         recycleStar( star );
       }
   
     } );
   
   }
   
   function render() {
   
     stars.forEach( ( star ) => {
   
       context.beginPath();
       context.lineCap = 'round';
       context.lineWidth = STAR_SIZE * star.z * scale;
       context.globalAlpha = 0.5 + 0.5*Math.random();
       context.strokeStyle = STAR_COLOR;
   
       context.beginPath();
       context.moveTo( star.x, star.y );
   
       var tailX = velocity.x * 2,
           tailY = velocity.y * 2;
   
       // stroke() wont work on an invisible line
       if( Math.abs( tailX ) < 0.1 ) tailX = 0.5;
       if( Math.abs( tailY ) < 0.1 ) tailY = 0.5;
   
       context.lineTo( star.x + tailX, star.y + tailY );
   
       context.stroke();
   
     } );
   
   }
   
   function movePointer( x, y ) {
   
     if( typeof pointerX === 'number' && typeof pointerY === 'number' ) {
   
       let ox = x - pointerX,
           oy = y - pointerY;
   
       velocity.tx = velocity.tx + ( ox / 8*scale ) * ( touchInput ? 1 : -1 );
       velocity.ty = velocity.ty + ( oy / 8*scale ) * ( touchInput ? 1 : -1 );
   
     }
   
     pointerX = x;
     pointerY = y;
   
   }
   
   function onMouseMove( event ) {
   
     touchInput = false;
   
     movePointer( event.clientX, event.clientY );
   
   }
   
   function onTouchMove( event ) {
   
     touchInput = true;
   
     movePointer( event.touches[0].clientX, event.touches[0].clientY, true );
   
     event.preventDefault();
   
   }
   
   function onMouseLeave() {
   
     pointerX = null;
     pointerY = null;
   
   }
   



// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl')

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
  // powerPreference: "high-performance",
})
// Scene
const scene = new THREE.Scene()
var fonintensity=0.2

var fog = new THREE.FogExp2( new THREE.Color("rgb(188, 118, 067)"), fonintensity );
// scene.fog = fog
var color=null
// if (window.innerWidth < 700) {
//   color =  new THREE.Color("rgb(143, 58, 0)");  // white
//   scene.background = new THREE.Color( new THREE.Color("rgb(143, 58, 0)"));
// //   renderer.toneMapping = THREE.LinearToneMapping
// // renderer.toneMappingExposure = 0.07

// }
// else if (window.innerWidth > 700) {
//   color =  new THREE.Color("rgb(143, 76, 0)");  // white
//   scene.background = new THREE.Color( new THREE.Color("rgb(143, 76, 0)"));
// }
color =  new THREE.Color("rgb(143, 76, 0)");  // white
scene.background = new THREE.Color( new THREE.Color("rgb(143, 76, 0)"));
  const near = 0.1;
    const far = 14.60;
    scene.fog = new THREE.Fog(color, near, far);
  
  
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const updateAllMaterials=()=>{
  scene.traverse((child)=>{
    if(child instanceof THREE.Mesh &&  child.material instanceof THREE.MeshStandardMaterial)
    {
      child.material.needsUpdate=true
    }
  })
}


// Renderer
// let pixelRatio = window.devicePixelRatio
// let AA = true
// if (pixelRatio > 1) {
//   AA = false
// }


// const renderer = new THREE.WebGLRenderer({
//    canvas: canvas,
//    antialias:true
// })
//  
// gui.add(renderer,'toneMapping',{
//   NO: THREE.NoToneMapping,
//   Linear: THREE.LinearToneMapping,
//   Reinhard:ReinhardToneMapping,
//   Cineon:THREE.CineonToneMapping,
//   ACESFilmic:THREE.ACESFilmicToneMapping
// }).onFinishChange(()=>{
//   renderer.toneMapping=Number(renderer.toneMapping)
//   updateAllMaterials()
// })
// gui.add(renderer,'toneMappingExposure').min(0).max(10).step(0.001)
// renderer.toneMappingExposure = 2.3
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = !0
renderer.shadowMap.enabled=false
// renderer.shadowMap.type=THREE.PCFShadowMap
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
var mesh =null
const gltfloader = new GLTFLoader(manager);
var   mixer1=null
var   action=null
var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/');
dracoLoader.preload();
// var blender_camera=null
gltfloader.setDRACOLoader(dracoLoader);
var totalSize = 4167680;
var glowYellow = new THREE.MeshBasicMaterial({
  color: new THREE.Color(0.910, 0.770, 0,1).multiplyScalar(100),
  toneMapped: false,
  
});
var glowBlue= new THREE.MeshBasicMaterial({
  color: new THREE.Color(0, 0.290, 0.260,1).multiplyScalar(100),
  toneMapped: false,
  
});
var glowBlueLight= new THREE.MeshBasicMaterial({
  color: new THREE.Color(0, 0.290, 0.260,1).multiplyScalar(8),
  toneMapped: false,
  
});
var glowRed= new THREE.MeshBasicMaterial({
  color: new THREE.Color(1, 0, 0,242,1).multiplyScalar(100),
  toneMapped: false,
  
});

var model=null

function createMarker(model, x,y,z,) {

  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "anonymous";
  
  const map = textureLoader.load("246697.png");
  map.encoding = THREE.sRGBEncoding
  
  const spriteMaterialFront = new THREE.SpriteMaterial( { map } );
  
  const spriteFront = new THREE.Sprite( spriteMaterialFront );
  spriteFront.position.set(x,y,z)
  spriteFront.scale.set(0.09,0.09,0.09)
  
  const spriteMaterialRear = new THREE.SpriteMaterial({ 
    map,
    opacity: 0.3, 
    transparent: true, 
    depthTest: false
  });
  
  const spriteRear = new THREE.Sprite( spriteMaterialRear );
  spriteRear.position.set(x,y,z)
  spriteRear.scale.set(0.09,0.09,0.09)
  
  scene.add(spriteFront, spriteRear)
}


gltfloader.load("./City_12_6.glb", function (gltf) {
  const textureLoader = new THREE.TextureLoader();
  //  mesh =gltf.scene.children[0].children[0].children[1].children[232]
    model=gltf.scene
  




  var obj = gltf.scene;
  gltf.castShadow=true;gltf.receiveShadow=true;
    gltf.scene.traverse(n=>{if (n.isMesh){n.castShadow=true;n.receiveShadow=true;
    if(n.material.map){n.material.map.anisotropy=16;}
      
      if(n.material.name==='Palazzi:lambert2SG1'){n.material=glowYellow}
      if(n.material.name==='Palazzi:phong2SG1'||n.material.name==='AZZURROC'){n.material=glowBlue}
      if(n.material.name==='FUCSIA_C'){n.material=glowRed;}
      if(n.material.name==='phong20'){n.material=glowBlueLight}
    
    }})
  mixer1 = new THREE.AnimationMixer(gltf.scene);
  for (var i=0;i<34;i++){
             action = mixer1.clipAction(gltf.animations[i]);
             action.play()

  }
  
  // scene.add(camera)
  (gltf.scene.rotation.y = 3.1),
  (gltf.scene.position.y = -3),
  (gltf.scene.position.x = -3.5);
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
document.getElementById('start-button').style.display='none'

setTimeout(()=>{      let element3 = document.getElementById('chart')
element3.className = "myelementfaster"; ;  document.getElementById('start-button').style.display='flex'
    let element2 = document.getElementById('start-button')
element2.className = "myelement1";

},20000)
//loading
const loadingManager = new THREE.LoadingManager( () => {
	
  const loadingScreen = document.getElementById( 'chart' );
  loadingScreen.classList.add( 'fade-out' );
  
  // optional: remove loader from DOM via event listener
  loadingScreen.addEventListener( 'transitionend', onTransitionEnd );
  
} );

const geomet = new THREE.BoxBufferGeometry ( 0.1, 0.1, 0.1 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
const cube = new THREE.Mesh( geomet, material );
cube.name='cube'
cube.position.set(-0.8,-0.4,0.8)
cube.scale.set(0.4,0.5,0.8)
scene.add( cube );
cube.visible=false;



const arcade = new THREE.Mesh( geomet, material );
arcade.name='arcade'
arcade.position.set(0.88,-0.2,-0.43)
arcade.scale.set(0.5,0.5,0.5)
scene.add( arcade );
arcade.visible=false;

    const cube2 = new THREE.Mesh( geomet, material );
    cube2.name='mercato'
    cube2.position.set(-0.101,-0.4,-0.24)
    cube2.scale.set(0.8,0.5,0.7)
    scene.add( cube2 );
    cube2.visible=false;
        const cube3 = new THREE.Mesh( geomet, material );
        cube3.name='Razzi'
        cube3.position.set(-0.8,-0.4,-0.41)
        cube3.scale.set(0.6,0.44,-1)
        scene.add( cube3 );
        cube3.visible=false;


//  * Sizes
//  */


const cube4 = new THREE.Mesh( geomet, material );
cube4.name='Centro'
cube4.position.set(-3.5,-0.05,-0.2)
cube4.scale.set(1,1,1)
scene.add( cube4 );
cube4.visible=false;

    const cube5 = new THREE.Mesh( geomet, material );
cube5.name='Palazzo'
cube5.position.set(0.72,0.06,0.59)
cube5.scale.set(0.4,0.6,0.5)
scene.add( cube5 );
cube5.visible=false;

// const cube3Folder2 = gui.addFolder('posiqsdqdtion');
// cube3Folder2.add( cube5.position, 'x')
// cube3Folder2.add( cube5.position, 'y')
// cube3Folder2.add( cube5.position, 'z')
// cube3Folder2.add( cube5.scale, 'x');
// cube3Folder2.add( cube5.scale, 'y');
// cube3Folder2.add( cube5.scale, 'z');

// cube3Folder2.open();



const samy = new THREE.Mesh( geomet, material );
samy.name='samy'
samy.position.set(2.1,0.5,0.06)
samy.scale.set(0.5,0.5,0.5)
scene.add( samy );
samy.visible=false;
  



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
    // renderer.gammaOutput = !0
    // renderer.gammaFactor = 2
})
// renderer.gammaOutput = !0
// renderer.gammaFactor = 10
renderer.physicallyCorrectLights = false
// renderer.logarithmicDepthBuffer=true
/**
 * Camera
 */


// Base camera
let FOV
let FAR
let NEAR = 400

// Mobile camera
// if (window.innerWidth <= 768) {
//   FOV = 50
//   FAR = 1200
//   // 769px - 1080px screen width camera
// } else if (window.innerWidth >= 769 && window.innerWidth <= 1080) {
//   FOV = 50
//   FAR = 1475
//   // > 1080px screen width res camera
// } else {
//   FOV = 40
//   FAR = 1800
// }

// var camera = new THREE.PerspectiveCamera(
//   FOV,
//   window.innerWidth / window.innerHeight,
//   NEAR,
//   FAR
// )
var camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.005, 5000)

camera.position.x = -5.647376005341269,
camera.position.y = 0.9998205247861698,
camera.position.z = 2.297861001350101

camera.rotation.set(77,77,77)

// Lights
var clientX = -300,
    clientY = -300,
// elements 
    outerCursor = document.querySelector(".cursor--outer"),
    innerCursor = document.querySelector(".cursor--inner"),
    link = document.querySelector(".link")

var initCursor = function() {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", function(e) {
    clientX = e.clientX
    clientY = e.clientY
  });
  
  var render = function() {
    gsap.set(outerCursor, {
      x: clientX-25,
      y: clientY-25,
      delay: .08,
      // ease: Power1.easeOut
    });
    
     gsap.set(innerCursor, {
      x: clientX,
      y: clientY
    });
    
    requestAnimationFrame(render);
  };
  
  requestAnimationFrame(render);
};

initCursor();

				//
const pointLight3 = new THREE.PointLight(0xffffff,3.66,2)
pointLight3.position.set(-24,8,45)
pointLight3.scale.set(10,10,10)
pointLight3.intensity=5
pointLight3.frustumCulled=true
pointLight3.decay=1
pointLight3.distance=10
// scene.add(pointLight3)


const pointLight3Helper= new THREE.PointLightHelper(pointLight3)
                
const pointLight4 = new THREE.PointLight(0xffffff,3.66,2)
    // pointLight4.position.set(-24,8,45)
pointLight4.scale.set(1,1,1)
pointLight4.position.x=-3.8
pointLight4.position.y=1.3
pointLight4.position.z=8.8
pointLight4.intensity=5
pointLight4.frustumCulled=true
pointLight4.decay=1
pointLight4.distance=2.5

scene.add(pointLight4)
const pointLight4Helper= new THREE.PointLightHelper(pointLight4)

                // const cubeFolder2 = gui.addFolder('positionss');
                // cubeFolder2.add(pointLight4.position, 'x');
                // cubeFolder2.add(pointLight4.position, 'y');
                // cubeFolder2.add(pointLight4.position, 'z');
                // cubeFolder2.add(pointLight4.rotation, 'x');
                // cubeFolder2.add(pointLight4.rotation, 'y');
                // cubeFolder2.add(pointLight4.rotation, 'z');

                // cubeFolder2.open();
                



const PointLight2 = new THREE.PointLight(0xffffff,3.66,3)
PointLight2.scale.set(1,1,1)
PointLight2.position.y=0.8

PointLight2.frustumCulled=true
PointLight2.shadow.bias = -0.0001;
PointLight2.distance=2.5
PointLight2.castShadow= true;
scene.add(PointLight2)
         

/////////////////////
                
                
const pointLight = new THREE.PointLight(0xffffff,3.66,2)
pointLight.scale.set(1,1,1)
pointLight.position.x=-3.5
pointLight.position.y=3
pointLight.position.z=3
pointLight.intensity=5
pointLight.frustumCulled=true
pointLight.decay=1
pointLight.distance=3.68
scene.add(pointLight)
const pointLightHelper= new THREE.PointLightHelper(pointLight)
                
// Controls
//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping=false  
controls.target = new THREE.Vector3(2.712046209109965,-14.138109038671452, 4.431157214151357);
controls.update();


//moon geometry
// const moongeometry = new THREE.SphereBufferGeometry(0.1, 32, 32);

// //moon material
// const moonMaterial = new THREE.MeshPhongMaterial({
//   roughness: 5,
//   metalness: 0,
//   map: THREE.ImageUtils.loadTexture("./moonmap4k1.jpg"),
//   bumpMap: THREE.ImageUtils.loadTexture("./moonbump4k.jpg"),
//   bumpScale: 0.02,
//   fog:false,
//   intensity:50
// });

// //moonMesh
// const moonMesh = new THREE.Mesh(moongeometry, moonMaterial);
// moonMesh.receiveShadow = true;
// moonMesh.castShadow = true;
// moonMesh.position.x = 2;
// moonMesh.position.set(-27, 9, 52);
// moonMesh.scale.set(30,30,30)
// scene.add(moonMesh);


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
// function  label(text,xstart,ystart,zstart,xfinish,yfinsh,zfinish){
//   //adding names
// const color2 = new THREE.Color("#C0C0C0");
// const geometry2 = new THREE.IcosahedronGeometry(1, 15);
// const material1 = new THREE.MeshBasicMaterial({ color: color2 });
// const sphere = new THREE.Mesh(geometry2, material1);
// sphere.fog=false
// geometry2.fog=false
// material1.fog=false
// // sphere.position.set(-0.85, -0.5, 0.89);
// sphere.position.set(xstart, ystart, zstart);
// sphere.scale.set(0.01, 0.01, 0.01);
// scene.add(sphere);

// const material3 = new THREE.LineBasicMaterial({
// 	color: 0xC0C0C0
// });



// const material4 = new THREE.LineBasicMaterial({
// 	color: 0xC0C0C0
// });

// const points4 = [];
// points4.push( new THREE.Vector3( - 8, 10, 0 ) );
// points4.push( new THREE.Vector3( 0, 10, 0 ) );
// points4.push( new THREE.Vector3( 3, 5, 0 ) );
// points4.push( new THREE.Vector3( -8, 5, 0 ) );

// const geometry4 = new THREE.BufferGeometry().setFromPoints( points4 );

// const square = new THREE.Line( geometry4, material4 );
// square.scale.set(0.05,0.05,0.05)
// square.position.set(-1.2,-0.25,0.89)
// // // square.position.set(-1.2,-0.25,0.89)
// //  const cubeFolder2 = gui.addFolder('positions');
// var  sprite = new TextSprite({
//       text: text,
//       fontFamily: 'Saira',
//       fontSize: 0.09,
//       color: '#FF0000',
//       fontWeight: "bold",

//     });
//     sprite.fog=false
//     // sprite.position.set(-1.3  ,0.30,0.95)
//     sprite.position.set(xfinish  ,yfinsh,zfinish)
//     // sprite.add(line)
//     const points = [];
//     scene.add( sprite )
// points.push( new THREE.Vector3(sphere.position.x, sphere.position.y,sphere.position.z ) );
// points.push( new THREE.Vector3( sprite.position.x, sprite.position.y-0.07, sprite.position.z ) );
// // console.log(sprite.position);
// const geometry3 = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry3, material3 );
// // line.position.set(-0.85, -0.5, 0.89);

// scene.add( line )

  
// }
  var camerarotation=false  
var myInterval=null
controls.enabled=true

document.getElementById('start-button').onclick=function(){
  
  let element2 = document.getElementById('start-button')
  element2.className = "myelementfaster";
  setTimeout(() => {
    const element = document.getElementById("load");
    element.remove();
    const elementt = document.getElementById("cover");
    elementt.remove();
    
    const elementtt = document.getElementById("chart");
    elementtt.remove();
    
    const elementttt = document.getElementById("start-button");
    elementttt.remove();
    
  }, 3000);
  controls.enabled=false
  initsound();
  let element = document.getElementById('load')
  element.className = "myelement";
  
  
  // document.getElementById('load').style.display='none'
  // myInterval = setInterval(()=>{if(fog.density>0.39){return} ; if (fog.density<0.4){fonintensity+=0.01;fog.density=fonintensity }}, 100);
  
  
      
    gsap.to(controls.target,{x: 2.712046209109965, y: -14.138109038671452, z: 4.431157214151357,duration:2});

    gsap.to(camera.position,{x: -5.647376005341269, y: 0.9998205247861698, z: 2.297861001350101,duration:3})

     
      gsap.to(camera.position,{x: -4.85107488034725, y: 0.50, z: 5.421262376769432,duration:10,delay:3,ease: "power1"})
      gsap.to(controls.target,{x: -0.32780258586027866, y: -0.2927804605540083, z: -0.12120864558705574,duration:7,delay:2});
      gsap.to(camera.position,{x: -0.9368241147924617, y: 0.44978222785543465,ease: "power1", z: -1.7328521118110993,duration:15,delay:8,onComplete:function(){
        if (window.innerWidth < 700) {
          document.getElementsByClassName('hero__wrapper')[0].style.display='flex'
      }
       else if (window.innerWidth > 700) {        init()
       }
       
        controls.maxPolarAngle = Math.PI*4/9

        camerarotation= true;
        controls.maxDistance=4
        // canvas2 = null
        createMarker(model,-0.8,-0.4,0.8)
        createMarker(model,-0.101,-0.4,-0.24)
        createMarker(model,0.72,0.06,0.59)
        createMarker(model,-0.8,-0.4,-0.41)
        createMarker(model,0.88,-0.2,-0.43)
        createMarker(model,-3.5,-0.05,-0.2)
        createMarker(model,2.1,0.5,0.06)
      

        var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
          if (iOS) { // <-- Use the one here above
            if (window.indexedDB) { console.log('hi');; }
            if (window.SpeechSynthesisUtterance) { console.log('hi');; }
            if (window.webkitAudioContext) { console.log('hi'); }
            if (window.matchMedia) { console.log('hi');; }
            if (window.history && 'pushState' in window.history) { console.log('hi');; }
            console.log('hi');
          }
        
        else {
          
          composer.removePass ( bokehPass ) 

        var bokehPass = new BokehPass(scene, camera, {
          focus: 8,
          aperture: 0.001,
          maxblur: 500,
          width: window.innerWidth,
          height: window.innerHeight
        });
      
          
          composer.addPass(bokehPass);; }
              
        // composer.addPass(bokehPass);
        
    controls.enabled=true
      controls.addEventListener("change", function() {
        _v.copy(controls.target);
        controls.target.clamp(minPan, maxPan);
        _v.sub(controls.target);
        camera.position.sub(_v);
    })
// clearInterval(myInterval)

      }})
    // controls.enablePan = false;
    const listener = new THREE.AudioListener();

     audio = new THREE.Audio( listener );
    const file = './Space_1.mp3';

    // var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    // if (iOS) { // <-- Use the one here above
    //     const loader = new THREE.AudioLoader();
    //     loader.load( file, function ( buffer ) {

    //         audio.setBuffer( buffer );
    //         audio.play();
    //         console.log(audio);
    //       } );

    // } else {

         mediaElement = new Audio( file );
         mediaElement.loop=true;
        mediaElement.play();

        audio.setMediaElementSource( mediaElement );

    }


const raycaster = new THREE.Raycaster(); // create once
const clickMouse = new THREE.Vector2();  // create once
/// bazar
function intersect(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube);
}



var clickActive=false
window.addEventListener('click', event => {


// THREE RAYCASTER
const found = intersect(clickMouse);
// console.log(found);p
if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }

  controls.enabled=false
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  minPan = new THREE.Vector3( - 1, - 1, - 1 );
  maxPan = new THREE.Vector3( 1, 1, 1 );
  // target: Vector3 {x: -0.777754827125635, y: -0.5104806884919434, z: 0.7891928036025915, _gsap: GSCache} position: Vector3 {x: -0.6559559837447704, y: -0.4736632781692687, z: 0.7052941894292016, _gsap: GSCache}
gsap.to(controls.target,{x: -0.777754827125635, y: -0.5104806884919434, z: 0.7891928036025915,duration:1,ease:'power3.inOut'});
gsap.to(camera.position,{x: -0.6559559837447704, y: -0.4736632781692687, z: 0.7052941894292016,duration:3,delay:1,onComplete:  function (){
 

  camerarotation=false
  document.getElementById('guibazar').style.display='block';
  let element2 = document.getElementById('guibazar')
  element2.className = "zebi";
  composer.removePass ( bokehPass ) 

  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.5,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  

}})

clickActive=true

}
},true)

window.addEventListener('touchstart', event => {

  clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

  clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
  // THREE RAYCASTER
  const found = intersect(clickMouse);
  if(found.length>0 && !clickActive){
      for(let i=16;i<scene.children.length;i++){
        scene.children[i].visible=false
      }
    controls.enabled=false
    minPan = new THREE.Vector3( - 1, - 1, - 1 );
    maxPan = new THREE.Vector3( 1, 1, 1 );
  gsap.to(controls.target,{x: -0.777754827125635, y: -0.5104806884919434, z: 0.7891928036025915,duration:1,ease:'power3.inOut'});
  gsap.to(camera.position,{x: -0.6559559837447704, y: -0.4736632781692687, z: 0.7052941894292016,duration:3,delay:1,onComplete:  function (){
    camerarotation=false
    document.getElementById('guibazar').style.top='70%'
    document.getElementById('guibazar').style.width='100%'
    document.getElementById('guibazar').style.display='block';
    let element2 = document.getElementById('guibazar')
    element2.className = "zebiMobile2";

    var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) { // <-- Use the one here above
      if (window.indexedDB) { console.log('hi');; }
      if (window.SpeechSynthesisUtterance) { console.log('hi');; }
      if (window.webkitAudioContext) { console.log('hi'); }
      if (window.matchMedia) { console.log('hi');; }
      if (window.history && 'pushState' in window.history) { console.log('hi');; }
      console.log('hi');
    }
  
  else {
    composer.removePass ( bokehPass ) 
   

    var bokehPass = new BokehPass(scene, camera, {
      focus: 0.5,
      aperture: 0.005,
      maxblur: 5,
      width: window.innerWidth,
      height: window.innerHeight
    });

    
    composer.addPass(bokehPass);; }
  
  
  }})
  
  clickActive=true
  
  }
  },true)


var minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
var maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
var _v = new THREE.Vector3();


document.getElementById('guibazar').onclick=function(){
  let element2 = document.getElementById('guibazar')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:0.2,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:0.2,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guibazar').style.display='none';

  }})



  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 

  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});
  
  composer.addPass(bokehPass);; }





};

//arcade
function intersectArcade(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(arcade);
}



var clickActive=false
window.addEventListener('click', event => {

// THREE RAYCASTER
const found = intersectArcade(clickMouse);
if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }
    controls.enabled=false
    clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    minPan = new THREE.Vector3( - 1, - 1, - 1 );
    maxPan = new THREE.Vector3( 1, 1, 1 );
  gsap.to(controls.target,{x: 0.5, y: -0.2827338946525805, z: -0.16294125192244216,duration:1,ease:'power3.inOut'});
  gsap.to(camera.position,{x: 0.4915825573682948, y: -0.27968787102465575, z: -0.15636529563801568,duration:3,delay:1,onComplete:  function (){
    camerarotation=false
window.arcade=false
         document.getElementById('p5Div').style.display='block';
             document.getElementById('game').style.display='block';
    document.getElementById('close').style.display='block';

    
  
  }})

  clickActive=true
  
  }
  })

  window.addEventListener('touchstart', event => {
    
   clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

   clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
    // THREE RAYCASTER
    const found = intersectArcade(clickMouse);
    if(found.length>0 && !clickActive){
        for(let i=16;i<scene.children.length;i++){
          scene.children[i].visible=false
        }
        controls.enabled=false
        minPan = new THREE.Vector3( - 1, - 1, - 1 );
        maxPan = new THREE.Vector3( 1, 1, 1 );
      gsap.to(controls.target,{x: 0.5, y: -0.2827338946525805, z: -0.16294125192244216,duration:1,ease:'power3.inOut'});
      gsap.to(camera.position,{x: 0.4915825573682948, y: -0.27968787102465575, z: -0.15636529563801568,duration:3,delay:1,onComplete:  function (){
            camerarotation=false
    window.arcade=false
             document.getElementById('p5Div').style.display='block';
             let element3 = document.getElementById('p5Div')
             element3.setAttribute("class", "p5DivMobile");
             
                 document.getElementById('game').style.display='block';
                 document.getElementById('game').style.width='100%';
                 document.getElementById('game').style.height='60%';
        document.getElementById('close').style.display='block';
    
        
      
      }})
    
      clickActive=true
      
      }
      })
    

  var minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
  var maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
  var _v = new THREE.Vector3();
  
document.getElementById('close').onclick=function(){
  window.arcade=true

  minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
  maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
   camerarotation=true
   document.getElementById('p5Div').style.display='none';
   document.getElementById('game').style.display='none';
   document.getElementById('close').style.display='none';   gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,ease:'power3.inOut'});
   
   gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,duration:4,onComplete:function(){  controls.enabled=true;
     for(let i=16;i<scene.children.length;i++){
       scene.children[i].visible=true;
     
     }
   }})
     clickActive=false


     var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
     if (iOS) { // <-- Use the one here above
       if (window.indexedDB) { console.log('hi');; }
       if (window.SpeechSynthesisUtterance) { console.log('hi');; }
       if (window.webkitAudioContext) { console.log('hi'); }
       if (window.matchMedia) { console.log('hi');; }
       if (window.history && 'pushState' in window.history) { console.log('hi');; }
       console.log('hi');
     }
   
   else {
     composer.removePass ( bokehPass ) 
    
   
     var bokehPass = new BokehPass(scene, camera, {
      focus: 8,
      aperture: 0.001,
      maxblur: 500,
      width: window.innerWidth,
      height: window.innerHeight
    });
        
     composer.addPass(bokehPass);; }
   

}




//mercato


function intersectmercato(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube2);
}
var clickActive=false
window.addEventListener('click', event => {
   
  // THREE RAYCASTER
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectmercato(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }
  controls.enabled=false

  minPan = new THREE.Vector3( - 1, - 1, - 1 );
  maxPan = new THREE.Vector3( 1, 1, 1 );
  controls.maxPolarAngle=Math.PI

  gsap.to(controls.target,{x: -0.06652219660019898, y: -0.49817622607328704, z: 0.09562768959498957,duration:2,ease:'power3.inOut'});
gsap.to(camera.position,{x: -0.3197533397689743, y: -0.555449899400478, z: -0.1868991838525571,duration:2,onComplete:function(){
  clickActive=true
  camerarotation=false

  document.getElementById('guimarcato').style.display='block';
  let element2 = document.getElementById('guimarcato')
  element2.className = "zebi";
  composer.removePass ( bokehPass ) 

  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.005,
    maxblur: 4,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
}})
  
}})

window.addEventListener('touchstart', event => {
   
  // THREE RAYCASTER
 clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

 clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

const found = intersectmercato(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }
  controls.enabled=false

  minPan = new THREE.Vector3( - 1, - 1, - 1 );
  maxPan = new THREE.Vector3( 1, 1, 1 );
  controls.maxPolarAngle=Math.PI

  gsap.to(controls.target,{x: -0.06652219660019898, y: -0.49817622607328704, z: 0.09562768959498957,duration:2,ease:'power3.inOut'});
gsap.to(camera.position,{x: -0.3197533397689743, y: -0.555449899400478, z: -0.1868991838525571,duration:2,onComplete:function(){
  clickActive=true
  camerarotation=false
  document.getElementById('guimarcato').style.left='0px'
  document.getElementById('guimarcato').style.display='block';
  let element2 = document.getElementById('guimarcato')
  element2.className = "zebiMobile2";
  
  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 

  
  
  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.005,
    maxblur: 4,
    width: window.innerWidth,
    height: window.innerHeight
  });
    
  composer.addPass(bokehPass);; }


  
}})
  
}})


document.getElementById('guimarcato').onclick=function(){

  let element2 = document.getElementById('guimarcato')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:0.2,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:0.2,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guimarcato').style.display='none';
    controls.maxPolarAngle = Math.PI*4/9

  }})


  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 

  
  
  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});
  
  composer.addPass(bokehPass);; }
 		
};

//razzi
function intersectrazzi(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube3);
}
var clickActive=false


window.addEventListener('click', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectrazzi(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }
  controls.enabled=false
  clickActive=true
  gsap.to(controls.target,{x: -0.8289567293538739, y: -0.3299689356758495, z: -0.45931347935989586,duration:2,ease:'power3.inOut'});
gsap.to(camera.position,{x: -0.2948241421524178, y: -0.07897252364587554, z: -0.6011721977773161,duration:2,onComplete:function(){
  camerarotation=false;


  document.getElementById('guirazi').style.display='block';
  let element2 = document.getElementById('guirazi')
  element2.className = "zebi";
  composer.removePass ( bokehPass ) 

  var bokehPass = new BokehPass(scene, camera, {
    focus: 1,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  
}})}})

window.addEventListener('touchstart', event => {



  // THREE RAYCASTER
  clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

 clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
  
  const found = intersectrazzi(clickMouse);
  if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }
    controls.enabled=false
    clickActive=true
    // target: Vector3 {x: -0.5, y: -0.329969, z: -0.459313, _gsap: GSCache} position: Vector3 {x: -0.26387782964571027, y: -0.2813195825151035, z: -0.4563573942906924, _gsap: GSCache}
    gsap.to(controls.target,{x: -0.5, y: -0.329969, z: -0.459313,duration:2,ease:'power3.inOut'});
  gsap.to(camera.position,{x: -0.26387782964571027, y: -0.2813195825151035, z: -0.4563573942906924,duration:2,onComplete:function(){
    camerarotation=false;
  
  
    document.getElementById('guirazi').style.display='block';
    document.getElementById('guirazi').style.left='0px';
    let element2 = document.getElementById('guirazi')
    element2.className = "zebiMobile2";

    var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) { // <-- Use the one here above
      if (window.indexedDB) { console.log('hi');; }
      if (window.SpeechSynthesisUtterance) { console.log('hi');; }
      if (window.webkitAudioContext) { console.log('hi'); }
      if (window.matchMedia) { console.log('hi');; }
      if (window.history && 'pushState' in window.history) { console.log('hi');; }
      console.log('hi');
    }
  
  else {
    composer.removePass ( bokehPass ) 
   
    var bokehPass = new BokehPass(scene, camera, {
      focus: 1,
      aperture: 0.005,
      maxblur: 5,
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    composer.addPass(bokehPass);; }
  
 
  }})}})
  


document.getElementById('guirazi').onclick=function(){
  let element2 = document.getElementById('guirazi')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:0.2,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:0.2,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guimarcato').style.display='none';
  }})

  composer.removePass ( bokehPass ) 

  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 
  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});

  composer.addPass(bokehPass);; }


 		};

function intersectcentro(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube4);
}
var clickActive=false

window.addEventListener('click', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectcentro(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }
  controls.enabled=false

  minPan = new THREE.Vector3( - 50, - 50, - 50 );
  maxPan = new THREE.Vector3( 50, 50, 50 );
gsap.to(controls.target,{x: -3.796378213051584, y: -0.4396040469354559, z: 0.05345614125205421,duration:1,ease:'power3.inOut'});
gsap.to(camera.position,{x: -1.8581519428151325, y: -0.013095914618873272, z: 0.6720316109863028,duration:2,delay:1 ,onComplete:  function (){
  camerarotation=false
  document.getElementById('guicentro').style.display='block';
  let element2 = document.getElementById('guicentro')
  element2.className = "zebi";
  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  // composer.addPass(bokehPass);
  

}})

clickActive=true

}
})

window.addEventListener('touchstart', event => {



  // THREE RAYCASTER
 clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

 clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
  
  const found = intersectcentro(clickMouse);
  if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }
    controls.enabled=false
  
    minPan = new THREE.Vector3( - 50, - 50, - 50 );
    maxPan = new THREE.Vector3( 50, 50, 50 );
  gsap.to(controls.target,{x: -3.671547834763972, y: -0.9084205372140165, z: -0.0759723809307472,duration:1,ease:'power3.inOut'});
  gsap.to(camera.position,{x: -1.7266116802495075, y: -0.28730007135483526, z: -0.46673841152876183,duration:2,delay:1 ,onComplete:  function (){
    camerarotation=false
    document.getElementById('guicentro').style.display='block';
    document.getElementById('guicentro').style.left='0px';
    let element2 = document.getElementById('guicentro')
    element2.className = "zebiMobile2";
    var bokehPass = new BokehPass(scene, camera, {
      focus: 0.1,
      aperture: 0.005,
      maxblur: 5,
      width: window.innerWidth,
      height: window.innerHeight
    }); 
  }})
  
  clickActive=true
  
  }
  })
  


document.getElementById('guicentro').onclick=function(){
  let element2 = document.getElementById('guicentro')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:0.2,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:0.2,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guimarcato').style.display='none';
  }})

  
  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 
  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});

  composer.addPass(bokehPass);; }



 	
};



function intersectsamy(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(samy);
}
var clickActive=false

window.addEventListener('click', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectsamy(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }
  controls.maxPolarAngle=Math.PI
  controls.enabled=false

  minPan = new THREE.Vector3( - 50, - 50, - 50 );
  maxPan = new THREE.Vector3( 50, 50, 50 );
gsap.to(controls.target,{x: 3.747391035902513, y: 0.3010875571611033, z: 0.19304268038591438,duration:1,ease:'power3.inOut'});
gsap.to(camera.position,{x: 2, y: 0.3010875571611034, z: 0.053358642193187394,duration:2,delay:1 ,onComplete:  function (){
  camerarotation=false
  document.getElementById('guisamy').style.display='block';
  let element2 = document.getElementById('guisamy')
  element2.className = "zebi";
  var bokehPass = new BokehPass(scene, camera, {
    focus: 0.1,
    aperture: 0.005,
    maxblur: 5,
    width: window.innerWidth,
    height: window.innerHeight
  });
}})

clickActive=true

}
})

window.addEventListener('touchstart', event => {



  // THREE RAYCASTER

 clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;
 clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;

  const found = intersectsamy(clickMouse);
  if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }
    controls.maxPolarAngle=Math.PI
    controls.enabled=false
  
    minPan = new THREE.Vector3( - 50, - 50, - 50 );
    maxPan = new THREE.Vector3( 50, 50, 50 );
  gsap.to(controls.target,{x: 3.747391035902513, y: 0.3010875571611033, z: 0.19304268038591438,duration:1,ease:'power3.inOut'});
  gsap.to(camera.position,{x: 2, y: 0.3010875571611034, z: 0.053358642193187394,duration:2,delay:1 ,onComplete:  function (){
    camerarotation=false
    document.getElementById('guisamy').style.display='block';
    document.getElementById('guisamy').style.top='70%';
    document.getElementById('guisamy').style.display='block';
    let element2 = document.getElementById('guisamy')
    element2.className = "zebiMobile2"; 
    var bokehPass = new BokehPass(scene, camera, {
      focus: 0.1,
      aperture: 0.005,
      maxblur: 5,
      width: window.innerWidth,
      height: window.innerHeight
    });

  }})
  
  clickActive=true
  
  }
  })

  var switchs = null;



document.getElementById('electorono').onclick=function(){
  
  camerarotation=false
  document.getElementById('guielectrono').style.display="block"
  let element2 = document.getElementById('guielectrono')
  element2.className = "zebi";
}
document.getElementById('storyelectronomobile').onclick=function(){
  if(switchs === 2){  let element2 = document.getElementById('test2');
  element2.className = "zebi6";}
  switchs=1
  camerarotation=false
  document.getElementById('test').style.display="block"
  let element2 = document.getElementById('test')
  element2.className = "zebiMobile";
}

document.getElementById('guielectrono').onclick=function(){
  document.getElementById('guielectrono').style.display="block"
  let element2 = document.getElementById('guielectrono')
  element2.className = "zebi5";
  camerarotation=true
}

document.getElementById('storybazaro').onclick=function(){
  camerarotation=false
  document.getElementById('guibazarstory').style.display="block"
  let element2 = document.getElementById('guibazarstory')
  element2.className = "zebi";
}


document.getElementById('storybazaromobile').onclick=function(){
  if(switchs === 1){  let element2 = document.getElementById('test');
  element2.className = "zebi6";}
  switchs=2
  camerarotation=false
  document.getElementById('test2').style.display="block"
  let element2 = document.getElementById('test2')
  element2.className = "zebiMobile";
}




document.getElementsByClassName('newclose')[0].onclick=function(){
  let element2 = document.getElementById('test');
  element2.className = "zebi6";
  camerarotation=true
  switchs=null
}
document.getElementsByClassName('newclose')[1].onclick=function(){
  let element2 = document.getElementById('test2');
  element2.className = "zebi6";
  camerarotation=true
  switchs=null
}






document.getElementById('guisamy').onclick=function(){
  let element2 = document.getElementById('guisamy')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:0.2,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:0.2,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    controls.maxPolarAngle = Math.PI*4/9
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guimarcato').style.display='none';
  }})
  
  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 
  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});

  composer.addPass(bokehPass);; } 	
};




function intersectpalazo(pos) {
  raycaster.setFromCamera(pos, camera);
  return raycaster.intersectObject(cube5);
}
var clickActive=false

window.addEventListener('mousemove', event => {
  clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  const foundpalazo = intersectpalazo(clickMouse);
  const foundcentro = intersectcentro(clickMouse);
  const foundrazzi = intersectrazzi(clickMouse);
  const foundmercato =intersectmercato(clickMouse);
  const foundbazzar = intersect(clickMouse)
  const foundarcade = intersectArcade(clickMouse)
  const foundsamy = intersectsamy(clickMouse)
  if(foundpalazo.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundcentro.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundrazzi.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundmercato.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundbazzar.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundarcade.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else if(foundsamy.length>0 && !clickActive){
      gsap.to(outerCursor, 1, {scale: 2})
  }
  else{  gsap.to(outerCursor, 1, {scale: 1})
  }
})

window.addEventListener('click', event => {



// THREE RAYCASTER
clickMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
clickMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

const found = intersectpalazo(clickMouse);
if(found.length>0 && !clickActive){
  for(let i=16;i<scene.children.length;i++){
    scene.children[i].visible=false
  }

  controls.enabled=false
   minPan = new THREE.Vector3( - 1, - 1, - 1 );
 maxPan = new THREE.Vector3( 1, 1, 1 );
gsap.to(controls.target,{x: 0.9993218565801543, y: -0.17436976232855309, z: 0.4936554286869645,duration:1,ease:'power3.inOut'});
gsap.to(camera.position,{x:0.6952679758442837,y:-0.07447583058929784,z:0.5573174043485942,duration:2,delay:1 ,onComplete:  function (){
  camerarotation=false
  document.getElementById('guipalazzo').style.display='block';
  let element2 = document.getElementById('guipalazzo')
  element2.className = "zebi";
  composer.removePass ( bokehPass ) 

  var bokehPass = new BokehPass(scene, camera, {
    focus:2,
    aperture: 0.0005,
    maxblur: 1,
    width: window.innerWidth,
    height: window.innerHeight
  });
 
  
  composer.addPass(bokehPass);
  

}})

clickActive=true

}
})


window.addEventListener('touchstart', event => {



  // THREE RAYCASTER
 clickMouse.x = +(event.targetTouches[0].pageX / window.innerWidth) * 2 +-1;

 clickMouse.y = -(event.targetTouches[0].pageY / window.innerHeight) * 2 + 1;
  const found = intersectpalazo(clickMouse);
  if(found.length>0 && !clickActive){
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=false
    }
  
    controls.enabled=false;
     minPan = new THREE.Vector3( - 1, - 1, - 1 );
   maxPan = new THREE.Vector3( 1, 1, 1 );
  gsap.to(controls.target,{x: 0.9679934151966311, y: -0.17769018640380224, z: 0.4203126863657274,duration:1,ease:'power3.inOut'});
  gsap.to(camera.position,{x: 0.697229013258861, y: -0.07801472524063895, z: 0.5727329523450009,duration:2,delay:1 ,onComplete:  function (){
    camerarotation=false
    document.getElementById('guipalazzo').style.display='block';
    document.getElementById('guipalazzo').style.left='0px';
    let element2 = document.getElementById('guipalazzo')
    element2.className = "zebiMobile2";

    
    var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (iOS) { // <-- Use the one here above
      if (window.indexedDB) { console.log('hi');; }
      if (window.SpeechSynthesisUtterance) { console.log('hi');; }
      if (window.webkitAudioContext) { console.log('hi'); }
      if (window.matchMedia) { console.log('hi');; }
      if (window.history && 'pushState' in window.history) { console.log('hi');; }
      console.log('hi');
    }
  
  else {
    composer.removePass ( bokehPass ) 
   
  
    var bokehPass = new BokehPass(scene, camera, {
      focus:2,
      aperture: 0.0005,
      maxblur: 1,
      width: window.innerWidth,
      height: window.innerHeight
    });
  
    composer.addPass(bokehPass);; } 	


  
  }})
  
  clickActive=true
  
  }
  })
  

document.getElementById('guipalazzo').onclick=function(){
  let element2 = document.getElementById('guipalazzo')
  element2.className = "zebi5";
  gsap.to(controls.target,{x: -0.330176, y: -0.291718, z: -0.113545,duration:4,delay:1,ease:'power3.inOut'});
  
  gsap.to(camera.position,{x: -0.24905360247937205, y: 0.44321605716014717, z: -1.7252216405242373,delay:1,duration:4,onComplete:function(){  controls.enabled=true;
    for(let i=16;i<scene.children.length;i++){
      scene.children[i].visible=true;
      
    }
    clickActive=false
    minPan = new THREE.Vector3( - 0.5, - 0.5, - 0.5 );
    maxPan = new THREE.Vector3( 0.5, 0.5, 0.5 );
    camerarotation=true
    document.getElementById('guimarcato').style.display='none';  
  }})

  var iOS = !window.MSStream && /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (iOS) { // <-- Use the one here above
    if (window.indexedDB) { console.log('hi');; }
    if (window.SpeechSynthesisUtterance) { console.log('hi');; }
    if (window.webkitAudioContext) { console.log('hi'); }
    if (window.matchMedia) { console.log('hi');; }
    if (window.history && 'pushState' in window.history) { console.log('hi');; }
    console.log('hi');
  }

else {
  composer.removePass ( bokehPass ) 
 
  var bokehPass = new BokehPass(scene, camera, {
    focus: 8,
 aperture: 0.001,
 maxblur: 500,
 width: window.innerWidth,
 height: window.innerHeight
});

  composer.addPass(bokehPass);; } 	



 	
};


const clock = new THREE.Clock()

const param = {
  bloomStrength: 1,
  bloomRadius: 0.5,
  bloomThreshold: 1
};

let rt = new THREE.WebGLRenderTarget(innerWidth, innerHeight, {
  type: THREE.FloatType,
  minFilter: THREE.NearestFilter,
  magFilter: THREE.NearestFilter,
  samples: 4
  
});
composer = new EffectComposer( renderer,rt   );

var renderPass = new RenderPass( scene, camera );
				composer.addPass( renderPass );

        const bloomPass = new UnrealBloomPass(
          new THREE.Vector2(window.innerWidth, window.innerHeight),
          param.bloomStrength,
          param.bloomRadius,
          param.bloomThreshold
        );
    

        composer.addPass(bloomPass);
      
 const saoPass = new SAOPass( scene, camera, sizes.width, sizes.height );
// composer.addPass( saoPass );
if (window.innerWidth < 700) {
// composer.addPass( saoPass );
}
else if (window.innerWidth > 700){
composer.addPass( saoPass );
}
// // Init gui
        saoPass.params.saoKernelRadius=15
        saoPass.params.saoBias=2;
        
        saoPass.params.saoBlurRadius=102.1
        saoPass.params.saoBlurStdDev=4
        saoPass.params.saoIntensity=0.00006;
        saoPass.params.saoBlurDepthCutoff=4.072;
// //cam animation
const tick = () =>
{
  // stats.update()
  // console.log(renderer.info.render);


if(camerarotation){
  var rotSpeed = .0007;
  var x = camera.position.x;
  var z = camera.position.z;
  camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
  camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
camera.lookAt(new Vector3(0,0,0))}

    const elapsedTime = 0.05
    const elapsedTime2 = clock.getElapsedTime()/500

    // Update objects

    controls.update()
   

    // Render
    // console.log(renderer.info.render);
    composer.render(scene,camera)
    window.requestAnimationFrame(tick)
    if(mixer1){
      
      mixer1.update(elapsedTime)
      
    }
    for ( let i = 0; i < scene.children.length; i ++ ) {
      
      const object = scene.children[ i ];
      
      if ( object instanceof THREE.Points ) {
        
        object.rotation.y = -elapsedTime2 * ( i < 4 ? i + 1 : - ( i + 1 ) );
        
      }
      
    }
    // console.log('target:',controls.target,'position:',camera.position);
  }

tick()