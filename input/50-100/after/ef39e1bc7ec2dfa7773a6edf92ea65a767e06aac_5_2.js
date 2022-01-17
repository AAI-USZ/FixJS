function (text) {
                        if (typeof text === 'undefined') return undefined;
                        var m = new RegExp(/ObjectID\("([0-9a-f]+)"\)/).exec(text);
                        return m ? new $data.mongoDBDriver.ObjectID.createFromHexString(m[1]) : text;
                    }