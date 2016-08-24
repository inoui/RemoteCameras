// -----------------------------------------------------
// Here is the starting point for your own code.
// All stuff below is just to show you how it works.
// -----------------------------------------------------
var $ = require("jquery");
var _ = require("underscore");

// Browser modules are imported through new ES6 syntax.
import { Preferences } from './preferences/index';
import { Controller } from './controller/controller';
import { Window } from './window/window';

var win = new Window;
var pref = new Preferences


win.displayHome();
var control = new Controller(()=>{
    win.takePicturesAndDisplay();
});

// Node modules are required the same way as always.
var os = require('os');

// window.env contains data from config/env_XXX.json file.
var envName = window.env.name;

// document.getElementById('cam_status').innerHTML = greet();
// document.getElementById('platform-info').innerHTML = os.platform();
// document.getElementById('env-name').innerHTML = envName;
