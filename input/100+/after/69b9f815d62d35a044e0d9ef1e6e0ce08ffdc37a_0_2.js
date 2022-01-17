function(){
					that.css3animate(els,{
						"removeClass":"to-off off on",
						"addClass":"to-on",
						complete:function(canceled){
							if(!canceled){
	                            that.css3animate(els,{
									"removeClass":"to-off off to-on",
									"addClass":"on",
									time:0,
									complete:function(){
                                        that.togglingSideMenu = false;
										if(callback) callback(false);
									}
								});
							} else{
                                that.togglingSideMenu = false;
                                if(callback) callback(true);
                            }
						}
					});
				}