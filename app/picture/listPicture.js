var pictures = [];
import { Picture } from './picture';
export class listPicture {
    init(list) {
    	for (var i = 0; i < list.length; i++) {
    		console.log("init = " + list[i])
    		var pic = new Picture;
    		pic.init(list[i]);
    		console.log("created" + pic.getName())
    		pictures.push(pic);
    	};
    }
	getPictures() {
		console.log("get picture : " + pictures[0].getName())
		return pictures;
	}

	displayPicture() {
		for (var i = 0; i < pictures.length; i++) {
			pictures[i].displayPicture();
		};
	}
}