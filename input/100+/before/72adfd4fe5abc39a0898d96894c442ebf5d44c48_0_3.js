function(file, data, mode, charset)
    {
        try {
            var fStream = Components.classes[this.foutstreamCID].createInstance(this.foutstreamIID);
            if (charset) {
                data = this.fromUnicode(charset, data);
            }
            var flags = 0x02 | 0x08 | 0x20; // wronly | create | truncate
            if (mode == 'a') {
                flags = 0x02 | 0x10; // wronly | append
            }
            fStream.init(file, flags, 0600, 0);
            fStream.write(data, data.length);
            fStream.close();
            return true;
        }
        catch (e) {
            debug("FileIO: write: " + e)
            return false;
        }
    }