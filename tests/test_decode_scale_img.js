/*
 * Tests for imgITools
 */

const Ci = Components.interfaces;
const Cc = Components.classes;

function getFileInputStream(aFile) {
    var inputStream = Cc["@mozilla.org/network/file-input-stream;1"].
                      createInstance(Ci.nsIFileInputStream);
    inputStream.init(aFile, 0x01, -1, null);
    // Blah. The image decoders use ReadSegments, which isn't implemented on
    // file input streams. Use a buffered stream to make it work.
    var bis = Cc["@mozilla.org/network/buffered-input-stream;1"].
              createInstance(Ci.nsIBufferedInputStream);
    bis.init(inputStream, 1024);

    return bis;
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



var imgTools = Cc["@mozilla.org/image/tools;1"].
               getService(Ci.imgITools);

dump(1);
var imgName = arguments[0];
dump(2);
var inMimeType = arguments[1];
dump(3);
var imgFile = do_get_file(imgName);
dump(4);
var istream = getFileInputStream(imgFile);
dump(5);
var outParam = { value: null };
imgTools.decodeImageData(istream, inMimeType, outParam);
var container = outParam.value;
imgTools.encodeScaledImage(container, "image/bmp", 16, 16)
dump('\n');

