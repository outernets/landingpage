var WIDTH = window.innerWidth
  , HEIGHT = window.innerHeight
  , ASPECT = WIDTH / HEIGHT
  , VIEW_ANGLE = 65
  , NEAR = 1
  , FAR = 100000
  // , FRUSTUM_SIZE = 600

export default class Application {

  constructor (container, textures) {
    var self = this;
    this.container = container;

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR)
    this.cameraRig = new THREE.Object3D()
    this.cameraRig.add(this.camera)
    // this.cameraRig.rotation.order = 'YXZ'
    // this.cameraRig.eulerOrder = 'YXZ'

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(WIDTH, HEIGHT);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();
    this.scene.add(this.cameraRig)

    var light = new THREE.AmbientLight(0xff0000);
    this.scene.add(light);

    var materials = [];
    for(var i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial({
          map : textures[i]
          , side: THREE.FrontSide
      }));
    }

    var geometry = new THREE.BoxGeometry(WIDTH, WIDTH, WIDTH);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    this.mesh.scale.z = -1

    this.scene.add(self.mesh);

    console.log('MESH = ', this.mesh);
    console.log('GEOMETRY = ', geometry);

    window.addEventListener('resize', this.onResize.bind(this));

    // map for cube faces relative to initial face
    //mesh.material.materials[0] -> right from facing front
    //mesh.material.materials[1] -> left from facing front
    //mesh.material.materials[2] -> top or bottom (not sure)
    //mesh.material.materials[3] -> top or bottom (not sure)
    //mesh.material.materials[4] -> facing front
    //mesh.material.materials[5] -> opposite of facing front

    // to change image on one face we can use this:
    //self.mesh.material.materials[0] = new THREE.MeshBasicMaterial({
    //  map : textures[textures.length - 1], // texture from some image
    //  side: THREE.DoubleSide,
    //});

    var destVal = 0;
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
          console.log('onkeydown: left');
          destVal = self.cameraRig.rotation.z + Math.PI / 2
          createjs.Tween.get(self.cameraRig.rotation)
          .to({z: destVal}, 100)
          .call(function(){
            console.log('rig rotation y: ', self.cameraRig.rotation.y)
            console.log('camera rotation y: ', self.camera.rotation.y)
          });
          break;
        case 38:
          console.log('onkeydown: up');
          destVal = self.camera.rotation.x + Math.PI / 2
          createjs.Tween.get(self.camera.rotation)
          .to({x: destVal}, 100)
          .call(function(){
            console.log('rig rotation x: ', self.cameraRig.rotation.x)
            console.log('camera rotation x: ', self.camera.rotation.x)
          });
          break;
        case 39:
          console.log('onkeydown: right');
          destVal = self.cameraRig.rotation.z - Math.PI/2
          createjs.Tween.get(self.cameraRig.rotation)
          .to({z: destVal}, 100)
          .call(function(){

          });
          break;
        case 40:
          console.log('onkeydown: down');
          destVal = self.camera.rotation.x - Math.PI/2
          createjs.Tween.get(self.camera.rotation)
          .to({x: destVal}, 100)
          .call(function(){

          });
          break;
      }
    };
  }

  onResize (e) {
    WIDTH = window.innerWidth
    HEIGHT = window.innerHeight

    this.renderer.setSize(WIDTH, HEIGHT)
    this.camera.aspect = WIDTH / HEIGHT
    this.camera.updateProjectionMatrix()
  }

  loop () {
    //this.mesh.rotation.x += 0.005;
    //this.mesh.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera)
    requestAnimationFrame(this.loop.bind(this))
  }

}
