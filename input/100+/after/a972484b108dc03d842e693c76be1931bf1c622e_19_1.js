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
            cc.log("xml " + this.xmlDoc + " not found!");
        }
        var plist = this.xmlDoc.documentElement;
        if (plist.tagName != 'plist') {
            throw "Not a plist file"
        }
        // Get first real node
        var node = null;
        for (var i = 0, len = plist.childNodes.length; i < len; i++) {
            node = plist.childNodes[i];
            if (node.nodeType == 1) {
                break
            }
        }
        this.plist = this._parseNode(node);
        return this.plist;
    }