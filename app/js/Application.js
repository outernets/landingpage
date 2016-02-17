var WIDTH = window.innerWidth
  , HEIGHT = window.innerHeight

export default class Application {

  constructor (container, textures) {
    var self = this;
    this.container = container;

    this.camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 5000);
    //this.camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0, 0);
    this.camera.position.set(0, 0, 180);

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    this.renderer.setSize(WIDTH, HEIGHT);
    this.container.appendChild(this.renderer.domElement);

    this.scene = new THREE.Scene();

    var light = new THREE.AmbientLight(0xff0000);
    this.scene.add(light);


    var materials = [];
    for(var i = 0; i < 6; i++) {
      materials.push(new THREE.MeshBasicMaterial({
          map : textures[i],
          side: THREE.DoubleSide,
      }));
    }

    var geometry = new THREE.BoxGeometry(WIDTH, WIDTH, WIDTH);


    this.mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
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
          createjs.Tween.get(self.mesh.rotation)
            .wait(200)
            .to({y: "-" + Math.PI/2}, 300)
            .call(function(){

            });
          break;
        case 38:
          console.log('onkeydown: up');
          createjs.Tween.get(self.mesh.rotation)
            .wait(200)
            .to({x: "-" + Math.PI/2}, 300)
            .call(function(){});
          break;
        case 39:
          console.log('onkeydown: right createjs = ', createjs);
          createjs.Tween.get(self.mesh.rotation)
            .wait(200)
            .to({y: "+" + Math.PI/2}, 300)
            .call(function(){

            });
          break;
        case 40:
          console.log('onkeydown: down');
          createjs.Tween.get(self.mesh.rotation)
            .wait(200)
            .to({x: "+" + Math.PI/2}, 300)
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
