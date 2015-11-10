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
var imgFile = do_get_file(imgName);
dump(2);

//var istream = getFileInputStream(imgFile);
Components.utils.import("resource://gre/modules/FileUtils.jsm");
var file = new FileUtils.File(imgName);

dump(3);
//var data = "";

//Components.utils.import("resource://gre/modules/NetUtil.jsm");
//NetUtil.asyncFetch(file, function(inputStream, status) {
  // The file data is contained within inputStream.
  // You can read it into a string with
  //var data = NetUtil.readInputStreamToString(inputStream, inputStream.available());
//});



var data = "";
var fstream = Components.classes["@mozilla.org/network/file-input-stream;1"].
              createInstance(Components.interfaces.nsIFileInputStream);
var cstream = Components.classes["@mozilla.org/intl/converter-input-stream;1"].
              createInstance(Components.interfaces.nsIConverterInputStream);
fstream.init(file, -1, 0, 0);
cstream.init(fstream, "UTF-8", 0, 0); // you can use another encoding here if you wish

dump(4);

let (str = {}) {
  let read = 0;
  do {
    read = cstream.readString(0xffffffff, str); // read as much as we can and put it in str.value
    data += str.value;
  } while (read != 0);
}
cstream.close(); // this closes fstream

dump(5);

var parser = Components.classes["@mozilla.org/xmlextras/domparser;1"].createInstance(Components.interfaces.nsIDOMParser);
dump(6);
var doc = parser.parseFromString(data, "text/html");
dump(5);
dump('\n');
dump(doc);
var x = doc.getElementsByTagName("img")[0];
dump('\n');
dump(x);
dump(x.complete);

var canvas = Cc["@mozilla.org/xul/xul-document;1"].createInstance(Ci.nsIDOMDocument).implementation.createDocument("http://www.w3.org/1999/xhtml", "html", null).createElementNS("http://www.w3.org/1999/xhtml", "canvas");

canvas.setAttribute("height", 32);
canvas.setAttribute("width", 32);
var context = canvas.getContext('2d');
context.drawImage(x, 0, 0);
dump(7);

