// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------

// Browser modules are imported through new ES6 syntax.
import { Cameras } from './cameras/index';
import { Controller } from './controller/controller';
import { listPicture } from './picture/listPicture';


var __dirname = process.env.PWD;

var cams = new Cameras;
cams.init();



document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === ' ') {
  	document.getElementById('cam_status').innerHTML = "Please wait";
	cams.takePictures().then(function (content) {
		   	var pictures = new listPicture();
		   	pictures.init(content);
			pictures.displayPicture();
		}).catch(function (err) {
		    console.error('Erreur !');
		   	alert(err);
		});
  }
}, false);


var control = new Controller();
// console.log("1");
// control.init();
// console.log("2");


// Node modules are required the same way as always.
var os = require('os');

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

// document.getElementById('cam_status').innerHTML = greet();
// document.getElementById('platform-info').innerHTML = os.platform();
// document.getElementById('env-name').innerHTML = envName;
