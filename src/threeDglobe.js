// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("globe-container").appendChild(renderer.domElement);

// Create a 3D globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const texture = new THREE.TextureLoader().load('path_to_earth_texture.jpg');
const material = new THREE.MeshBasicMaterial({ map: texture });
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Add a city marker
const markerGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color for the marker
const cityMarker = new THREE.Mesh(markerGeometry, markerMaterial);
scene.add(cityMarker);

// Position the camera and globe
camera.position.z = 10;

// Function to animate the globe
function animate() {
    requestAnimationFrame(animate);

    // Rotate the globe
    globe.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// Call the animate function to start the animation loop
animate();

// Function to highlight a city on the globe
function highlightCity(latitude, longitude) {
    // Convert latitude and longitude to 3D coordinates
    const phi = (90 - latitude) * (Math.PI / 180);
    const theta = (longitude + 180) * (Math.PI / 180);

    // Calculate the new position of the city marker
    cityMarker.position.x = 5 * Math.sin(phi) * Math.cos(theta);
    cityMarker.position.y = 5 * Math.cos(phi);
    cityMarker.position.z = 5 * Math.sin(phi) * Math.sin(theta);
}

// Example usage: Highlight New York City
highlightCity(40.7128, -74.0060);
