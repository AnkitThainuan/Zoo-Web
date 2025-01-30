// Initialize Three.js components
let scenes = {};
let cameras = {};
let renderers = {};
let models = {};
let animations = {};

// Bird models configuration
const birdModels = {
    hero: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 3,
        position: { x: 0, y: 0, z: -5 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.005
        }
    },
    macaw: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 1.5,
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.003
        }
    },
    grey: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 1.2,
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0, y: -Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.004
        }
    },
    cockatoo: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 1.3,
        position: { x: 0, y: 0, z: -3 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.003
        }
    },
    zebra: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 0.8,
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.006
        }
    },
    gouldian: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 0.9,
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: -Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.005
        }
    },
    society: {
        url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Parrot/glTF/Parrot.gltf',
        scale: 0.85,
        position: { x: 0, y: 0, z: -2 },
        rotation: { x: 0, y: Math.PI / 4, z: 0 },
        animation: {
            hover: true,
            rotate: true,
            rotateSpeed: 0.004
        }
    }
};

// Initialize 3D scene
function initBirdScene(containerId, modelKey) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Create scene
    const scene = new THREE.Scene();
    scenes[containerId] = scene;

    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    cameras[containerId] = camera;

    // Create renderer
    const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);
    renderers[containerId] = renderer;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load 3D model
    const loader = new THREE.GLTFLoader();
    const modelConfig = birdModels[modelKey];

    loader.load(modelConfig.url, (gltf) => {
        const model = gltf.scene;
        
        // Apply transformations
        model.scale.setScalar(modelConfig.scale);
        model.position.set(
            modelConfig.position.x,
            modelConfig.position.y,
            modelConfig.position.z
        );
        model.rotation.set(
            modelConfig.rotation.x,
            modelConfig.rotation.y,
            modelConfig.rotation.z
        );

        scene.add(model);
        models[containerId] = model;

        // Store animations if available
        if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model);
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
            animations[containerId] = {
                mixer: mixer,
                clock: new THREE.Clock()
            };
        }

        // Add hover animation
        if (modelConfig.animation.hover) {
            gsap.to(model.position, {
                y: '+=0.5',
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        const width = container.clientWidth;
        const height = container.clientHeight;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const model = models[containerId];
        if (model && birdModels[modelKey].animation.rotate) {
            model.rotation.y += birdModels[modelKey].animation.rotateSpeed;
        }

        // Update animations if available
        if (animations[containerId]) {
            const animation = animations[containerId];
            animation.mixer.update(animation.clock.getDelta());
        }

        renderer.render(scene, camera);
    }

    animate();
}

// Initialize scroll-based interactions
function initScrollInteractions() {
    // Hero bird parallax effect
    gsap.to('#hero-3d', {
        scrollTrigger: {
            trigger: '#home',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 200,
        scale: 1.2,
        opacity: 0
    });

    // Bird cards animation
    document.querySelectorAll('.bird-card').forEach((card) => {
        const container = card.querySelector('.three-d-container');
        if (container) {
            gsap.from(container, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top bottom-=100',
                    end: 'bottom top+=100',
                    scrub: true
                },
                rotationY: 180,
                opacity: 0
            });
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing 3D birds...');
    
    // Initialize 3D scenes
    initBirdScene('hero-3d', 'hero');
    initBirdScene('macaw-3d', 'macaw');
    initBirdScene('grey-3d', 'grey');
    initBirdScene('cockatoo-3d', 'cockatoo');
    initBirdScene('zebra-3d', 'zebra');
    initBirdScene('gouldian-3d', 'gouldian');
    initBirdScene('society-3d', 'society');

    // Initialize scroll interactions
    initScrollInteractions();
});
