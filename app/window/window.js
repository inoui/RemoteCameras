var $ = require("jquery");
var _ = require("underscore");
import { listPicture } from '../picture/listPicture';
import { Cameras } from '../cameras/index';



export class Window {
	cams;
    constructor(cb) {
    	 $('#content-receipt').on('click', "[data-action]", $.proxy(this._action, this));
    	 $('#sidebar').on('click', "[data-action]", $.proxy(this._action, this));
    	this.cams = new Cameras;
    	this.cams.init();


    	//QUICK TEST WITHOUT CAMERA : DISPLAY PICTURES
		// var pics = new listPicture();
		// var date = "/Users/Maelle/Desktop/Packshots/20160824";
		// var listport = ["020,005","020,006"];
		// pics.init(date,listport);
		// pics.displayPicture();
    }

    takePicturesAndDisplay() {
	 if(this.cams.isTakingAPhoto  == false){
	    this.cams.isTakingAPhoto = true;
	    $('.message').html("Please wait");
	    this.cams.takePictures((content)=>{
	      this.cams.isTakingAPhoto = false;
	      var pictures = new listPicture();
	      pictures.init(content, this.cams.getlistPorts());
	      pictures.displayPicture();
	    });
	  }
	  else{
	    console.log("Can't take a photo right now");
	  }

	}

	displayHome(){
		if(this.cams.isTakingAPhoto ==false){
			this.cams.displayInit();
			var template = $('#homeDisplay').html();
      		$("#content-receipt").html(_.template(template));
		}
	}

	_action(evt) {
        evt && evt.preventDefault();
        var $a = $(evt.currentTarget);
        var action = $a.data('action');

        if (this[action] !== undefined) {
            this[action](evt);
        };
    }

}