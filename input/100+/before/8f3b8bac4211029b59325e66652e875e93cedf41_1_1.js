function(){
			// summary:
			//		Initialization
			// tags:
			//		private

			this.selection={};
			this.anchor = null;

			this.tree.domNode.setAttribute("aria-multiselectable", !this.singular);

			if(!this.cookieName && this.tree.id){
				this.cookieName = this.tree.id + "SaveSelectedCookie";
			}

			this.events.push(
				on(this.tree.domNode, touch.press, lang.hitch(this,"onMouseDown")),
				on(this.tree.domNode, touch.release, lang.hitch(this,"onMouseUp")),
				on(this.tree.domNode, touch.move, lang.hitch(this,"onMouseMove"))
			);
		}