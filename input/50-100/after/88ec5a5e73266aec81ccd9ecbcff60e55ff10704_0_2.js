function () {
                if (oXmlHttp.readyState == 4) {
                    if (oXmlHttp.status == 200 || oXmlHttp.status == 304) {
                        eval.call(window, oXmlHttp.responseText);
                        if (typeof callback === 'function')
                            callback(true);
                    } else {
                        if (typeof callback === 'function') {
                            callback(false);
                        }
                    }
                }
            }