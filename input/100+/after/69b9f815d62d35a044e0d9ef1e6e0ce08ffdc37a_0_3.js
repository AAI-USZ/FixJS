function(force, callback) {
			if(!this.isSideMenuEnabled() || this.togglingSideMenu) return;
            this.togglingSideMenu = true;

            var that = this;
            var menu = jq("#menu");
			var els = jq("#content, #menu, #header, #navbar");
			
            if (!(menu.hasClass("on") || menu.hasClass("to-on")) && ((force !== undefined && force !== false) || force === undefined)) {

				menu.show();
				$.asap(function(){
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
				});	
            
            } else if (force === undefined || (force !== undefined && force === false)) {


				that.css3animate(els,{
					"removeClass":"on off to-on",
					"addClass":"to-off",
					complete:function(canceled){
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
				});
            }
        }