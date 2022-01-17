function(evt){
				var button = registry.getEnclosingWidget(evt.target),
					page = button.page;
				if(button != this.containerNode && !button.disabled){
					for(var target = evt.target; target !== this.containerNode; target = target.parentNode){
						if(domClass.contains(target, this.buttonWidgetCloseClass)){
							this.onCloseButtonClick(button);
							break;
						}else if(domClass.contains(target, this.buttonWidgetClass)){
							this.onButtonClick(button);
							break;
						}
					}
				}
			}