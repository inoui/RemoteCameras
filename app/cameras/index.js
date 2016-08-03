var exec = require('child_process').exec;
var moment = require("moment");
var listPorts = [];
var essai ="je suis un string";
export class Cameras {

    init(afunction) {
        console.log(essai);
	    exec("gphoto2 --auto-detect", function(error, stdout, stderr) {
            console.log("je suis ici");
	        console.log(stdout);
            console.log(essai);
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
            afunction();
    	});
    }

	takePictures() {
        console.log("làlàlàlàlà");
		var date = moment().format();
		//console.log(listPorts);
	    for (var i = 0; i < listPorts.length; i++) {
	        exec("gphoto2 --port usb:"+listPorts[i]+" --capture-image-and-download  -F 1000 --filename "+ date +"/picture"+i+".jpg ", function (error, stdout, stderr) {
	           console.log(error);
               console.log(stdout);
               console.log(stderr);
            });
	    };
	}

}

function getDate() {
        date = new Date;
        a  = date.getFullYear();
        mois = date.getMonth() + 1;
        if(mois<10)
        {
                mois = "0"+mois;
        }
        j = date.getDate();
        if(j<10)
        {
                j = "0"+j;
        }

        h = date.getHours()+2;
        if(h<10)
        {
                h = "0"+h;
        }
        m = date.getMinutes();
        if(m<10)
        {
                m = "0"+m;
        }
        s = date.getSeconds();
        if(s<10)
        {
                s = "0"+s;
        }
        resultat = j+'.'+mois+'.'+a+'-'+h+'.'+m+'.'+s;
        return resultat;
}
