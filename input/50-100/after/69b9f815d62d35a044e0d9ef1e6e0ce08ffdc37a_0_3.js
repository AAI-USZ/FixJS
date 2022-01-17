function(canceled){
						if(!canceled){
	                        that.css3animate(els,{
								"removeClass":"to-off on to-on",
								"addClass":"off",
								time:0,
								complete:function(){
	                                menu.hide();
                                    that.togglingSideMenu = false;
									if(callback) callback(false);
								}
							});
						} else{
                            that.togglingSideMenu = false;
                            if(callback) callback(true);
                        }
					}