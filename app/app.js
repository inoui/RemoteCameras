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
cams.init();

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === ' ') {
  	$('#container').html("Please wait");
	cams.takePictures().then(function(err) {
			console.error('Erreur !' + err);
		   	alert("Could not take any photo.");
		   	cams.displayInit();
		}).catch((content)=> {
		   	var pictures = new listPicture();
		   	pictures.init(content,cams.getlistPorts());
			pictures.displayPictureRenameAll(function(){
				cams.displayInit();
			});
		});
  }
}, false);

// var pictures = new listPicture();
// var list = [["/Users/Maelle/Desktop/RemoteCameras/pictures/1470327908/picture.jpg","00"],["/Users/Maelle/Desktop/RemoteCameras/pictures/1470327908/picture0.jpg","000"]];
// pictures.init(list);
// pictures.displayPictureRenameAll();

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
