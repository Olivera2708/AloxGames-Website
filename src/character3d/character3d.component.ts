import { AfterViewInit, Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-character3d',
  templateUrl: './character3d.component.html',
  standalone: true,
  styleUrls: ['./character3d.component.css']
})
export class Character3dComponent implements AfterViewInit, OnDestroy {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private model: THREE.Object3D | null = null;
  private container!: HTMLElement;

  constructor(private elRef: ElementRef, private renderer2: Renderer2) {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.renderer.setClearColor(0x252525);
  }

  ngAfterViewInit(): void {
    this.container = this.elRef.nativeElement.querySelector('.scene-container');
    if (this.container) {
      this.container.style.visibility = 'hidden';
      this.renderer2.appendChild(this.container, this.renderer.domElement);

      setTimeout(() => {
        this.updateRendererSize();
        this.zoomOutCamera();
        this.loadModel();
        this.addLighting();
        this.animate();
      }, 0);

    } else {
      console.error('Scene container not found.');
    }
  }

  private updateRendererSize(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    console.log(width);

    this.renderer.setSize(width, height);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private loadModel(): void {
    const loader = new FBXLoader();
    loader.load(
      'assets/character.fbx',
      (fbx: THREE.Object3D) => {
        fbx.scale.set(0.001, 0.001, 0.001);
        fbx.position.set(0, 0, 0);
        this.scene.add(fbx);
        this.model = fbx;

        if (fbx.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(fbx);
          const action = mixer.clipAction(fbx.animations[0]);
          action.play();
        }
        
        this.container.style.visibility = 'visible';
      },
      (progress: ProgressEvent) => {
        console.log(`Loading: ${(progress.loaded / progress.total) * 100}%`);
      },
      (error: Error) => {
        console.error('Error loading FBX model:', error);
      }
    );
  }

  private addLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(ambientLight, directionalLight);
  }

  private animate(): void {
    requestAnimationFrame(() => this.animate());
    if (this.model) {
      this.model.rotation.y += 0.01;
    }
    this.renderer.render(this.scene, this.camera);
  }

  private zoomOutCamera(): void {
    this.camera.position.set(0, 0.1, 0.44);
    this.camera.fov = 60;
    this.camera.updateProjectionMatrix();
  }

  ngOnDestroy(): void {
    if (this.renderer) {
      this.renderer.dispose();
    }
  }
}
