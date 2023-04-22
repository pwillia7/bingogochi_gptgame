// code block
// import three.js library
import * as THREE from "three";

// import a loader for glTF format
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// create a scene
const scene = new THREE.Scene();

// create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create a renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create a Bingogochi model from a glTF file
const loader = new GLTFLoader();
const clock = new THREE.Clock();

let bingogochi;
// create a directional light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 1);
scene.add(light);
let mixer;
// create a function to load the glb model
function loadModel() {
  // create a loader for glTF format
  const loader = new GLTFLoader();
  // load the glb file
  loader.load(
    // URL of the glb file
    "models/RiggedUFO.glb",
    // called when the resource is loaded
    function (gltf) {
      // get the first child of the scene (the Bingogochi model)
      bingogochi = gltf.scene.children[0];
      // add a standard material to the model
      bingogochi.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    //   bingogochi.rotateY(20);
      bingogochi.rotateX(200);
      // add the model to the scene
      scene.add(bingogochi);
      // create an animation mixer for the model
      mixer = new THREE.AnimationMixer(bingogochi);
      // get the first animation clip from the glb file
      const clip = gltf.animations[0];
      // create an animation action for the clip
      const action = mixer.clipAction(clip);
      // play the animation action
      action.play();
    },
    // called while loading is progressing
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    // called when loading has errors
    function (error) {
      console.log("An error happened");
    }
  );
}

// call the loadModel function after the renderer is appended to the document body
loadModel();

// create some variables to store the game state
let hunger = 100; // how hungry the Bingogochi is (0-100)
let mood = 50; // how happy the Bingogochi is (0-100)
let age = 0; // how old the Bingogochi is (in seconds)
let alive = true; // whether the Bingogochi is alive or not

// create a function to update the game logic
function update() {
    
    // decrease hunger by 1 every second
    hunger -= 1 / 60;
    // if hunger reaches zero, the Bingogochi dies
    if (hunger <= 0) {
      hunger = 0;
      alive = false;
      console.log("Game over! Your Bingogochi starved to death.");
    }
    // increase age by 1 every second
    age += 1 / 60;
    // if age reaches 300 seconds (5 minutes), the Bingogochi dies of old age
    if (age >= 300) {
      age = 300;
      alive = false;
      console.log("Game over! Your Bingogochi died of old age.");
    }
    // update mood based on hunger and age
    mood = Math.max(0, Math.min(100, hunger - age / 3));
  }

// create a function to render the scene
// create a function to render the scene
function render() {
    // clear the renderer
    renderer.clear();
    // rotate the Bingogochi slightly
    // if (bingogochi) {
    //   bingogochi.rotation.y += 0.01;
      // change the Bingogochi's color based on mood
    //   bingogochi.material.color.setHSL(mood / 100, 1, 0.5);
    // }
    // render the scene and camera
    renderer.render(scene, camera);
  }

  
  // create some UI elements using HTML and CSS
  
  // create a function to create the UI elements
  function createUI(){
    // create a div element to contain the UI elements
    const uiDiv = document.createElement("div");
    uiDiv.id = "uiDiv";
    uiDiv.style.position = "absolute";
    uiDiv.style.top = "0";
    uiDiv.style.left = "0";
    uiDiv.style.width = "100%";
    uiDiv.style.height = "100%";
    uiDiv.style.pointerEvents = "none"; // make sure the UI does not block mouse events for the canvas
    document.body.appendChild(uiDiv);
    
    // create a progress bar element to show the hunger level
    const hungerBar = document.createElement("progress");
    hungerBar.id = "hungerBar";
    hungerBar.style.position = "absolute";
    hungerBar.style.top = "10px";
    hungerBar.style.left = "10px";
    hungerBar.style.width = "200px";
    hungerBar.style.height = "20px";
    hungerBar.max = "100";
    hungerBar.value = hunger;
    uiDiv.appendChild(hungerBar);
    
    // create a progress bar element to show the mood level
    // create a progress bar element to show the mood level
    const moodBar = document.createElement("progress");
    moodBar.id = "moodBar";
    moodBar.style.position = "absolute";
    moodBar.style.top = "40px";
    moodBar.style.left = "10px";
    moodBar.style.width = "200px";
    moodBar.style.height = "20px";
    moodBar.max = "100";
    moodBar.value = mood;
    uiDiv.appendChild(moodBar);
    
    // create a text element to show the age of the Bingogochi
    const ageText = document.createElement("p");
    ageText.id = "ageText";
    ageText.style.position = "absolute";
    ageText.style.top = "70px";
    ageText.style.left = "10px";
    ageText.style.color = "white";
    ageText.style.fontFamily = "Arial";
    ageText.style.fontSize = "20px";
    ageText.textContent = "Age: " + age.toFixed(2) + " seconds";
    uiDiv.appendChild(ageText);
    
    // create a button element to feed the Bingogochi
    const feedButton = document.createElement("button");
    feedButton.id = "feedButton";
    feedButton.style.position = "absolute";
    feedButton.style.bottom = "10px";
    feedButton.style.left = "10px";
    feedButton.style.width = "100px";
    feedButton.style.height = "50px";
    feedButton.textContent = "Feed";
    feedButton.style.pointerEvents = "auto"; // enable mouse events for the button
    uiDiv.appendChild(feedButton);
    const interactButton = document.createElement("button");
    interactButton.id = "interactButton";
    interactButton.style.position = "absolute";
    interactButton.style.bottom = "10px";
    interactButton.style.left = "230px";
    interactButton.style.width = "100px";
    interactButton.style.height = "50px";
    interactButton.textContent = "Interact";
    interactButton.style.pointerEvents = "auto"; // enable mouse events for the button
    uiDiv.appendChild(interactButton);
    
    const cleanButton = document.createElement("button");
cleanButton.id = "cleanButton";
cleanButton.style.position = "absolute";
cleanButton.style.bottom = "10px";
cleanButton.style.left = "120px";
cleanButton.style.width = "100px";
cleanButton.style.height = "50px";
cleanButton.textContent = "Clean";
cleanButton.style.pointerEvents = "auto"; // enable mouse events for the button
uiDiv.appendChild(cleanButton);
    
    }
    createUI();

// add an event listener to the feed button
feedButton.addEventListener("click", feedBingogochi);

// create a button element to clean the Bingogochi


// create a function to handle the clean button click
function cleanBingogochi() {
  // increase mood by 10
  mood += 10;
  // limit mood to 100
  mood = Math.min(100, mood);
  // update the mood bar value
  moodBar.value = mood;
}

// add an event listener to the clean button
cleanButton.addEventListener("click", cleanBingogochi);

// create a button element to interact with the Bingogochi

// create a function to update the UI elements
function updateUI() {
  // update the hunger bar value
  hungerBar.value = hunger;
  // update the mood bar value
  moodBar.value = mood;
  // update the age text content
  ageText.textContent = "Age: " + age.toFixed(2) + " seconds";
}

// create a function to animate the game loop
function animate() {
    // request the next animation frame
    requestAnimationFrame(animate);
    // if the Bingogochi is alive, update and render the game
    if (alive) {
      update();
      render();
      updateUI(); // add this line to update the UI elements every frame
      console.log("Hunger: " + hunger.toFixed(2) + ", Mood: " + mood.toFixed(2) + ", Age: " + age.toFixed(2));
      // update the animation mixer with delta time
      const delta = clock.getDelta();
      mixer.update(delta);
      }
  }

// start the game loop
animate();

// create some event listeners for user input

// create a function to handle the feed button click
function feedBingogochi() {
  // increase hunger by 10
  hunger += 10;
  // limit hunger to 100
  hunger = Math.min(100, hunger);
}

// add an event listener to the feed button
feedButton.addEventListener("click", feedBingogochi);

// add an event listener to the clean button
cleanButton.addEventListener("click", cleanBingogochi);

// create a function to handle the interact button click
function interactBingogochi() {
    // create a raycaster to detect mouse clicks on the Bingogochi
    const raycaster = new THREE.Raycaster();
    // get the mouse position in normalized device coordinates
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    // update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);
    // calculate the objects that intersect with the ray
    const intersects = raycaster.intersectObjects(scene.children);
    // if the Bingogochi is clicked, do something
    if (intersects.length > 0 && intersects[0].object === bingogochi) {
      // increase mood by 5
      mood += 5;
      // limit mood to 100
      mood = Math.min(100, mood);
      // make the Bingogochi scale up and down as a feedback
      bingogochi.scale.set(1.2, 1.2, 1.2);
      setTimeout(() => {
        bingogochi.scale.set(1, 1, 1);
      }, 500);
    }
  }
  
  // add an event listener to the interact button
  interactButton.addEventListener("click", interactBingogochi);
  
  // create a function to handle the window resize event
  function onWindowResize() {
    // update the camera aspect ratio and projection matrix
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    // update the renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
  }
  
  // add an event listener to the window resize event
  window.addEventListener("resize", onWindowResize);