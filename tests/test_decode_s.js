/*
 * Tests for imgITools
 */

const Ci = Components.interfaces;
const Cc = Components.classes;

dump(1);
var imgName = arguments[0];
var inMimeType = arguments[1];

var ioService = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
var localFile = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsILocalFile);
localFile.initWithPath(imgName);
var uri = ioService.newFileURI(localFile);

dump(2);

//var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
//var sound = ios.newURI(imgName, null, null); 
//var player = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
//player.play(sound);
dump(uri);

var audio = new Audio();
audio.src = uri.spec
audio.play();


//var myURI = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(imgName, null, null);
//var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
//sound.init();

//sound.beep();
//sound.play(uri);
dump(3);
