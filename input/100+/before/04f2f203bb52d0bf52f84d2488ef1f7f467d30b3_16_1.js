function(value) {
                    var dx, name, _ = this._;
                    if (typeof value === "string") {
                        if (value === "~") {
                            name = _.tableName;
                            if (name.charAt(0) === "~") {
                                name = name.substr(1);
                            } else {
                                name = "~" + name;
                            }
                        } else {
                            name = value;
                        }
                        
                        if ((dx = Envelope.AmpTables[name]) !== undefined) {
                            if (typeof dx === "function") dx = dx();
                            _.tableName = name;
                            _.table = dx;
                        }
                    }
                }