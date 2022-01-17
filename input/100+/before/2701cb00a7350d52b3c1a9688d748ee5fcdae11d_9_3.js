function(){
				if(!this.isListVisible){return false;}
				var that = this;
				var triggerChange = function(e){
					if(that.changedValue){
						$(that.input).trigger('change');
					}
					that.changedValue = false;
				};
				
				that.shadowList.removeClass('datalist-visible list-item-active');
				that.index = -1;
				that.isListVisible = false;
				if(that.changedValue){
					that.triggeredByDatalist = true;
					webshims.triggerInlineForm && webshims.triggerInlineForm(that.input, 'input');
					if(that.input == document.activeElement || $(that.input).is(':focus')){
						$(that.input).one('blur', triggerChange);
					} else {
						triggerChange();
					}
					that.triggeredByDatalist = false;
				}
				$(document).unbind('.datalist'+that.id);
				$(window)
					.unbind('.datalist'+that.id)
					.bind('resize.datalist'+that.id +' orientationchange.datalist '+that.id +' emchange.datalist'+that.id, function(){
						that.shadowList.css({top: 0, left: 0});
						$(window).unbind('.datalist'+that.id);
					})
				;
				return true;
			}