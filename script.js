// Three.js Setup for 3D Controller and Starry Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// 3D Game Controller (Simplified Cube as Placeholder)
const geometry = new THREE.BoxGeometry(1, 0.5, 0.2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ffcc, wireframe: true });
const controller = new THREE.Mesh(geometry, material);
scene.add(controller);
camera.position.z = 5;

// Starry Background (Particle System)
const particlesGeometry = new THREE.BufferGeometry();
const particleCount = 5000;
const posArray = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 200;
}
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xffffff,
});
const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    controller.rotation.x += 0.01;
    controller.rotation.y += 0.01;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}
animate();

// Handle Window Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// GSAP Animations for Hero Content
gsap.from(".hero-content h1", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power2.out",
    delay: 0.5
});
gsap.from(".hero-content p", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "power2.out",
    delay: 1
});
gsap.from(".cta-btn", {
    duration: 1.5,
    scale: 0.8,
    opacity: 0,
    ease: "elastic.out(1, 0.3)",
    delay: 1.5
});

// Smooth Scrolling for Navigation
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(btn.getAttribute("href"));
        window.scrollTo({
            top: target.offsetTop,
            behavior: "smooth"
        });
    });
});

// Interactive Controller Hover (Zoom on Mouse Move)
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    controller.rotation.x = mouseY * 0.5;
    controller.rotation.y = mouseX * 0.5;
});
