function(file, base64)
    {
        try {
            var fStream = Components.classes[this.finstreamCID].createInstance(this.finstreamIID);
            var bStream = Components.classes[this.binstreamCID].createInstance(this.binstreamIID);
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