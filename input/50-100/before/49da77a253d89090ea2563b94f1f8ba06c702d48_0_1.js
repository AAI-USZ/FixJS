function(child){
				var isSelected = array.some(val, function(v){
					return child.option && (v === child.option.value);
				});
				domClass.toggle(child.domNode, this.baseClass + "SelectedOption", isSelected);
				child.domNode.setAttribute("aria-selected", isSelected ? "true" : "false");
			}