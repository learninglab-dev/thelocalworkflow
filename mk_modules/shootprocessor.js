var fs = require("fs");
// var columnify = require('columnify');
var path = require("path");
// var ffprobetools = require("./ffprobetools");
const Clip = require("./workflowobjects").Clip;
const Shoot = require("./workflowobjects").Shoot;

function rename(folderPath) {
  var re = /^\./;
  var thisShoot = new Shoot(folderPath);
  var theseClipObjects = [];
  var cameraArray = [];
  var folders = fs.readdirSync(folderPath);
  folders.forEach(function(camFolder){
    // check if this is actually a folder, if so, push camera to .cameraArray and start looping files in it
    if (fs.statSync(path.join(folderPath,camFolder)).isDirectory()) {
      thisShoot.cameraArray.push(camFolder);
      fs.readdirSync(path.join(folderPath,camFolder)).forEach(function(file, index) {
        if (re.test(file)) {
          // if this is a hidden file, don't bother with it
          // console.log("WE ARE NOT GOING TO RENAME " + file);
        }
        else {
          var thisClip = new Clip(folderPath, camFolder, path.basename(file), index);
          theseClipObjects.push(thisClip);
          var update = ("\ngoing to try to rename \t\t" + thisClip.oldPath + "\t to \t" + thisClip.newPath)
          console.log(update);
          fs.appendFileSync('./tests/output/log.txt', update);
          //
          // TODO: toggle this on and off to avoid renaming while testing:
          // fs.renameSync(thisClips.oldPath, thisClip.newPath);
        }
      });
    }
    else {
      console.log(camFolder + " or is not a camera directory");
    }
  });
  console.log("the cameraArray is: \n" + thisShoot.cameraArray );
  thisShoot.clipArray = theseClipObjects;
  shootNotes=("Log of renaming operations for " + thisShoot.shootId + ":\n");
  thisShoot.clipArray.forEach(function(clip, index){
    shootNotes=(shootNotes+(index+1)+". Renamed " + clip.oldBasenameExt + " to " + clip.newBasenameExt + "\n" )
    // console.log("renamed " + clip.newBasenameExt);
  });

  shootNotesName=(thisShoot.shootId + "_shootnotes.txt")
  shootNotesPath=path.join(folderPath, shootNotesName)
  fs.appendFile(shootNotesPath, ("\n\n" + shootNotes), function (err) {
    if (err) {
      // console.log("didn't work");
    } else {
      // done
    }
  })
  return thisShoot;
}

module.exports.rename = rename;
