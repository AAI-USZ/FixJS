function(child){
				var isSelected = array.some(val, function(v){
					return child.option && (v === child.option.value);
				});
				domClass.toggle(child.domNode, this.baseClass.replace(/\s+|$/g, "SelectedOption "), isSelected);
				child.domNode.setAttribute("aria-selected", isSelected ? "true" : "false");
			}