function(field) {
                                    var would_be_path =
                                        path + "." + field.name;
                                    var wbp_re =
                                        new RegExp("^" + would_be_path);
                                    if (!self.structure[0].cells[0].filter(
                                        function(c) {
                                            return c.fpath &&
                                                c.fpath.match(wbp_re);
                                        }
                                    ).length) {
                                        console.info("adding auto field" + would_be_path);
                                        self.structure[0].cells[0].push({
                                            "field": "AUTO_" + beginning.name +
                                                "_" + field.name,
                                            "name": beginning.label + " - " +
                                                field.label,
                                            "fsort": true,
                                            "fpath": would_be_path,
                                            "_visible": false
                                        });
                                    }
                                }