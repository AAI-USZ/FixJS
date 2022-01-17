function(type)
    {
        try {
            return Components.classes[this.dirservCID].createInstance(this.propsIID).get(type, this.fileIID);
        }
        catch (e) {
            return false;
        }
    }