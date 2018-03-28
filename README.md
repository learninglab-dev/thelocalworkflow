# thelocalworkflow

Use at your own risk.  These are internal workflow tools that don't all work, and you shouldn't trust them without knowing how to tinker with them yourself (and, obviously, perform loads of tests before you trust them in a production environment).

## getting started

For our staff, the best place to get started learning is actually [thesimpleworkflow](https://github.com/learninglab-dev/thesimpleworkflow). But when you want to get `thelocalworkflow` running on one of our machines, here are the steps:

1. make sure your machine has ffmpeg, ffprobe, node and git installed (should be no problem if on one of the LL machines)
2. open up Terminal and get into your Development folder if you have one (type `cd ~/Development`)
3. type `git clone https://github.com/ll-dev-team/thelocalworkflow.git` to clone the repository--it will create a new folder for thesimpleworkflow.  (Alternatively, if you have your own github account you can click the "fork" icon to fork thesimpleworkflow and work on this fork)
4. type `cd thelocalworkflow` to change directories and get into the root of `thelocalworkflow` app
5. type `npm install` to install all the npm dependencies you'll need
5. type `atom .` to open up the root folder and all of its contents in Atom (this will only work if you have Atom command line tools installed, but you should do this if you haven't already)
6. create a file in the root directory of thesimpleworkflow called `.env` and add all your secret stuff (like `SLACK_TOKEN=XXXXXXXXXXXX` and `MONGODB_URL=XXXXXXXXXX` etc.)--ask MK for more info on this that we can't put up on GitHub
7. most currently existing functions are available by typing `node thelocalworkflow` + an argument or two.  For example, `node thelocalworkflow --rename` + a folder name will rename all of your footage (if you've organized your folders according to our conventions), and it will generate .fcpxml that syncs all footage from our 4 main cameras.  (Everything else just gets renamed).  For more on the functions available through the command line, check out `thelocalworkflow.js`, which you'll find in the root directory.
8. we are in the process of making some of these functions available through an html-interface (all running locally on `localhost:3000`).  To play around with this, type `npm start` and then open a browser.  One really useful page that's up and running is the [markers-to-stills page](http://localhost:3000/m2s), which will take in an `.fcpxml` file formatted according to the LL specs and send you back well-named stills, serving them up as a web preview for you and storing them in the public folder.

## things to discover

We are a professional video team rather than a software development team, so everything here is pretty experimental, but if you want to team with us we can on building some useful tools together.
Here are some of the elements of `thelocalworkflow` you might want to use or explore:

### Markers to Stills

The file `m2s.js` contains the code we use to move from Final Cut markers to stills. The steps are as follows:
1. in your Final Cut Event of choice, create a Project (a timeline) and load it up with all of your clips (don't edit them--just throw them all in back to back).
2. in that timeline, watch the footage and insert markers (hitting "m") at any frame you'd like to save as a still
3. export the `.fcpxml` file of either the project alone or of the event that contains it (either will work)
4. run the script, either in the command line or through the web interface.  For the command line option, type `node thelocalworkflow --m2s [path to your XML]`. For the web-based interface, just type `npm start` to get the server running, then go to `localhost:3000/m2s`. You should be able to paste in the path to the xml file and run the script.  NOTE: this is NOT an appropriate way to build this as a web app (and depends on the client and the server being the same actual machine, which is really not a thing to do). We are JUST giving our editors the ability to run the script without having to use the command line. The script will then run, and it will show you all of the stills you've just exported on an HTML page.

### Rename and Sync

Our rename script works on folders that are structured according to our naming conventions. To get them to work, perform the following steps.
1. Make a folder for the shoot with the `ShootID` as its title.  The format for shoot ID's should be `YYYYMMDD_[3 DIGIT COUNTER]_[PROJECT ID]_[SUBIDENTIFIER]`, for instance, for a Harvard Horizons rehearsal, it might be `20180301_007_HH_Rehearsal`.  You really do need to have four and EXACTLY FOUR elements separated by underscores, because the script will be looking for those elements and using them to general file names and other operations.
2. Within the shoot folder, create subfolders for each individual camera, `C300a`, `C300b`, `5Da` for instance.
3. If there's anything you want renamed but NOT added to fcpxml generation (powerpoint files, extra audio files, etc.) you can add an underscore to the folder name, as in `_H6Tr1`.
4. If you want to perform timecode-based sync operations, you'll need to define the array of cameras for which this is possible in `tools/workflow_tools/shootprocessor.js`.  Right now this is a list of the cameras that are all connected by SDI cables in our studio:
```javascript
    var syncCameras = ["C300a", "C300b", "C300c", "GH4a", "GH4"];
```
    You can change this line to match your setup.
5. Once this is done, you can run the script by typing `node thelocalworkflow --rename [PATH TO YOUR FOLDER]`. It will rename the files and sync up any files from any folder matching a string from the `syncCameras` array.

### GIFs!

Our gif scripts are new and underdeveloped (and obviously not quite as essential as some others).  But here's what we have so far:
1. To create a GIF using the palette-generation workflow you may have read about in online tutorials on GIFs, type `node thelocalworkflow --gif [path to your video file]`.
2. To create a whole bunch of GIFs from a folder of short video files, use the command `node the localworkflow --folderToGifs [your path]`.

Take a look at the code we have for `io2gif` and `fcpxmlToGif`---this is pretty experimental and broken, but the basic idea of `io2gif` is to be able to request a gif by identifying a segment of a longer video file, and the idea behind `fcpxmlToGif` is to be able to parse an xml file, look for any FCPX range selections with the keyword "gif", and then export each of these segments in animated gif form.
