function(file)
    {
        try {
            var fd = this.open(file);
            var fStream = Components.classes['@mozilla.org/network/file-input-stream;1'].createInstance(Components.interfaces.nsIFileInputStream);
            var sStream = Components.classes["@mozilla.org/network/buffered-input-stream;1"].createInstance(Components.interfaces.nsIBufferedInputStream);
            fStream.init(fd, 1, 0, false);
            sStream.init(fStream, 9000000);
            return [fStream, sStream, fd];
        }
        catch (e) {
            return null;
        }
    }