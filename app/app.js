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
var $ = require("jquery");
var Dicer = require('dicer');

const spawn = require('child_process').spawn;
const lp = spawn('gphoto2', ['--capture-movie', '--stdout']);

var srcBoundary = "--videoboundary";
var dicer = new Dicer({ boundary: srcBoundary });

dicer.on('part', function(part) {
    console.log('part');
    var frameEncoded = '';
    part.setEncoding('base64');
    part.on('header', function(header) { });
    part.on('data', function(data) {
        console.log(data);
         frameEncoded += data; });
    part.on('end', function() {   $("#img").attr('src', "data:image/jpg;base64,"+frameEncoded.toString("base64"));  });
});

lp.stdout.pipe('/dev/fakevideo1');


cams.init(function(){
	document.getElementById('cam_status').innerHTML = "The cameras are ready <br> press Space to take a picture";
});

document.addEventListener('keydown', (event) => {
  const keyName = event.key;
  if (keyName === ' ') {
  	document.getElementById('cam_status').innerHTML = "Please wait";
	  	cams.takePictures(function(list){
	  		var pictures = new listPicture();
	  		pictures.init(list);
	  		pictures.displayPicture();
		});
  }
}, false);


// var control = new Controller();
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
