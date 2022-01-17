function(args) {
			
			var contentContainer = this._contentContainer = UI.createView({
				width: UI.INHERIT,
				height: UI.INHERIT,
				layout: "vertical",
				borderColor: "transparent"
			});
			contentContainer._forceInheritenceToFillOrSize = true;
			this._add(contentContainer);
			
			contentContainer._add(this._switchTitle = UI.createLabel({
				width: UI.INHERIT,
				height: UI.INHERIT,
				verticalAlign: UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
				textAlign: UI.TEXT_ALIGNMENT_CENTER
			}));
			this._switchTitle._forceInheritenceToFillOrSize = true;
			
			contentContainer._add(this._switchIndicator = UI.createView({
				width: 40,
				height: 10,
				borderRadius: 4,
				borderWidth: 1,
				borderColor: "#888"
			}));
			
			// Set the default look
			this._setDefaultLook();
			var self = this;
			self.addEventListener("singletap",function(){
				self.value = !self.value;
			});
			
			this.value = false;
		}