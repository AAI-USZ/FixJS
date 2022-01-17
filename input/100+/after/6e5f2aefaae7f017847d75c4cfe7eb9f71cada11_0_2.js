function(){
                        var parent = $(this).closest(".column");
                        parent.find(".dropdown-list li").last().remove();
                        parent.find(".button").hide();

                        var items = parent.find(".dropdown-list .hd .target-quicktimeplayer");
                        items.each(function(){
                            var self = $(this),
                                old_href = self.attr("href"),
                                title = document.title.slice( 0,document.title.indexOf("-")-1),
                                pic_url = parent.find(".OverlayPanel img").attr("src"),
                                filename = old_href.slice(old_href.lastIndexOf("/")+1,old_href.length),
                                new_href;

                            new_href = old_href + "#name=" + title + "&image=" + pic_url +
                                "&content-type=video/mov";

                            self.attr("href",new_href).attr("download",filename);
                        });


                        // 展示下载列表
                        var down_list = parent.find(".dropdown-list").html(),
                            prev = parent.prev();

                        prev.html(down_list);

                        prev.find(".dropdown-overlay").show();
                        prev.find(".dropdown-overlay .hd span").hide();
                        var down_items = prev.find(".dropdown-overlay li"),
                            counter;
                        for(var a = 0 ; a<down_items.length; a++){
                            if($(down_items[a]).hasClass("hr")){
                                counter = a;
                            }
                        }

                        for( var i = 0 ; i<counter; i++){
                            $(down_items[i]).hide();
                        }

                    }