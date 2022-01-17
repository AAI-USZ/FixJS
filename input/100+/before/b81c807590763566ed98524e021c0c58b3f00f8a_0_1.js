function(e){

			//handle forms

			var tag =  e.target && e.target.tagName != undefined ? e.target.tagName.toLowerCase() : '';

			

			//this.log("click on "+tag);

			

            if (inputElements.indexOf(tag)!==-1 && (!this.isFocused || !e.target.isSameNode(this.focusedElement))) {



				var type =  e.target && e.target.type != undefined ? e.target.type.toLowerCase() : '';

				var autoBlur = autoBlurInputTypes.indexOf(type)!==-1;

				

				//focus

				if(!autoBlur) {

					//remove previous blur event if this keeps focus

					if(this.isFocused){

						this.focusedElement.removeEventListener('blur', this, false);

					}

					this.focusedElement = e.target;

					this.focusedElement.addEventListener('blur', this, false);

					//android bug workaround for UI

					if(!this.isFocused) {

						//this.log("enter edit mode");

						$.trigger(this, 'enter-edit', [e.target]);

					}

					this.isFocused = true;

				} else {

					this.isFocused=false;

				}

				this.allowDocumentScroll = true;

				

				//fire focus action

				if(requiresJSFocus){

					e.target.focus();

				}

				

				//BB10 needs to be preventDefault on touchstart and thus need manual blur on click

            } else if($.os.blackberry10 && this.isFocused) {

				//this.log("forcing blur on bb10 ");

				this.focusedElement.blur();

			}

		}