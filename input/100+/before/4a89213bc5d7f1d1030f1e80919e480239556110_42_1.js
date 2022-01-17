function(){
			this.inherited(arguments);
			this.textbox.removeAttribute('incremental'); // only want onsearch to fire for ENTER and cancel
			if(!this.textbox.hasAttribute('results')){
				this.textbox.setAttribute('results', '0'); // enables webkit search decoration
			}
			if(has('iphone') < 5){
				domClass.add(this.domNode, 'iphone4'); // cannot click cancel button after focus so just remove it
				this.connect(this.textbox, "onfocus", // if value changes between start of onfocus to end, then it was a cancel
					function(){
						if(this.textbox.value !== ''){
							setTimeout(lang.hitch(this,
								function(){
									if(this.textbox.value === ''){
										this._onInput({ charOrCode: keys.ENTER }); // emulate onsearch
									}
								}), 
								0
							);
						}
					}
				);
			}
			this.connect(this.textbox, "onsearch",
				function(){
					this._onInput({ charOrCode: keys.ENTER });
				}
			);
		}