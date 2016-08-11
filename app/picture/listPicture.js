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

  displayPicture() {
      var template = $('#imageListRenameAll').html();
      var compiled = _.template(template);
      $("#content-receipt").html(compiled({images:this.pictures}));
      $('.panel').on('click', "[data-action]", $.proxy(this._action, this));

      $("#openFolder").on('click', () => {
          gui.Shell.showItemInFolder(this.pictures[0].src);
      })
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
    var pic = "file:///Users/Maelle/Desktop/RemoteCameras/pictures/1470755595/lala.jpg"
    console.log("Retakepicture")
    evt.stopPropagation()
    $('.panel-body').html("Please wait");
    var $elt = $(evt.currentTarget)
    var current_pic = this.pictures[$elt.data('id')];
    current_pic.takeNewOne().then( (content)=> {
        this.displayPicture();
      //ICI RECHARGER LES IMAGES
      $elt.parent().html();
    }).catch( (err)=> {
        console.error(err);
        this.displayPicture();
    });
  }

  initRename(evt){
    console.log("Rename")
    var $elt = $(evt.currentTarget)
    var id = $elt.parent().parent().data('id');
    $elt.parent().html('<br><input type="text" name="images-name" placeholder="Nouveau nom" id="newname'+ id+ '"><br><br> <input type="button" value="Valider" class="rename" data-action="rename"> <br><br>');
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
}















