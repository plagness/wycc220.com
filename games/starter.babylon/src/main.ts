import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { HemisphericLight } from "@babylonjs/core/Lights/hemisphericLight.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Scene } from "@babylonjs/core/scene.js";
import { Vector3 } from "@babylonjs/core/Maths/math.vector.js";
import { notifyHost } from "@wycc220/game.sdk";
import "./styles.css";

const canvas = document.querySelector<HTMLCanvasElement>("#game");
const status = document.querySelector<HTMLElement>("#status");

if (!canvas || !status) throw new Error("Game shell is incomplete");

const engine = new Engine(canvas, true, {
  preserveDrawingBuffer: false,
  stencil: true,
});
const scene = new Scene(engine);
scene.clearColor.set(0.035, 0.04, 0.047, 1);

const camera = new ArcRotateCamera(
  "camera",
  Math.PI / 4,
  Math.PI / 3,
  7,
  Vector3.Zero(),
  scene,
);
camera.attachControl(canvas, true);

const light = new HemisphericLight("light", new Vector3(0, 1, 0), scene);
light.intensity = 1.1;

const box = MeshBuilder.CreateBox("starter.box", { size: 2 }, scene);
box.rotation.x = 0.3;

const renderFrame = () => {
  box.rotation.y += engine.getDeltaTime() * 0.00035;
  scene.render();
};

engine.runRenderLoop(renderFrame);

const resize = () => engine.resize();
window.addEventListener("resize", resize);
document.addEventListener("visibilitychange", () => {
  if (document.hidden) engine.stopRenderLoop();
  else engine.runRenderLoop(renderFrame);
});

status.hidden = true;
const hostOrigin = document.referrer
  ? new URL(document.referrer).origin
  : window.location.origin;
notifyHost(hostOrigin, "ready", { renderer: "webgl", manifestVersion: 1 });
