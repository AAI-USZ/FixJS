function(evt,x,y){
							var b = that.bar.getBBox();
							if(! that.bar.isPointInside(x-ofsetX, y - ofsetY)){
								that.bar.animate({y: paper.height*.95, opacity: invisible}, that.animationTime);
								that.triangle1.animate({opacity: visible}, that.animationTime);
								that.triangle2.animate({opacity: visible}, that.animationTime);
								$.each(that.groups, function(){
									this.graphic.animate({opacity: that.invisible}, that.animationTime).hide();
									$.each(this.buttons, function(){
										this.graphic[0].animate({opacity: invisible}, that.animationTime).hide();
										this.graphic[1].animate({opacity: invisible}, that.animationTime).hide();
										this.graphic[2].hide();
									});
								});
								$.each(that.separators, function(){
								this.animate({opacity: invisible}, that.animationTime).hide();
							});
							}
						}