function(){
                    var
                        self = $(this),
                        pic_src = self.find("img").attr("src"),
                        link = self.find(".lbConTxt a"),
                        pic_id = pic_src.slice(pic_src.lastIndexOf("/")+1,pic_src.lastIndexOf("/")+7),
                        group_id = pic_src.slice( pic_src.indexOf("mid_")+4, pic_src.indexOf("mid_")+7),
                        mid_pic = "http://img9.zol.com.cn/dp_800/"+group_id+"/"+ pic_id +".jpg",
                        big_pic = "http://img9.zol.com.cn/desk_pic/big_"+group_id+"/"+pic_id+".jpg",
                        file_name =link.eq(1).text() + ".jpg",
                        down_url = big_pic + "#name=" + file_name + "&image=" + pic_src + "&content-type=image/jpeg",
                        btns = $('<div class="lbConTxt"><a class="left">预览</a><a class="right" href="'+down_url+'" download="'+file_name+'">下载</a></div>');

                    // replace the small pics with mid pics
                    self.find("img").attr("src",mid_pic);
                    link.removeAttr("href");
                    //link.attr("href",mid_pic).attr("data-lightview-options","width:640,height:480").addClass("lightview");
                    self.append(btns);

                    self.click(function(e){
                        if(e.srcElement.className == "right"){
                            return;
                        }

                        Lightview.show({
                            url:mid_pic,
                            type:"image",
                            options:{
                                viewport:false,
                                width:640,
                                height:480,
                                effects:false
                            }
                        });
                    });
                }