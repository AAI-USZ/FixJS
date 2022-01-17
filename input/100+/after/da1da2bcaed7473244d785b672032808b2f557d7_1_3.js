function createBar(x, y, width, height){
					var that = this;
					
					this.bar = paper.rect(x, y, width, height).
						attr({fill:"grey", opacity: this.invisible})
						.mouseover(function(){
							console.log("over");
							that.bar.animate({y: paper.height*.85, opacity: visible},that.animationTime);
							that.triangle1.animate({opacity: invisible}, that.animationTime);
							that.triangle2.animate({opacity: invisible}, that.animationTime);
							$.each(that.groups, function(){
								if(this.isVisible){
									this.graphic.show().animate({opacity: visible}, that.animationTime);
									$.each(this.buttons, function(){
										if(this.isVisible){
											this.graphic[0].show().animate({opacity: visible}, that.animationTime);
											this.graphic[1].show().animate({opacity: visible}, that.animationTime);
											this.graphic[2].show();
										}
									});
								}
							});
							$.each(that.separators, function(){
								this.show().animate({opacity: visible}, that.animationTime);
							});
							return this;
						})
						.mouseout(function(evt,x,y){
							console.log("over");
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
							return this;
						})
						;

				}