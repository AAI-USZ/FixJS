function(){
                            // FIXME duped above 
                            var highest = 0;
                            $(this).parent().find("."+dt.class_prefix+"cell").each(function(){
                                var thisheight = $(this).height() + dt.get_extras(this);
                                if (thisheight > highest){
                                    highest = thisheight;
                                }
                            });

                            $(this).css("height", highest);
                            $(this).css("min-height", highest);
                        }