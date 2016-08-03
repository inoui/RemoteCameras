var fs = require('fs');
var path;
export class Picture {
	init(path_initial){
		path = path_initial;
	}
    getName() {
    	var name = /\/[a-z0-9._-]+\.jpg/.exec(path); 
		if (name) {
		    return name.toString().substring(1);
		}
    }
    getPath() {
    	return path;
    }
	setName(newname) {
		// var newpath = path.replace(/[a-z0-9._-]+\.jpg/, newname);
		// alert("newpath = " + newpath, path);
		// console.log("path = " + path);
		// fs.rename( path, newpath, function(err) {
		// 	alert
		//     if ( err ) console.log('ERROR: ' + err);
		// });
		// path = newpath;
		// this.displayPicture();
		// //path = newpath;
		//alert(path);


		// var path2 = "/Users/Maelle/Desktop/RemoteCameras/pictures/03:08:2016-17-35-37/picture0.jpg";
		// fs.stat(path2, function(err, stat) {
		//     if(err == null) {
		//     	alert("2exist");
		//         console.log('File exists');
		//     } else if(err.code == 'ENOENT') {
		//         // file does not exist
		//         alert("2no exist");
		//         fs.writeFile('log.txt', 'Some log\n');
		//     } else {
		//     	alert(err.code);
		//         console.log('2Some other error: ', err.code);
		//     }
		// });
		// var newpath = path2.replace(/[a-z0-9._-]+\.jpg/, newname);
		// console.log("path = " + path2);
		// fs.rename( path2, newpath, function(err) {
		//     if ( err ){ console.log('ERROR: ' + err);}
		//     else{
		//     	alert("SUCCESS");
		//     }
		// });
// alert(path2 +path + newname);
// 		fs.stat(path, function(err, stat) {
// 		    if(err == null) {
// 		    	alert("exist");
// 		        console.log('File exists');
// 		    } else if(err.code == 'ENOENT') {
// 		        // file does not exist
// 		        alert("no exist");
// 		        fs.writeFile('log.txt', 'Some log\n');
// 		    } else {
// 		    	alert(err.code);
// 		        console.log('Some other error: ', err.code);
// 		    }
// 		});

// 		var newpath = path.replace(/[a-z0-9._-]+\.jpg/, newname);
// 		console.log("path = " + path);
// 		fs.rename( path, newpath, function(err) {
// 		    if ( err ){ alert('ERROR: ' + err);}
// 		    else{
// 		    	alert("SUCCESS");
// 		    }
// 		});
	}

	displayPicture() {

		var txt = "<img src=file://" + path + " alt='pic' style='width:160px; height:160px;'/>";
		txt += "<br> <div id='namePic'>" + this.getName() + "</div><br>";
		txt += " <form id='myForm'> <br> <input type='text' value='' /> <br/>";
		txt += "<br/> <input type='submit' value='Submit !'/> </form>";
		document.getElementById('cam_status').innerHTML = txt;
		var myForm = document.getElementById('myForm');

		myForm.addEventListener('submit', (e)=> {
			var newname = document.forms[0].elements[0].value;
			if (/[a-z0-9._-]+\.jpg/.test(newname)) {
				this.setName(newname);
				//document.getElementById('namePic').innerHTML = newname;

			} 
			else {
				alert("The new name is invalid");
			}
		    e.preventDefault();
		});
	}
}