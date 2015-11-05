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



dump(1);
// 64x64 png, 8415 bytes.
var imgName = arguments[0];
dump(2);
var inMimeType = "image/bmp";
var imgFile = do_get_file(imgName);
dump(3);

var istream = getFileInputStream(imgFile);
dump(4);

var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(Components.interfaces.nsIDOMParser);
dump(5);
var img = parser.parseFromStream(istream, null, 10000, "image/svg+xml");
dump('\n');
dump(img);
dump(6);

//Components.classes["@mozilla.org/gfx/region;1"].createInstance(Components.interfaces.nsIScriptableRegion).init()

var canvas = Cc["@mozilla.org/xul/xul-document;1"].createInstance(Ci.nsIDOMDocument).implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null).createElementNS("http://www.w3.org/1999/xhtml", "canvas");
//canvas = canvas.QueryInterface(Components.interfaces.nsIDOMHTMLCanvasElement);
canvas.setAttribute("height", 32);
canvas.setAttribute("width", 32);

dump(7);

var context = canvas.getContext('2d');
context.drawImage(img, 0, 0);

dump(8);
