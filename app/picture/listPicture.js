var $ = require("jquery");
var _ = require("underscore");
var gui = require('nw.gui');



import { Picture } from './picture';
export class listPicture {

    pictures;

    init(date,listPorts) {
        this.pictures = [];
    	for (var i = 0; i < listPorts.length; i++) {
            var path = date+"/picture"+i+".jpg";
    		console.log("init = " + listPorts[i])
    		var pic = new Picture;
    		pic.init(path,listPorts[i]);
    		console.log("created" + pic.getName())
    		this.pictures.push(pic);
    	};
    }
	getPictures() {
		console.log("get picture : " + this.pictures[0].getName())
		return this.pictures;
	}

	displayPicture() {
        $("#cam_status").text('Your images');
        var template = $('#imageList').html();
        var compiled = _.template(template);
        $("#container").remove('.listImages').append(compiled({images:this.pictures}));

        $("#rename").on('click', () => {
            var name = $("#newname").val();
            console.log(name);
            for (var i = 0; i < this.pictures.length; i++) {
                this.pictures[i].setName(`${name}-${i}.jpg`);
            }
        });
        $("#openFolder").on('click', () => {
            gui.Shell.showItemInFolder(this.pictures[0].src);
        })
        $("#newImage").on('click', function() {
            $('#container').html('<p id="cam_status">The cameras are ready <br> press Space to take a picture</p>')
        });

	}

    displayPictureRenameAll(cb) {

        $("#cam_status").text('Your images');
        var template = $('#imageListRenameAll').html();
        var compiled = _.template(template);
        $("#container").remove('.imageListRenameAll').append(compiled({images:this.pictures}));
        $(".rename").on('click', () => {
            console.log(name);
            for (var i = 0; i < this.pictures.length; i++) {
                this.pictures[i].setName(`${name}-${i}.jpg`);
            }
        });
        $(".newPicture").on('click', () => {
            for (var i = 0; i < this.pictures.length; i++) {
                var current_pic = this.pictures[i];
                current_pic.takeNewOne().then( (content)=> {
                    var pic = new Picture;
                    pic.init(content);
                    current_pic.compare(pic,()=>{
                        pictures.displayPictureRenameAll(function(){
                        });
                    });
                }).catch(function (err) {
                    console.error('Erreur!');
                    alert("erererer" + err);
                });
            }
        });
        $("#openFolder").on('click', () => {
            gui.Shell.showItemInFolder(this.pictures[0].src);
        })
        $("#newImage").on('click', ()=> {
            cb();
        });
    }
}