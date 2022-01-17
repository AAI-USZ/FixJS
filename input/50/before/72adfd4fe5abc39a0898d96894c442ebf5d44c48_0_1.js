function(path)
    {
        try {
            var file = Components.classes[this.localfileCID].createInstance(this.localfileIID);
            file.initWithPath(path);
            return file;
        }
        catch (e) {
            return false;
        }
    }