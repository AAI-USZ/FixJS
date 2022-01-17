function(anim, callback) {
			if (UI._layoutInProgress) {
				on.once(UI,"postlayout", lang.hitch(this,function(){
					this._doAnimation(anim,callback);
				}));
			} else {
				this._doAnimation(anim,callback);
			}
		}