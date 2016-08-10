var exec = require('child_process').exec;
var moment = require("moment");
var $ = require("jquery");
var __dirname = process.env.PWD;

export class Cameras {
	listPorts;
    init() {

		this.listPorts = [];
    	this.displayInit();
    }

    displayInit(){
    	this.getListPorts( (list) =>{
	    	this.listPorts = list;
	    	var reloadButton = " <br><br> <input type='button' value='reload' id='reload'>";
			if( list.length== 0){
				$('#container').html("No camera detected" + reloadButton);
			}
			else{
				$('#container').html("Number of camera detected : <br><strong>" + list.length + " </strong><br> <br> press Space or the button to take a picture" + reloadButton);
			}
			$("#reload").on('click', ()=> {
				this.displayInit();
				$('#container').html("loading");
			});
    	});
    }

    getlistPorts() {
        return this.listPorts;
    }


    getListPorts(callback){
    	var list=[];
    	exec("gphoto2 --auto-detect", (error, stdout, stderr) =>{
	        console.log(stdout);
	        for (var i = 0; i < stdout.length; i++) {
	            if ((stdout[i]=='u')&&(stdout[i+1]=='s')&& (stdout[i+2]=='b')){
	                var nameport = '';
	                var j = i +4;
	                while ((j < stdout.length)&&(stdout[j]!=' ')){
	                    nameport+= stdout[j];
	                    j++;
	                };
	                list.push(nameport);
	            };
	        };
	        callback(list);
    	});
    }

	takePictures(callback) {
		var date = moment().unix();
        var listPromesses = [];
	    for (var i = 0; i < this.listPorts.length; i++) {
            var path = __dirname+"/pictures/"+ date.toString() +"/picture"+i+".jpg";
	        var promesse = new Promise((resolve, reject) => {
                exec("gphoto2 --port usb:"+this.listPorts[i]+" --capture-image-and-download  -F 1000 --filename "+ path , (error, stdout, stderr) => {
    	           if(stderr!=""){ console.log(stderr); resolve(stderr); }
    	           else if(error!=null){ console.log(err); resolve(error); }
    	           else{ reject(__dirname+"/pictures/"+ date.toString()); }
                });
            });
            listPromesses.push(promesse)
	    };
		return Promise.all(listPromesses);
	}
}
