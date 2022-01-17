function(){
						that.menuAnimation = that.css3animate(els,{
							"removeClass":"to-off on to-on",
							"addClass":"off",
							time:0,
							callback:function(){
								menu.hide();
								if(callback) callback();
							}
						});
					}