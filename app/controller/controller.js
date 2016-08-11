nw.require("nwjs-j5-fix").fix();
var five = require("johnny-five");
var $ = require("jquery");

export class Controller {
    board;
    bumper;

    constructor(cb) {
     this.board = new five.Board();
     this.addBoard(function(){
        cb();
     });
     this.addKeyboard(function(){
        cb();
     });
    // this.addHomeButton(function(){
    //     cb();
    //  });
    }

    addBoard(cb){
      this.board.on("ready", () => {
        console.log("board ready");
        this.bumper = new five.Button(7);
        this.bumper.on("up",()=>{
            cb();
        })
      });
    }

    addKeyboard(cb){
      document.addEventListener('keydown', (event) => {
      const keyName = event.key;
      if (keyName === ' ') {
        cb();
      }
      }, false);
    }

    // addHomeButton(cb){
    //   $("#buttonTakePicture").on('click', ()=> {
    //       alert("clickkkk")
    //       cb();
    //   });
    // }
}
