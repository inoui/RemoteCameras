var fs = require('fs');
var exec = require('child_process').exec;
var $ = require("jquery");
var mv = require('mv');


export class Picture {
    path;
    usb;
    id;

	init(id, path, usb){
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
        var name = /\/[a-z0-9._-]+\.jpg/.exec(this.path);
        return name.toString().substring(1);
    }

    getPath() {
    	return this.path;
    }
	setName(newname,cb) {
        console.log("setName")
        var pattern = new RegExp(/[a-z0-9._-]+\.jpg/)
        var newpath;
        if(newname==""){
            cb();
            return
        }
        else if(pattern.test(newname)){
            newpath = this.path.replace(/[a-z0-9._-]+\.jpg/, newname);
        }
        else{
            newpath = this.path.replace(/[a-z0-9._-]+\.jpg/, newname+".jpg");
        }

        this.renameFolder(newpath,function(){
            cb();
        });
	}
    renameFolder(newpath,cb){
        fs.open(newpath, 'r', (err, fd)=> {
            if(err!=null){
                fs.rename( this.path, newpath, function(err) {
                    if(err!= null) console.log(err);
                });
                this.path = newpath;
            }
            else{
                alert("Ce nom existe déjà")
            }
            cb();
        });
    }

    takeNewOne(cb){
        var promesse = new Promise((resolve, reject) => {
            if(/^win/.test(process.platform)){
            //windows
            exec("gphoto2.bat gphoto2 --set-config capturetarget=1  --capture-image-and-download  -F 1000", {cwd: "C:/Users/user/Desktop/RemoteCameras/gphoto/win32"}, (error, stdout, stderr) => {
              var name = /IMG_+[0-9]+\.JPG/.exec(stdout);
              console.log(this.path);
              var pathnewimg =__dirname+'/gphoto/win32/'+name;
              var re2 = new RegExp("\\\\","g");
              pathnewimg=pathnewimg.replace(re2,/\//)
              console.log(pathnewimg);
                mv(pathnewimg,this.path, (err)=>  {
                    console.log(err);
                    resolve();
                });
            });
           }
          else{
            //MAC
              exec("/usr/local/bin/gphoto2 --port "+ this.usb +" --capture-image-and-download --filename "+ this.path + " --force-overwrite", (error, stdout, stderr) => {
                 if(stderr!=""){ reject(stderr); }
                 else if(error!=null){ reject(error); }
                 else{ resolve(); }
              });
          }
        });
        promesse.then( (content)=> {
            cb();
        }).catch( (err)=> {
            console.error(err);
            cb();
        });
    }

    deletePicture(){
      fs.unlink(this.path,function(){
        });

    }
}
