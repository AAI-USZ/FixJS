function() {
            if (xmlhttp.readyState == 4) {
                var data = xmlhttp.responseText;
                while (d = rx.exec(data)) {
                    debug(d);
                    if (parseFloat(d[1]) > parseFloat(me.VERSION)) {
                        me.promptInput('Update', [{label:"New version " + d[1] + "is available at",value:me.URL,type:"link",url:me.URL}]);
                        return;
                    }
                }
                alert("No new version available")
            }
        }