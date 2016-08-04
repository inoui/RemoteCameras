var exec = require('child_process').exec;
var moment = require("moment");
var listPorts = [];
var __dirname = process.env.PWD;

export class Cameras {

    init(callback) {
	    exec("gphoto2 --auto-detect", function(error, stdout, stderr) {
	        console.log(stdout);
	        for (var i = 0; i < stdout.length; i++) {
	            if ((stdout[i]=='u')&&(stdout[i+1]=='s')&& (stdout[i+2]=='b')){
	                var nameport = '';
	                var j = i +4;
	                while ((j < stdout.length)&&(stdout[j]!=' ')){
	                    nameport+= stdout[j];
	                    j++;
	                };
	                listPorts.push(nameport);
	            };
	        };
            callback();
    	});
    }

	takePictures(callback) {
		var date = moment().unix();
        var listPictures = [];
        var listPromesses = [];
	    for (var i = 0; i < listPorts.length; i++) {
            var path = __dirname+"/pictures/"+ date.toString() +"/picture"+i+".jpg";
            console.log(path);
            listPictures.push(path);
	        var promesse = new Promise((resolve, reject) => {
                exec("gphoto2 --port usb:"+listPorts[i]+" --capture-image-and-download  -F 1000 --filename "+ path , function (error, stdout, stderr) {
    	           resolve();
                });
            });
            listPromesses.push(promesse)
	    };
        Promise.all(listPromesses).then((values) => {
            callback(listPictures);
        });
	}
}
