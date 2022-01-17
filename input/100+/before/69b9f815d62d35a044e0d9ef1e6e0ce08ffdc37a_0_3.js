function(force, callback) {
			if(!this.isSideMenuEnabled()) return;
			if(this.menuAnimation) {
				this.menuAnimation.cancel();
			}
            var that = this;
            var menu = jq("#menu");
			var els = jq("#content, #menu, #header, #navbar");
			
            if (!(menu.hasClass("on") || menu.hasClass("to-on")) && ((force !== undefined && force !== false) || force === undefined)) {
				
				menu.show();
				$.asap(function(){
					that.menuAnimation = that.css3animate(els,{
						"removeClass":"to-off off on",
						"addClass":"to-on",
						callback:function(){
							that.menuAnimation = that.css3animate(els,{
								"removeClass":"to-off off to-on",
								"addClass":"on",
								time:0,
								callback:function(){
									that.scrollingDivs["menu_scroller"].enable();
									if(callback) callback();
								}
							});
						}
					});
				});	
            
            } else if (force === undefined || (force !== undefined && force === false)) {
				
                this.scrollingDivs["menu_scroller"].disable();
				that.menuAnimation = that.css3animate(els,{
					"removeClass":"on off to-on",
					"addClass":"to-off",
					callback:function(){
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
				});
            }
        }