import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import SceneInit from './lib/SceneInit';

function App() {
  useEffect(() => {
    const test = new SceneInit('myThreeJsCanvas');
    test.initialize();
    test.animate();
    const modelPaths = [
      './assets/room_scan_3d_point_cloud/scene.gltf',
      './assets/isometric_basic_room/scene.gltf',
      './assets/shiba/scene.gltf',
    ];

    const loader = new GLTFLoader();
    let currentModel = null;
    let modelIndex = 0;

    const loadModel = (path) => {
      loader.load(path, (gltf) => {
        if (currentModel) {
          test.scene.remove(currentModel);
        }

        const model = gltf.scene;
        model.rotation.y = Math.PI / 8;
        model.position.y = 3;
        model.scale.set(10, 10, 10);
        test.scene.add(model);
        currentModel = model;
      });
    };

    loadModel(modelPaths[modelIndex]);

    const intervalId = setInterval(() => {
      modelIndex = (modelIndex + 1) % modelPaths.length;
      loadModel(modelPaths[modelIndex]);
    }, 2000);

    return () => clearInterval(intervalId); // cleanup on unmount
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;
