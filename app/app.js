// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------
var $ = require("jquery");
// Browser modules are imported through new ES6 syntax.
import { Cameras } from './cameras/index';
import { Preferences } from './preferences/index';
import { Controller } from './controller/controller';
import { listPicture } from './picture/listPicture';
var __dirname = process.env.PWD;

var cams = new Cameras;
var canTakePicture = true;
var pref = new Preferences


// INITIALISATION WITH BOARD
//$('#container').html("Please wait during the initialisation");
// var control = new Controller(()=>{
//     cams.init();
//     control.waitPushButton(()=>{
//         takeAndDisplay();
//       });
// });

//INITIALISATION WITHOUT BOARD
cams.init();

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === ' ') {
    takeAndDisplay();
  }
}, false);


//QUICK TESTS WITHOUT CAMERA
// var pics = new listPicture();
// var date = __dirname + "/pictures/1470755595";
// var listport = ["bla","bli"];
// pics.init(date,listport);
//DISPLAY PICTURES
// pics.displayPictureRenameAll(function(){
//   cams.displayInit();
// });
//COMPARE PICTURES
// pics.compare(pics.getPictures(0).picId,pics.getPictures(1).picId,function(){
// });

//----------
function takeAndDisplay() {
  if(canTakePicture == true){
    canTakePicture = false;
    $('.message').html("Please wait");

    cams.takePictures()
        .then(function(err) {
            console.error('Erreur !' + err);
            alert("Could not take any photo.");
            cams.displayInit();
            canTakePicture = true;
        })
        .catch((content)=> {
            var pictures = new listPicture();
            pictures.init(content, cams.getlistPorts());
            pictures.displayPictureRenameAll(function(){
                cams.displayInit();
                canTakePicture = true;
            });
        });
  }
  else{
    console.log("Can't take a photo right now");
  }

}


// Node modules are required the same way as always.
var os = require('os');

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

// document.getElementById('cam_status').innerHTML = greet();
// document.getElementById('platform-info').innerHTML = os.platform();
// document.getElementById('env-name').innerHTML = envName;
