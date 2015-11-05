var Cu = Components.utils;
var Cc = Components.classes;
var Ci = Components.interfaces;
dump(1);
var zr = Cc["@mozilla.org/libjar/zip-reader;1"].createInstance(Ci.nsIZipReader);
dump(2);
Cu.import('resource://gre/modules/osfile.jsm');
Cu.import('resource://gre/modules/FileUtils.jsm');
dump(3)
var reusableStreamInstance = Cc['@mozilla.org/scriptableinputstream;1'].createInstance(Ci.nsIScriptableInputStream);
    
var nsiFileXpi = new FileUtils.File(arguments[0]);
zr.open(nsiFileXpi); //if file dne it throws here
var entries = zr.findEntries('*');

while (entries.hasMore()) {
  var entryPointer = entries.getNext(); //just a string of "zip path" (this means path to file in zip, and it uses forward slashes remember)
  var entry = zr.getEntry(entryPointer); // should return true on `entry instanceof Ci.nsIZipEntry`
  dump(entryPointer);
  if (!entry.isDirectory) {
    var inputStream = zr.getInputStream(entryPointer);
    reusableStreamInstance.init(inputStream);
    var fileContents = reusableStreamInstance.read(entry.realSize);
  }

}
dump(4);      
dump('\n');
