function (e) {
                    var retVal = {};
                    var json = this.responseText;
                    try {
                        json = json.trim();
                        if (json && json.length > 0) {
                            retVal = JSON.parse(json);
                        }
                    } catch (err) {
                        retVal = err;
                    }
                    retVal.message || (retVal.message = e.error);
                    retVal.error = true;
                    retVal.statusText = this.statusText;
                    retVal.status = this.status;
                    if (retVal.meta) {
                        retVal.metaString = JSON.stringify(retVal.meta);
                    }
                    callback(retVal);
                }