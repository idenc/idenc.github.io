import * as THREE from "three";
import Stats from "./stats";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import AmmoLib from "ammo.js";
import ProceduralCity from "./cityGenerator";
import * as dat from "dat.gui";

export default class SwingGame {
  static gravityConstant = -9.8;

  constructor() {
    this.clock = new THREE.Clock();
    this.rigidBodies = [];
    this.margin = 0.05;

    this.armMovement = 0;
    this.gui = new dat.GUI();
    this.isGUIInitialized = false;

    AmmoLib().then((AmmoLib) => {
      this.Ammo = AmmoLib;

      this.init();
      new ProceduralCity(this.scene, this.renderer, this.gui);
      this.animate();
    });
  }

  init() {
    this.initGraphics();

    // this.initPhysics();

    // this.createObjects();

    // this.initInput();
  }

  initGUI() {
    if (!this.isGUIInitialized) {
      this.isGUIInitialized = true;
      const cameraFolder = this.gui.addFolder("camera");
      const positionFolder = cameraFolder.addFolder("position");
      positionFolder.add(this.camera.position, "x");
      positionFolder.add(this.camera.position, "y");
      positionFolder.add(this.camera.position, "z");
      const rotationFolder = cameraFolder.addFolder("rotation");
      rotationFolder.add(this.camera.rotation, "x");
      rotationFolder.add(this.camera.rotation, "y");
      rotationFolder.add(this.camera.rotation, "z");
    }
  }

  initGraphics() {
    this.container = document.getElementById("swing-container");
    console.log(this.container);

    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000a1c);

    this.camera.position.set(0, 290, 0);
    this.initGUI();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0.1, 290, 0);
    this.controls.update();

    this.stats = new Stats();
    this.stats.domElement.style.position = "absolute";
    this.stats.domElement.style.top = "0px";
    this.container.appendChild(this.stats.domElement);

    window.addEventListener("resize", this.onWindowResize);
  }

  initPhysics() {
    // Physics configuration

    this.collisionConfiguration =
      new this.Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    this.dispatcher = new this.Ammo.btCollisionDispatcher(
      this.collisionConfiguration
    );
    this.broadphase = new this.Ammo.btDbvtBroadphase();
    this.solver = new this.Ammo.btSequentialImpulseConstraintSolver();
    this.softBodySolver = new this.Ammo.btDefaultSoftBodySolver();
    this.physicsWorld = new this.Ammo.btSoftRigidDynamicsWorld(
      this.dispatcher,
      this.broadphase,
      this.solver,
      this.collisionConfiguration,
      this.softBodySolver
    );
    this.physicsWorld.setGravity(
      new this.Ammo.btVector3(0, SwingGame.gravityConstant, 0)
    );
    this.physicsWorld
      .getWorldInfo()
      .set_m_gravity(new this.Ammo.btVector3(0, SwingGame.gravityConstant, 0));

    this.transformAux1 = new this.Ammo.btTransform();
  }

  createObjects() {
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    // Ground
    pos.set(0, -0.5, 0);
    quat.set(0, 0, 0, 1);
    const ground = this.createParalellepiped(
      40,
      1,
      40,
      0,
      pos,
      quat,
      new THREE.MeshPhongMaterial({ color: 0xffffff })
    );
    ground.castShadow = true;
    ground.receiveShadow = true;
    // textureLoader.load("textures/grid.png", (texture) {
    //   texture.wrapS = THREE.RepeatWrapping;
    //   texture.wrapT = THREE.RepeatWrapping;
    //   texture.repeat.set(40, 40);
    //   ground.material.map = texture;
    //   ground.material.needsUpdate = true;
    // });

    // Ball
    const ballMass = 1.2;
    const ballRadius = 0.6;

    this.ball = new THREE.Mesh(
      new THREE.SphereGeometry(ballRadius, 20, 20),
      new THREE.MeshPhongMaterial({ color: 0x202020 })
    );
    this.ball.castShadow = true;
    this.ball.receiveShadow = true;
    const ballShape = new this.Ammo.btSphereShape(ballRadius);
    ballShape.setMargin(this.margin);
    pos.set(-3, 2, 0);
    quat.set(0, 0, 0, 1);
    this.createRigidBody(this.ball, ballShape, ballMass, pos, quat);
    this.ball.userData.physicsBody.setFriction(0.5);

    // Wall
    const brickMass = 0.5;
    const brickLength = 1.2;
    const brickDepth = 0.6;
    const brickHeight = brickLength * 0.5;
    const numBricksLength = 6;
    const numBricksHeight = 8;
    const z0 = -numBricksLength * brickLength * 0.5;
    pos.set(0, brickHeight * 0.5, z0);
    quat.set(0, 0, 0, 1);

    for (let j = 0; j < numBricksHeight; j++) {
      const oddRow = j % 2 == 1;

      pos.z = z0;

      if (oddRow) {
        pos.z -= 0.25 * brickLength;
      }

      const nRow = oddRow ? numBricksLength + 1 : numBricksLength;

      for (let i = 0; i < nRow; i++) {
        let brickLengthCurrent = brickLength;
        let brickMassCurrent = brickMass;
        if (oddRow && (i == 0 || i == nRow - 1)) {
          brickLengthCurrent *= 0.5;
          brickMassCurrent *= 0.5;
        }

        const brick = this.createParalellepiped(
          brickDepth,
          brickHeight,
          brickLengthCurrent,
          brickMassCurrent,
          pos,
          quat,
          this.createMaterial()
        );
        brick.castShadow = true;
        brick.receiveShadow = true;

        if (oddRow && (i == 0 || i == nRow - 2)) {
          pos.z += 0.75 * brickLength;
        } else {
          pos.z += brickLength;
        }
      }

      pos.y += brickHeight;
    }

    // The rope
    // Rope graphic object
    const ropeNumSegments = 10;
    const ropeLength = 4;
    const ropeMass = 3;
    const ropePos = this.ball.position.clone();
    ropePos.y += ballRadius;

    const segmentLength = ropeLength / ropeNumSegments;
    const ropeGeometry = new THREE.BufferGeometry();
    const ropeMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const ropePositions = [];
    const ropeIndices = [];

    for (let i = 0; i < ropeNumSegments + 1; i++) {
      ropePositions.push(ropePos.x, ropePos.y + i * segmentLength, ropePos.z);
    }

    for (let i = 0; i < ropeNumSegments; i++) {
      ropeIndices.push(i, i + 1);
    }

    ropeGeometry.setIndex(
      new THREE.BufferAttribute(new Uint16Array(ropeIndices), 1)
    );
    ropeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(ropePositions), 3)
    );
    ropeGeometry.computeBoundingSphere();
    this.rope = new THREE.LineSegments(ropeGeometry, ropeMaterial);
    this.rope.castShadow = true;
    this.rope.receiveShadow = true;
    this.scene.add(this.rope);

    // Rope physic object
    const softBodyHelpers = new this.Ammo.btSoftBodyHelpers();
    const ropeStart = new this.Ammo.btVector3(ropePos.x, ropePos.y, ropePos.z);
    const ropeEnd = new this.Ammo.btVector3(
      ropePos.x,
      ropePos.y + ropeLength,
      ropePos.z
    );
    const ropeSoftBody = softBodyHelpers.CreateRope(
      this.physicsWorld.getWorldInfo(),
      ropeStart,
      ropeEnd,
      ropeNumSegments - 1,
      0
    );
    const sbConfig = ropeSoftBody.get_m_cfg();
    sbConfig.set_viterations(10);
    sbConfig.set_piterations(10);
    ropeSoftBody.setTotalMass(ropeMass, false);
    this.Ammo.castObject(ropeSoftBody, this.Ammo.btCollisionObject)
      .getCollisionShape()
      .setMargin(this.margin * 3);
    this.physicsWorld.addSoftBody(ropeSoftBody, 1, -1);
    this.rope.userData.physicsBody = ropeSoftBody;
    // Disable deactivation
    ropeSoftBody.setActivationState(4);

    // The base
    const armMass = 2;
    const armLength = 3;
    const pylonHeight = ropePos.y + ropeLength;
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    pos.set(ropePos.x, 0.1, ropePos.z - armLength);
    quat.set(0, 0, 0, 1);
    const base = this.createParalellepiped(
      1,
      0.2,
      1,
      0,
      pos,
      quat,
      baseMaterial
    );
    base.castShadow = true;
    base.receiveShadow = true;
    pos.set(ropePos.x, 0.5 * pylonHeight, ropePos.z - armLength);
    const pylon = this.createParalellepiped(
      0.4,
      pylonHeight,
      0.4,
      0,
      pos,
      quat,
      baseMaterial
    );
    pylon.castShadow = true;
    pylon.receiveShadow = true;
    pos.set(ropePos.x, pylonHeight + 0.2, ropePos.z - 0.5 * armLength);
    const arm = this.createParalellepiped(
      0.4,
      0.4,
      armLength + 0.4,
      armMass,
      pos,
      quat,
      baseMaterial
    );
    arm.castShadow = true;
    arm.receiveShadow = true;

    // Glue the rope extremes to the ball and the arm
    const influence = 1;
    ropeSoftBody.appendAnchor(
      0,
      this.ball.userData.physicsBody,
      true,
      influence
    );
    ropeSoftBody.appendAnchor(
      ropeNumSegments,
      arm.userData.physicsBody,
      true,
      influence
    );

    // Hinge constraint to move the arm
    const pivotA = new this.Ammo.btVector3(0, pylonHeight * 0.5, 0);
    const pivotB = new this.Ammo.btVector3(0, -0.2, -armLength * 0.5);
    const axis = new this.Ammo.btVector3(0, 1, 0);
    this.hinge = new this.Ammo.btHingeConstraint(
      pylon.userData.physicsBody,
      arm.userData.physicsBody,
      pivotA,
      pivotB,
      axis,
      axis,
      true
    );
    this.physicsWorld.addConstraint(this.hinge, true);
  }

  createParalellepiped(sx, sy, sz, mass, pos, quat, material) {
    const threeObject = new THREE.Mesh(
      new THREE.BoxGeometry(sx, sy, sz, 1, 1, 1),
      material
    );
    const shape = new this.Ammo.btBoxShape(
      new this.Ammo.btVector3(sx * 0.5, sy * 0.5, sz * 0.5)
    );
    shape.setMargin(this.margin);

    this.createRigidBody(threeObject, shape, mass, pos, quat);

    return threeObject;
  }

  createRigidBody(threeObject, physicsShape, mass, pos, quat) {
    threeObject.position.copy(pos);
    threeObject.quaternion.copy(quat);

    const transform = new this.Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new this.Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(
      new this.Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w)
    );
    const motionState = new this.Ammo.btDefaultMotionState(transform);

    const localInertia = new this.Ammo.btVector3(0, 0, 0);
    physicsShape.calculateLocalInertia(mass, localInertia);

    const rbInfo = new this.Ammo.btRigidBodyConstructionInfo(
      mass,
      motionState,
      physicsShape,
      localInertia
    );
    const body = new this.Ammo.btRigidBody(rbInfo);

    threeObject.userData.physicsBody = body;

    this.scene.add(threeObject);

    if (mass > 0) {
      this.rigidBodies.push(threeObject);

      // Disable deactivation
      body.setActivationState(4);
    }

    this.physicsWorld.addRigidBody(body);
  }

  createRandomColor() {
    return Math.floor(Math.random() * (1 << 24));
  }

  createMaterial() {
    return new THREE.MeshPhongMaterial({ color: this.createRandomColor() });
  }

  initInput() {
    window.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        // Q
        case 81:
          this.armMovement = 1;
          break;

        // A
        case 65:
          this.armMovement = -1;
          break;
      }
    });

    window.addEventListener("keyup", () => {
      this.armMovement = 0;
    });
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // this.camera.position.copy(this.ball.position);
    // this.camera.rotation.copy(this.ball.rotation);
    this.render();
    this.stats.update();
  }

  render() {
    const deltaTime = this.clock.getDelta();

    // this.updatePhysics(deltaTime);

    this.renderer.render(this.scene, this.camera);
  }

  updatePhysics(deltaTime) {
    // Hinge control
    this.hinge.enableAngularMotor(true, 1.5 * this.armMovement, 50);

    // Step world
    this.physicsWorld.stepSimulation(deltaTime, 10);

    // Update rope
    const softBody = this.rope.userData.physicsBody;
    const ropePositions = this.rope.geometry.attributes.position.array;
    const numVerts = ropePositions.length / 3;
    const nodes = softBody.get_m_nodes();
    let indexFloat = 0;

    for (let i = 0; i < numVerts; i++) {
      const node = nodes.at(i);
      const nodePos = node.get_m_x();
      ropePositions[indexFloat++] = nodePos.x();
      ropePositions[indexFloat++] = nodePos.y();
      ropePositions[indexFloat++] = nodePos.z();
    }

    this.rope.geometry.attributes.position.needsUpdate = true;

    // Update rigid bodies
    for (let i = 0, il = this.rigidBodies.length; i < il; i++) {
      const objThree = this.rigidBodies[i];
      const objPhys = objThree.userData.physicsBody;
      const ms = objPhys.getMotionState();
      if (ms) {
        ms.getWorldTransform(this.transformAux1);
        const p = this.transformAux1.getOrigin();
        const q = this.transformAux1.getRotation();
        objThree.position.set(p.x(), p.y(), p.z());
        objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
      }
    }
  }
}
