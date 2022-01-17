function(file, base64)
    {
        try {
            var fStream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
            var bStream = Components.classes["@mozilla.org/binaryinputstream;1"].createInstance(Components.interfaces.nsIBinaryInputStream);
            fStream.init(file, 1, 0, false);
            bStream.setInputStream(fStream);
            var data = bStream.readByteArray(bStream.available());
            bStream.close();
            fStream.close();
            if (base64) {
                data = Base64.encode(data);
            }
            return data;
        }
        catch(e) {
            debug("FileIO: readBinary: " + e)
            return false;
        }
    }