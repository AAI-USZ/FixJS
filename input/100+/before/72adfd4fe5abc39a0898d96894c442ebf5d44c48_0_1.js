function(file, charset)
    {
        try {
            var data = new String();
            var fStream = Components.classes[this.finstreamCID].createInstance(this.finstreamIID);
            var sStream = Components.classes[this.sinstreamCID].createInstance(this.sinstreamIID);
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