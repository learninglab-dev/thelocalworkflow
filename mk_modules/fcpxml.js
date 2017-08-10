const xml = require('xml');
const fs = require("fs");
const columnify = require('columnify');
const path = require("path");
const ffprobetools = require("./ffprobetools");
const shootprocessor = require("./shootprocessor");

function makeFcpxml(shootObject){
  // define key variables for fcpxml---mainly container arrays for the clip, format and mc or cc resources to come.
  var clipsForXml = [];
  var theFormats = makeFormats(shootObject);
  // add clips to an array for clips for the RESOURCES element
  var fcpxmlAttr = {_attr:{version:'1.6'}};
  var libraryXml = {library: []};
  libraryAttr = {_attr: {location: "file:///Users/mk/Development/temp/Untitled.fcpbundle/"}}
  libraryXml.library.push(libraryAttr);
  var libraryEventOne = {event:[{_attr:{name:shootObject.shootId}}]};

  shootObject.clipArray.forEach(function(clip, index){
    // console.log(index + ". " + clip.newBasenameExt + " needs to be added");
    var theCounter=theFormats.resources.length + 1;
    // console.log("\n\n__________________________________\n\nin loop of clipArray and clip.fcpxml is: \n\n" + JSON.stringify(clip.fcpxml, null, 2));
    // var theClipToAdd=clip.fcpxml.asset;
    // console.log("\n\n__________________________________\n\nin loop of clipArray and theClipToAdd is: \n\n" + JSON.stringify(theClipToAdd, null, 2));
    clip.fcpxml.asset._attr.id = ("r"+theCounter)
    clip.fcpxml.asset._attr.format = ("loop in search of format")
    // then figure out format by looping through formats --- find a way to just loop formats rather than all resources.
    // console.log("\n\n\ntrying to add: \n\n" + JSON.stringify(theClipToAdd, null, 2));
    theFormats.resources.push({asset: clip.fcpxml.asset});
    // console.log("resources in theFormats.resources = " + theFormats.resources.length + " and we are working on " +  clip.newBasenameExt);
    // console.log("\n\n__________________________________\n\nin loop of clipArray and clip.fcpxml is: \n\n" + JSON.stringify(clip.fcpxml, null, 2));
    // console.log("clip.fcpxml.asset._attr.id is " + clip.fcpxml.asset._attr.id);
    clip.fcpxml.assetClip[0].ref=clip.fcpxml.asset._attr.id;
    clip.fcpxml.assetClip[0].format=clip.fcpxml.asset._attr.format;

    // var keywords = {keyword: {_attr: {start:"make_start_of_clip", duration:"duration_of_clip", value:"comma separated keywords"}}};
    // thisClip.fcpxml["asset-clip"]._attr.ref=thisClip.asset
    var newLibraryAssetClip = {"asset-clip": clip.fcpxml.assetClip};
    // console.log("\n\n__________________________________\n\nabout to push newLibraryAssetClip and it looks like this: \n\n" + JSON.stringify(newLibraryAssetClip, null, 2));
    libraryEventOne.event.push(newLibraryAssetClip);



  });

  // define first lines of xml


  shootObject.clipArray.forEach(function(thisClip, index) {
    // console.log("in fcpxml and working on" + thisClip.newBasenameExt);

  });

  libraryXml.library.push(libraryEventOne);
  // console.log("resources in theFormats.resources = " + theFormats.resources.length);
  // console.log(JSON.stringify(libraryXml.library[0], null, 2));
  // console.log("\n\nand now maybe the event?\n" + JSON.stringify(libraryXml.library[1], null, 2) );
  fcpxObject = {fcpxml:[fcpxmlAttr, theFormats, libraryXml]}
  // console.log("\n**************\n\n trying whole fcpxObject now \n");
  // console.log(JSON.stringify(fcpxObject, null, 2));
  theXmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE fcpxml>\n'

  var theXml = (theXmlHeader + (xml(fcpxObject, {indent:'\t'})));
  // console.log("\n\n\n\n\n\n\nhere is theXml we hope:\n\n" + theXml);
  var filePath = (shootObject.shootPath + "/" + shootObject.shootId + "_v1.fcpxml");
  fs.writeFileSync(filePath, theXml);
  var pathForJson = (shootObject.shootPath + "/" + shootObject.shootId + "_fcpxObject.json");
  var fcpxJson = JSON.stringify(fcpxObject, null, 2);
  fs.writeFileSync(pathForJson, fcpxJson);
}

function makeFormats(shootObject){
  // console.log("\n\n\n\nstarting makeFormats");
  var resourceXml = {resources: []};
  // console.log("structure of resourceXml =" + JSON.stringify(resourceXml, null, 2));
  // function isFormatThere(clip){
  shootObject.clipArray.forEach(function(clip, index){
    // console.log("1. " + resourceXml.resources.length + " is the current length of .resources");
    if (resourceXml.resources.length==0){
      // console.log("2. hitting first if statement---adding ");
      var theNewFormat = {format:{_attr:{id:"r1", frameDuration:(clip.codec_time_base+"s"), width:clip.width, height:clip.height}}};
      // resourceXml.resources.push(theNewFormat);
      // console.log("3. pushed theNewFormat and the length of resources is now " + resourceXml.resources.length);
    }
    else {
      // console.log("3. starting the test for " + clip.newBasenameExt);
      // console.log("index is " + index);
      // console.log("resource array length is now " + resourceXml.resources.length);
      formatMatch = false;
      for (var i = 0; i < resourceXml.resources.length; i++) {
        // console.log("in the loop and the index is " + i);
        // console.log("properties for clip = "+ clip.width + clip.height + clip.codec_time_base );
        // console.log("properties for resourceXml format = " + resourceXml.resources[i].format._attr.width + resourceXml.resources[i].format._attr.height + resourceXml.resources[i].format._attr.frameDuration);
        if (clip.width == resourceXml.resources[i].format._attr.width && clip.height == resourceXml.resources[i].format._attr.height && (clip.codec_time_base+"s") == resourceXml.resources[i].format._attr.frameDuration) {
          formatMatch=true;
          // console.log("format match");
        }
        else {
          // console.log("no format match");
        }
      }
      // console.log("formatMatch is now " + formatMatch);
      if (formatMatch == false){
        // console.log("adding format variable");
        var theNewFormat = {format:{_attr:{frameDuration:(clip.codec_time_base+"s"), width:clip.width, height:clip.height}}};
        // console.log(JSON.stringify(theNewFormat, null, 2));
      }
    }
    // console.log("If there is a new format it is:" + JSON.stringify(theNewFormat));
    if (theNewFormat) {
      resourceXml.resources.push(theNewFormat);
      // console.log("just added format"+ JSON.stringify(resourceXml.resources, null, 2) +" for " + clip.newBasenameExt);
    }
    // console.log("\n\n\n\n\n\n\n\n\n\n\n" + JSON.stringify(resourceXml.resources, null, 2));
    for (var i = 0; i < resourceXml.resources.length; i++) {
      var formatCounter = ("r"+(i+1));
      resourceXml.resources[i].format._attr.id = formatCounter;
    }
    // resourceXml.resources.foreach(function(formatResource, index){
    //   var formatCounter = ("r"+index);
    //   console.log("in foreach loop and rCounter is " + formatCounter);
    //   // formatResource.format._attr.id = formatCounter;
    // });

  });
  return resourceXml;
}

module.exports.makeFcpxml = makeFcpxml;
module.exports.makeFormats = makeFormats;
