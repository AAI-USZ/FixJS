function(response)
    {
        var xmlDoc = response.responseXML;
        var list = [];
        var items = this.getItems(xmlDoc, "DBInstances", "DBInstance");
        for (var i = 0; i < items.length; i++) {
            list.push(this.unpackDBInstance(items[i]));
        }

        this.core.setModel('dbinstances', list);
        response.result = list;
    }