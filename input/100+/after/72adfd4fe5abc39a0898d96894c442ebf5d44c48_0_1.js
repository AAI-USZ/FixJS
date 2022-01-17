function(file, charset)
    {
        try {
            var data = new String();
            var fStream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
            var sStream = Components.classes['@mozilla.org/scriptableinputstream;1'].createInstance(Components.interfaces.nsIScriptableInputStream);
            fStream.init(file, 1, 0, false);
            sStream.init(fStream);
            data += sStream.read(-1);
            sStream.close();
            fStream.close();
            if (charset) {
                data = this.toUnicode(charset, data);
            }
            return data;
        }
        catch (e) {
            debug("FileIO: read: " + e)
            return false;
        }
    }