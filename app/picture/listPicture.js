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

  displayPicture(cb){
      var template = $('#imageListRenameAll').html();
      var compiled = _.template(template);
      $("#content-receipt").html(compiled({images:this.pictures}));
      // $("#successDisplay").on('click', ()=> {
      //   cb();
      // });
      $('.panel').on('click', "[data-action]", $.proxy(this._action, this));

  }
  _action(evt) {
    evt && evt.preventDefault();
    var $elt = $(evt.currentTarget);
    var action = $elt.data('action');

    if (this[action] !== undefined) {
        this[action](evt);
    };
  }
  retakePicture(evt){
    console.log("Retakepicture")
    evt.stopPropagation()
    $('.panel-body').html("Please wait");
    var $elt = $(evt.currentTarget)
    var current_pic = this.pictures[$elt.data('id')];
    current_pic.takeNewOne(()=> {
      this.displayPicture();
      // alert($elt.parent().find('img').attr("src"))
      // $elt.parent().find('img').attr("src","file:///Users/Maelle/Desktop/RemoteCameras/pictures/1470755595/picture1.jpg")
      // alert($elt.parent().find('img').attr("src"))
    });
  }

  initRename(evt){
    console.log("Rename")
    var $elt = $(evt.currentTarget)
    var id = $elt.parent().parent().data('id');
    $elt.parent().html('<br><input type="text" name="images-name" placeholder="Nouveau nom" id="newname'+ id+ '"><br><br> <input type="button" value="Valider" class="btn btn-default rename" data-action="rename"> <br><br>');
  }

  rename(evt){
    evt.stopPropagation()
    var $elt = $(evt.currentTarget)
    var id = $elt.parent().parent().data('id');
    var name = $("#newname"+id).val();
    this.pictures[id].setName(`${name}`,()=>{
      $elt.parent().html('<a href="#" class="pro-title" data-action="initRename"> '+this.pictures[id].name +' </a>');
    });
  }
  openFolder(evt){
    gui.Shell.showItemInFolder(this.pictures[0].src.replace(/\/[a-z0-9._-]+\.jpg/, ""));
  }
}















