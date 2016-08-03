var five = require("johnny-five"),
board,button;
var led;
export class Controller {
    init() {
    	board = new five.Board();
	    board.on("ready", function() {
		    // button = new five.Button(2);
		    // board.repl.inject({
		    //   button: button
		    // });
			led = new five.Led(13);
			led.blink(500);
  			
	    });
	    console.log("ready!");
	   //      button.on("up", function() {
    //     console.log("the button is push");
    // });
    }
}