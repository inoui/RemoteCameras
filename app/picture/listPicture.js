var $ = require("jquery");
var _ = require("underscore");
var gui = require('nw.gui');
var fs = require('fs');



import { Picture } from './picture';
export class listPicture {

    pictures;

    init(date,listPorts) {
        this.pictures = [];
    	for (var i = 0; i < listPorts.length; i++) {
        var path = date+"/picture"+i+".jpg";
    		console.log("init = " + listPorts[i])
    		var pic = new Picture;
        pic.init(i,path,listPorts[i]);
        console.log("created :" + pic.getName())
    		this.pictures.push(pic);
    	};
    }
	// getPictures() {
	// 	console.log("get picture : " + this.pictures[0].getName())
	// 	return this.pictures;
	// }

  getPictures(i){
    return this.pictures[i];
  }

	// displayPicture() {
  //       $("#cam_status").text('Your images');
  //       var template = $('#imageList').html();
  //       var compiled = _.template(template);
  //       $("#container").remove('.listImages').append(compiled({images:this.pictures}));
  //
  //       $("#rename").on('click', () => {
  //           var name = $("#newname").val();
  //           console.log(name);
  //           for (var i = 0; i < this.pictures.length; i++) {
  //               this.pictures[i].setName(`${name}-${i}.jpg`);
  //           }
  //       });
  //       $("#openFolder").on('click', () => {
  //           gui.Shell.showItemInFolder(this.pictures[0].src);
  //       })
  //       $("#newImage").on('click', function() {
  //           $('#container').html('<p id="cam_status">The cameras are ready <br> press Space to take a picture</p>')
  //       });
  //
	// }

    displayPictureRenameAll(cb) {

        $("#container").html('Your images : ');
        var template = $('#imageListRenameAll').html();
        var compiled = _.template(template);
        var that = this;
        $("#container").remove('.imageListRenameAll').append(compiled({images:this.pictures}));
        $(".rename").on('click', function(){
            var name = $("#newname").val();
            console.log(name);
            var current_pic = that.pictures[$(this).parent().data("id")];
            current_pic.setName(`${name}.jpg`);
        });
        
        $(".newPicture").on('click', function() {
          var current_pic = that.pictures[$(this).parent().data("id")];
          current_pic.takeNewOne().then( (content)=> {
              var pic = new Picture;
              pic.init(that.pictures.length +1 ,content, current_pic.usbID);
              that.pictures.push(pic);
              that.compare(current_pic.picId,pic.picId,()=>{
                    pictures.displayPictureRenameAll(function(){
                  });
              });
          }).catch(function (err) {
              console.error(err);
          });
        });
        $("#openFolder").on('click', () => {
            gui.Shell.showItemInFolder(this.pictures[0].src);
        })
        $("#newImage").on('click', ()=> {
            cb();
        });
    }

    compare(oldPicId,newPicID,cb){
        alert("On choisit une des 2 images");
        $("#container").html('Choose one image ');
        var template = $('#compareImage').html();
        var compiled = _.template(template);
        var that = this;
        alert(oldPicId)
        alert(newPicID)

        $("#container").remove('.compareImage').append(compiled({images:[that.pictures[oldPicId],that.pictures[newPicID]]}));
        $(".keep").on('click', function(){ 
            var clickPicId = $(this).parent().data("id");
            if($(this).parent().data("id") == oldPicId){
              that.pictures[newPicID].deletePicture();
            }
            else{
              var name = that.pictures[oldPicId].getName();
              that.pictures[oldPicId].deletePicture();
              that.pictures[newPicID].setName(name);
            }
            cb();
        });
        $("#openFolder").on('click', () => {
            gui.Shell.showItemInFolder(this.pictures[0].src);
        })
        $("#newImage").on('click', ()=> {
            cb();
        });
    }
}
