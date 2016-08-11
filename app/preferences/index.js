var $ = require("jquery");

var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');


export class Preferences {

    _settings;


    constructor() {
        this._settings = {"language": navigator.language};
        this.loadSettings();
    }

    loadSettings() {
        var file = 'packshots-settings-file.json';
        var filePath = path.join(gui.App.dataPath, file);
        fs.readFile(filePath, (err, data) => {
            if (err) throw err;
            this._settings = JSON.parse(data);
            console.log(this._settings);
        });
    }

    chooseSaveFolder(name) {
      var chooser = document.querySelector("");
      chooser.addEventListener("change", function(evt) {
        console.log(this.value);
      }, false);
    }

    saveSettings (settings, callback) {
        var file = 'packshots-settings-file.json';
        var filePath = path.join(gui.App.dataPath, file);
        console.log(filePath);

        fs.writeFile(filePath, JSON.stringify(settings), function (err) {
            if (err) {
                console.info("There was an error attempting to save your data.");
                console.warn(err.message);
                return;
            } else if (callback) {
                callback();
            }
        });
    }
}
