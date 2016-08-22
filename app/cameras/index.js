var exec = require('child_process').exec;
var moment = require("moment");
var $ = require("jquery");
var __dirname = process.env.PWD;

export class Cameras {
	listPorts;

    init() {
        $('#content-receipt').on('click', "[data-action]", $.proxy(this._action, this));
        exec("ps -ax | grep PTPC", function(error, stdout, stderr) {
            console.log(error);
            console.log(stdout);
            console.log(stderr);

            var n = stdout.search("PTPCamera");
            if (n > 0) {
                exec("killall PTPCamera", function() {
                    chrome.runtime.reload();
                });
            }
        });
		this.listPorts = [];
        this._isTakingAPhoto = false;
    }

    _action(evt) {
        evt && evt.preventDefault();
        var $a = $(evt.currentTarget);
        var action = $a.data('action');
        if (this[action] !== undefined) {
            this[action](evt);
        };
    }

    displayInit(){
    	this.getListPorts( (list) =>{
	    	this.listPorts = list;

			if( list.length== 0){

                var reloadButton = `<button type="button" class="btn btn-warning" data-action="displayInit">
                            <i class="glyphicon glyphicon-refresh"></i>
                            <span class="message">Recharger</span>
                        </button>`;

				$('.message').html("Aucuns appareils détéctés <br><br>" + reloadButton);
			}
			else{
                var okButton = `${list.length} appareils détectés<br><br>
                <button type="button" class="btn btn-primary start" data-action="takePicturesAndDisplay" >
                        <i class="glyphicon glyphicon-upload"></i>
                        <span>Appuyer sur espace ou le bouton</span>
                    </button>`;

                $('.message').html(okButton);

			}
    	});
    }

    getlistPorts() {
        return this.listPorts;
    }


    get isTakingAPhoto() {
        return this._isTakingAPhoto;
    }

    set isTakingAPhoto(newValue) {
        this._isTakingAPhoto = newValue; 
    }

    getListPorts(callback){
    	var list=[];
    	exec("gphoto2 --auto-detect", (error, stdout, stderr) =>{
        //exec("set CAMLIBS=./camlibs", {cwd: "C:/Users/user/Desktop/RemoteCameras-master/gphoto/win32"}, function(error, stdout, stderr){});
        //exec("set IOLIBS=./iolibs", {cwd: "C:/Users/user/Desktop/RemoteCameras-master/gphoto/win32"}, function(error, stdout, stderr){});
        //exec("gphoto2.exe gphoto2 --auto-detect", {cwd: "C:/Users/user/Desktop/RemoteCameras-master/gphoto/win32"}, (error, stdout, stderr) =>{
	        console.log(stdout);

            this.searchUsbPort(stdout,list);
	        callback(list);
    	});
    }
    searchUsbPort(stdout,list){
        var usbport = new RegExp(/usb\:+.*/);
        var IsaCam = usbport.test(stdout);
        if (IsaCam){
           list.push(/usb\:+.*/.exec(stdout));
           this.searchUsbPort(stdout.replace(usbport, ""),list);
        }
    }
	takePictures(callback) {
		var date = moment().unix();
        var listPromesses = [];
	    for (var i = 0; i < this.listPorts.length; i++) {
            var path = __dirname+"/pictures/"+ date.toString() +"/picture"+i+".jpg";
	        var promesse = new Promise((resolve, reject) => {
                exec("gphoto2 --port "+this.listPorts[i]+" --capture-image-and-download  -F 1000 --filename "+ path , (error, stdout, stderr) => {
    	        //exec("gphoto2.exe gphoto2 --set-config capturetarget=1 --port usb:bus-0,\\.\libusb0-0001--0x04a9-0x32b4 --capture-image-and-download  -F 1000 --filename "+ path, {cwd: "C:/Users/user/Desktop/RemoteCameras-master/gphoto/win32"}, (error, stdout, stderr) => {
                   if(stderr!=""){ reject(stderr); }
    	           else if(error!=null){ reject(error); }
    	           else{ resolve(); }
                });
            });
            listPromesses.push(promesse)
	    };
		Promise.all(listPromesses).catch((err)=> {
            console.error('Erreur ' + err);
        })
        .then(function(content) {
            callback(__dirname+"/pictures/"+ date.toString());
        });
	}
}
