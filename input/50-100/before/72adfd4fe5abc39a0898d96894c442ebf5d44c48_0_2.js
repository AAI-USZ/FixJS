function(file)
    {
        try {
            var fd = this.open(file);
            var fStream = Components.classes[this.finstreamCID].createInstance(this.finstreamIID);
            var sStream = Components.classes[this.bufstreamCID].createInstance(this.bufstreamIID);
            fStream.init(fd, 1, 0, false);
            sStream.init(fStream, 9000000);
            return [fStream, sStream, fd];
        }
        catch (e) {
            return null;
        }
    }