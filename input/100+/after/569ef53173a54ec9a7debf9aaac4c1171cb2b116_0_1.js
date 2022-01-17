function()
    {
        var me = this;
        if (!this.isEnabled()) return null;

        // File naming convention
        var rx = new RegExp(this.NAME + ".*[-\.]([0-9]}\.[0-9]+\.[0-9]+)[-\.].*zip", "g");
        var ver = this.versionNum(me.VERSION);

        // HTTP access to the releases, can be any kind of page or listing with files
        var xmlhttp = this.api.getXmlHttp();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                var data = xmlhttp.responseText;
                while (d = rx.exec(data)) {
                    debug(d);
                    if (me.versionNum(d[1]) > ver) {
                        me.promptInput('Update', [{label:"New version " + d[1] + "is available at",value:me.URL,type:"link",url:me.URL}]);
                        return;
                    }
                }
                alert("No new version available")
            }
        }        xmlhttp.open("GET", this.URL, true);
        xmlhttp.setRequestHeader("User-Agent", this.getUserAgent());
        xmlhttp.send();
    },
