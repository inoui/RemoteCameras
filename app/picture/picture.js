var fs = require('fs');


export class Picture {
    path;

	init(path_initial){
		this.path = path_initial;
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

}
