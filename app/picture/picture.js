var fs = require('fs');
var exec = require('child_process').exec;


export class Picture {
    path;
    usb;

	init(path, usb){
    console.log(path);
    console.log(usb);

		this.path = path;
        this.usb = usb;
	}
    getName() {
    	var name = /\/[a-z0-9._-]+\.jpg/.exec(this.path);
		if (name) {
		    return name.toString().substring(1);
		}
    }

    get src() {
        return this.path;
    }
    get usbID() {
        return this.usb;
    }

    get name() {
        return name.toString().substring(1);
    }

    getPath() {
    	return this.path;
    }
	setName(newname) {

        var newpath = this.path.replace(/[a-z0-9._-]+\.jpg/, newname);
        fs.rename( this.path, newpath, function(err) {
            console.log(err);
        });
        this.path = newpath;
	}

    takeNewOne(){
        var newpath = this.path.replace(/[a-z0-9._-]+\.jpg/, this.getName().substring(0, this.getName().length - 4)+ "-0.jpg");
        var promesse = new Promise((resolve, reject) => {
            exec("gphoto2 --port usb:"+this.usb+" --capture-image-and-download  -F 1000 --filename "+ newpath, (error, stdout, stderr) => {
               if(stderr!=""){ reject(stderr); }
               else if(error!=null){ reject(error); }
               else{ resolve([newpath,this.usb]); }
            });
        });
        return promesse;
    }
    compare(pic,cd){
        alert("On choisit une des 2 images");
        cd();
    }
}
