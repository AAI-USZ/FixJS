function() {
                    $.ajax({
                        url:self.Config["general"].rootUrl + c.path+"/en.js",
                        async:true,
                        dataType:"script",
                        success:function() {
                            c.lang = "en";
                            self.init(kvp, ctx);
                        }
                    });
                }