function() {
                    $.ajax({
                        url:c["general"].rootUrl + c["i18n"].path+"/en.js",
                        async:true,
                        dataType:"script",
                        success:function() {
                            c.lang = "en";
                            self.init(kvp, ctx);
                        }
                    });
                }