// Code based on PROCEDURALLY GENERATED CITY - A project by Johan Olsson
// Linköping University (TNM084)
import * as THREE from "three";

export default class ProceduralCity {
  constructor(scene, renderer, gui) {
    this.gui = gui;
    this.scene = scene;
    this.renderer = renderer;
    this.settings = {
      numberOfBuildings: 1000,
      maxHeight: 175,
      awakeness: 0.7,
    };
    this.renderer.setClearColor(0x000a1c, 1);
    this.buildCity();
  }

  seededRandom(max, min) {
    max = max || 1;
    min = min || 0;

    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    const rnd = Math.seed / 233280;

    return min + rnd * (max - min);
  }

  texturizeCity(matrices) {
    // get value from slider

    const texture = new THREE.Texture(this.generateTexture());
    texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy(); //https://blog.tojicode.com/2012/03/anisotropic-filtering-in-webgl.html - for details
    texture.needsUpdate = true;

    const material = new THREE.MeshLambertMaterial({
      map: texture,
    });

    this.cityMesh = new THREE.InstancedMesh(
      this.cityGeometry,
      material,
      this.settings.numberOfBuildings
    );

    for (let i = 0; i < this.settings.numberOfBuildings; i++) {
      this.cityMesh.setMatrixAt(i, matrices[i]);
    }

    this.scene.add(this.cityMesh);
  }

  generateTexture() {
    const step = 2;
    const threshold = 1.0 - this.settings.awakeness;

    // Small texture
    const canvas = document.createElement("canvas");

    canvas.width = 32;
    canvas.height = 64;

    let context = canvas.getContext("2d");

    context.fillStyle = "#000000";
    context.fillRect(0, 0, 32, 64);

    // reset seed
    Math.seed = 1;

    for (let y = 4; y < canvas.height; y += step) {
      for (let x = 2; x < canvas.width; x += step) {
        // window color
        context.fillStyle = "#fcff72";
        let randVal, randVal2;

        // decide how visible the lights will be depending on how close to the ground they are
        if (y < canvas.height * 0.75) {
          randVal = this.seededRandom();
          randVal2 = this.seededRandom();
        } else if (y < canvas.height * 0.9) {
          // less visible
          randVal = this.seededRandom() * this.seededRandom();
          randVal2 = this.seededRandom() * this.seededRandom();
        } else {
          // barely visible
          randVal =
            this.seededRandom() * this.seededRandom() * this.seededRandom();
          randVal2 =
            this.seededRandom() * this.seededRandom() * this.seededRandom();
        }

        if (randVal < threshold) {
          randVal = 0;
        }
        if (randVal2 < threshold) {
          randVal2 = 0;
        }

        context.fillRect(x, y, randVal, randVal2);

        Math.seed++;
      }
    }

    // big texture
    const bigCanvas = document.createElement("canvas");
    bigCanvas.width = 512;
    bigCanvas.height = 1024;
    context = bigCanvas.getContext("2d");

    // disable smoothing to avoid blurry effect when scaling
    context.imageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;

    // copy small canvas into big canvas
    context.drawImage(canvas, 0, 0, bigCanvas.width, bigCanvas.height);

    return bigCanvas;
  }

  buildLight() {
    const hemLight = new THREE.HemisphereLight(0xfffff0, 0x101020, 1.25);
    hemLight.position.set(0.75, 1, 0.25);
    this.scene.add(hemLight);

    this.buildingLight = new THREE.PointLight(0xffffff, 5.0);
    this.scene.add(this.buildingLight);
  }

  buildCity() {
    this.buildLight();

    this.gui.add(this.settings, "numberOfBuildings", 0, 5000, 100);
    this.gui.add(this.settings, "maxHeight", 0, 40, 300);
    this.gui.add(this.settings, "awakeness", 0, 1, 0.05);

    // ground
    const planeGeometry = new THREE.PlaneGeometry(10000, 10000, 32);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = Math.PI / 2;
    this.scene.add(plane);

    // base geometry for buildings
    this.cityGeometry = new THREE.BoxGeometry(1, 1, 1);

    // translate pivot to the bottom
    this.cityGeometry.applyMatrix4(
      new THREE.Matrix4().makeTranslation(0, 0.5, 0)
    );

    // TODO: Remove bottom face
    // Don't know why this fixes top UVs?
    for (let i = 18; i < 20; i++) {
      this.cityGeometry.attributes.uv.array[i] = 0;
    }
    this.cityGeometry.attributes.uv.needsUpdate = true;

    // reset seed
    Math.seed = 1;
    const matrices = [];

    for (let i = 0; i < this.settings.numberOfBuildings; i++) {
      const buildingMesh = new THREE.Mesh(this.cityGeometry);
      Math.seed++;

      // position of buildings
      buildingMesh.position.set(
        Math.floor(this.seededRandom() * 200 - 100) * 20,
        buildingMesh.position.y,
        Math.floor(this.seededRandom() * 200 - 100) * 20
      );

      // size of buildings
      buildingMesh.scale.x =
        this.seededRandom() *
          this.seededRandom() *
          this.seededRandom() *
          this.seededRandom() *
          30 +
        50;
      buildingMesh.scale.z = buildingMesh.scale.x;

      // height
      // get value from slider
      const maxHeight = this.settings.maxHeight;
      buildingMesh.scale.y = this.seededRandom() * maxHeight + maxHeight / 1.4;

      // add light to building
      this.buildingLight.position.copy(buildingMesh.position);
      this.scene.add(this.buildingLight);
      buildingMesh.updateMatrix();
      matrices.push(buildingMesh.matrix);
    }

    this.texturizeCity(matrices);
  }
}
