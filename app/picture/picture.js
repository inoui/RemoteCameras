var fs = require('fs');
var exec = require('child_process').exec;
var $ = require("jquery");


export class Picture {
    path;
    usb;
    id;

	init(id, path, usb){
        console.log(id);
        console.log(path);
        console.log(usb);
        this.id = id;
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

    get picId() {
        return this.id;
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
        $("#container").html('Please wait');
        var newpath = this.path.replace(/[a-z0-9._-]+\.jpg/, this.getName().substring(0, this.getName().length - 4)+ "-0.jpg");
        var promesse = new Promise((resolve, reject) => {
            exec("gphoto2 --port usb:"+this.usb+" --capture-image-and-download  -F 1000 --filename "+ newpath, (error, stdout, stderr) => {
               if(stderr!=""){ reject(stderr); }
               else if(error!=null){ reject(error); }
              //__dirname+"/pictures/"+ date.toString()
               else{ alert(this.path.replace(/\[a-z0-9._-]+\.jpg/, ""));resolve(this.path.replace(/\[a-z0-9._-]+\.jpg/, "")); }
            });
        });
        return promesse;
    }

    deletePicture(){
        fs.unlink(this.path,function(){

        });
    }
}
