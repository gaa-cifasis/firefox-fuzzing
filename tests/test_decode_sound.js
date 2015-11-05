/*
 * Tests for imgITools
 */

const Ci = Components.interfaces;
const Cc = Components.classes;


/*
 * getFileInputStream()
 *
 * Returns an input stream for the specified file.
 */
function getFileInputStream(aFile) {
    var inputStream = Cc["@mozilla.org/network/file-input-stream;1"].
                      createInstance(Ci.nsIFileInputStream);
    // init the stream as RD_ONLY, -1 == default permissions.
    inputStream.init(aFile, 0x01, -1, null);

    // Blah. The image decoders use ReadSegments, which isn't implemented on
    // file input streams. Use a buffered stream to make it work.
    //var bis = Cc["@mozilla.org/network/buffered-input-stream;1"].
    //          createInstance(Ci.nsIBufferedInputStream);
    //bis.init(inputStream, 1024);

    return inputStream;//bis;
}

function do_get_file(path, allowNonexistent) {
  try {
    let lf = Components.classes["@mozilla.org/file/directory_service;1"]
      .getService(Components.interfaces.nsIProperties)
      .get("CurWorkD", Components.interfaces.nsILocalFile);

    let bits = path.split("/");
    for (let i = 0; i < bits.length; i++) {
      if (bits[i]) {
        if (bits[i] == "..")
          lf = lf.parent;
        else
          lf.append(bits[i]);
      }
    }

    return lf;
  }
  catch (ex) {
    do_throw(ex.toString(), Components.stack.caller);
  }

  return null;
}



dump(1);
var imgName = arguments[0];
var inMimeType = arguments[1];
//var imgFile = do_get_file(imgName);
dump(2);

var ios = Components.classes['@mozilla.org/network/io-service;1'].getService(Components.interfaces.nsIIOService);
var sound = ios.newURI(imgName, null, null); 
var player = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);

player.play(sound);


//var myURI = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService).newURI(imgName, null, null);
//var sound = Components.classes["@mozilla.org/sound;1"].createInstance(Components.interfaces.nsISound);
//sound.init();

//sound.beep();
//sound.play(myURI);
dump(3);
