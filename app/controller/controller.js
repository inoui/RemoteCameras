nw.require("nwjs-j5-fix").fix();
var five = require("johnny-five");

export class Controller {
    board;
    bumper;
    constructor(cb) {
    	this.board = new five.Board();
	    this.board.on("ready", () => {
      console.log("board ready");
      this.bumper = new five.Button(7);

      cb();
    });
    }

    waitPushButton(cb){
      this.bumper.on("up",()=>{
          console.log("button up ");
          cb();
      })
  }
}
