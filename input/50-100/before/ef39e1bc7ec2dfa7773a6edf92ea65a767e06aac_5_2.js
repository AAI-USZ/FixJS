function (text) {
                        if (typeof text === 'undefined') return undefined;
                        var m = new RegExp(/ObjectID\("([0-9a-f]+)"\)/).exec(text);
                        return m ? new require('mongodb').ObjectID.createFromHexString(m[1]) : text;
                    }