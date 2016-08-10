// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------
var $ = require("jquery");
// Browser modules are imported through new ES6 syntax.
import { Cameras } from './cameras/index';
import { Controller } from './controller/controller';
import { listPicture } from './picture/listPicture';
var __dirname = process.env.PWD;

var cams = new Cameras;

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


//QUICK TEST WITHOUT CAMERA : DISPLAY PICTURES
// var pics = new listPicture();
// var date = __dirname + "/pictures/1470755595";
// var listport = ["020,013","020,013"];
// pics.init(date,listport);
// pics.displayPicture();

//----------
function takeAndDisplay() {
  if(cams.isTakingAPhoto  == false){
    cams.isTakingAPhoto = true;
    $('.message').html("Please wait");

    cams.takePictures()
        .then(function(err) {
            console.error('Erreur !' + err);
            alert("Could not take any photo.");
            cams.displayInit();
            cams.isTakingAPhoto = false;
        })
        .catch((content)=> {
            alert(content)
            var pictures = new listPicture();
            pictures.init(content, cams.getlistPorts());
            pictures.displayPicture(function(){
                cams.displayInit();
                cams.isTakingAPhoto = false;
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
