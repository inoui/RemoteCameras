var exec = require('child_process').exec;
var moment = require("moment");
var $ = require("jquery");
var __dirname = process.env.PWD;

export class Cameras {
	listPorts;

    init() {
        $('.panel#camerasPanel').on('click', "[data-action]", $.proxy(this._action, this));
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
    	this.displayInit();
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
                <button type="button" class="btn btn-primary start" >
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
