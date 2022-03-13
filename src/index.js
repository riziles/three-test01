import * as THREE from 'three';
import OrbitControls from "three-orbitcontrols";

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let camera;
let scene;
let color_rand;
let geometry;

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
camera.position.y = 500;

scene = new THREE.Scene();

let object;

const ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
scene.add( ambientLight );

const pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

const material = new THREE.MeshPhongMaterial( {
    color: 0x80ee10,
    shininess: 100,
    side: THREE.DoubleSide});

//

let i = 0;
let x = 0;
let y = 0;
let xtemp = 0;
let xscale = 400;
let yscale = 50;
const points = [];

for ( let x0 = 0; x0 < xscale; x0 ++ ) {

    for ( let y0 = 0; y0 < yscale; y0 ++ ) {

        i = 0;
        x = 0;
        y = 0;

        while (x*x + y*y <= 2*2 && i < 20) {
            xtemp = x*x - y*y + (x0*2.5/xscale - 2);
            y = 2*x*y + (y0/yscale);
            x = xtemp;
            i++;
        }
        if (x*x + y*y <= 2*2 && i > 19) {

            color_rand = new THREE.Color( 0xffffff );
            color_rand.setHex( Math.random() * 0xffffff );

            const material = new THREE.MeshPhongMaterial( {
                color: color_rand,
                shininess: 100,
                side: THREE.DoubleSide});

            geometry = new THREE.TorusGeometry( y0*100/yscale,1,8,30);
            object = new THREE.Mesh(geometry, material);
            object.position.z = 200-x0*500/xscale;
            scene.add( object)
        }
    }
}

var controls = new OrbitControls( camera, renderer.domElement );

controls.update();

function animate() {
    requestAnimationFrame( animate );

	controls.update();

    renderer.render( scene, camera );
};

animate();