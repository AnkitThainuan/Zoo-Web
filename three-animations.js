// Initialize Three.js scenes
let scenes = [];
let cameras = [];
let renderers = [];

// Configuration for different 3D objects
const config = {
    hero: {
        geometry: new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
        material: new THREE.MeshPhongMaterial({ 
            color: 0x937341,
            shininess: 100,
            specular: 0xffffff
        }),
        position: { x: 0, y: 0, z: -5 },
        rotation: { x: 0.01, y: 0.01, z: 0.01 }
    },
    collection1: {
        geometry: new THREE.IcosahedronGeometry(1, 0),
        material: new THREE.MeshPhongMaterial({ 
            color: 0xc9a875,
            shininess: 80,
            specular: 0xffffff
        }),
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0.005, y: 0.01, z: 0 }
    },
    collection2: {
        geometry: new THREE.OctahedronGeometry(1, 0),
        material: new THREE.MeshPhongMaterial({ 
            color: 0x937341,
            shininess: 90,
            specular: 0xffffff
        }),
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0.01, y: -0.01, z: 0 }
    },
    collection3: {
        geometry: new THREE.DodecahedronGeometry(1, 0),
        material: new THREE.MeshPhongMaterial({ 
            color: 0xc9a875,
            shininess: 70,
            specular: 0xffffff
        }),
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0, y: 0.01, z: 0.005 }
    }
};

// Initialize 3D scene
function initScene(containerId, configKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    scenes.push(scene);

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameras.push(camera);

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    renderers.push(renderer);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Add 3D object
    const conf = config[configKey];
    const mesh = new THREE.Mesh(conf.geometry, conf.material);
    mesh.position.set(conf.position.x, conf.position.y, conf.position.z);
    scene.add(mesh);

    // Animation function
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += conf.rotation.x;
        mesh.rotation.y += conf.rotation.y;
        mesh.rotation.z += conf.rotation.z;
        renderer.render(scene, camera);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Start animation
    animate();
}

// Initialize all 3D scenes when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScene('hero-3d', 'hero');
    initScene('collection-3d-1', 'collection1');
    initScene('collection-3d-2', 'collection2');
    initScene('collection-3d-3', 'collection3');
});
