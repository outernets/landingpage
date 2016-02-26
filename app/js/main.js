/* jshint devel:true */
import Application from './Application'

function loadTextures (callback) {
  var loadedTextures = [];
  var loaded = 0;
  var textureLoader = new THREE.TextureLoader();
  var textureURLs = [
    "/images/1.jpg"
    , "/images/2.jpg"
    , "/images/3.jpg"
    , "/images/4.jpg"
    , "/images/5.jpg"
    , "/images/6.jpg"
    , "/images/7.jpg"
    , "/images/8.jpg"
  ];
  for(var i = 0; i < textureURLs.length; i++) {
    textureLoader.load(textureURLs[i], function(t) {
      loadedTextures.push(t);
      loaded++;
      if(loaded === textureURLs.length){
        var app = new Application(document.body, loadedTextures);
        app.loop()
      }
    });
  }

  //textureLoader.addEventListener('load', function (event) {
  //  loadedTextures.push(event.content);
  //  loaded++;
  //  if(loaded === textureURLs.length){
  //    var app = new Application(document.body, loadedTextures)
  //    app.loop()
  //  }
  //});


}

loadTextures();
