function (textxml) {
        var textxml = this.getList(textxml);
        // get a reference to the requested corresponding xml file
        if (window.DOMParser) {
            this.parser = new DOMParser();
            this.xmlDoc = this.parser.parseFromString(textxml, "text/xml");
        } else // Internet Explorer (untested!)
        {
            this.xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
            this.xmlDoc.async = "false";
            this.xmlDoc.loadXML(textxml);
        }
        if (this.xmlDoc == null) {
            cc.Log("xml " + this.xmlDoc + " not found!");
        }
        return this.xmlDoc;
    }