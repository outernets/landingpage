var WIDTH = window.innerWidth
  , HEIGHT = window.innerHeight
  , ASPECT = WIDTH / HEIGHT
  , VIEW_ANGLE = 85
  , NEAR = 1
  , FAR = 100000
  , FRUSTUM_SIZE = 600

export default class Application {

  constructor (container, textures) {
    var self = this;
    this.container = container;

    this.camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    //this.camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0, 0);
    // this.camera.position.set(0, 0, 180);
    // this.camera.position.z = WIDTH/2;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(WIDTH, HEIGHT);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xff0000);
    this.scene.add(light);

    var materials = [];
    for(var i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial({
          map : textures[i],
          // side: THREE.DoubleSide,
          side: THREE.FrontSide
      }));
    }

    var geometry = new THREE.BoxGeometry(WIDTH, WIDTH, WIDTH);

    this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    this.mesh.scale.z = -1

    this.scene.add(self.mesh);

    console.log('MESH = ', this.mesh);
    console.log('GEOMETRY = ', geometry);

    window.addEventListener('resize', this.onResize.bind(this));

    //todo: after each rotation replace all face images but the one that is currently in front of the camera

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
    document.onkeydown = function(e) {
      switch (e.keyCode) {
        case 37:
          console.log('onkeydown: left');
          // var destVal = self.mesh.rotation.y - Math.PI/2
          var destVal = self.camera.rotation.y + Math.PI/2
          createjs.Tween.get(self.camera.rotation)
            // .wait(200)
            // .to({y: "-" + Math.PI/2}, 300)
            .to({y: destVal}, 100)
            .call(function(){

            });
          break;
        case 38:
          console.log('onkeydown: up');
          destVal = self.camera.rotation.x - Math.PI/2
          createjs.Tween.get(self.camera.rotation)
            // .wait(200)
            // .to({x: "-" + Math.PI/2}, 300)
            .to({x: destVal}, 100)
            .call(function(){});
          break;
        case 39:
          console.log('onkeydown: right');
          destVal = self.camera.rotation.y - Math.PI/2
          createjs.Tween.get(self.camera.rotation)
            // .wait(200)
            // .to({y: "+" + Math.PI/2}, 300)
            .to({y: destVal}, 100)
            .call(function(){

            });
          break;
        case 40:
          console.log('onkeydown: down');
          destVal = self.camera.rotation.x + Math.PI/2
          createjs.Tween.get(self.camera.rotation)
            // .wait(200)
            // .to({x: "+" + Math.PI/2}, 300)
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
