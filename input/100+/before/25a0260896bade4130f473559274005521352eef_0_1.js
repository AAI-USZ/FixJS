function(/*dijit._Widget*/ page, /*Integer?*/ insertIndex){
			// summary:
			//		Called whenever a page is added to the container.
			//		Create button corresponding to the page.
			// tags:
			//		private

			// create an instance of the button widget
			// (remove typeof buttonWidget == string support in 2.0)
			var cls = lang.isString(this.buttonWidget) ? lang.getObject(this.buttonWidget) : this.buttonWidget;
			var button = new cls({
				id: this.id + "_" + page.id,
				label: page.title,
				dir: page.dir,
				lang: page.lang,
				textDir: page.textDir,
				showLabel: page.showTitle,
				iconClass: page.iconClass,
				closeButton: page.closable,
				title: page.tooltip
			});
			button.focusNode.setAttribute("aria-selected", "false");


			// map from page attribute to corresponding tab button attribute
			var pageAttrList = ["title", "showTitle", "iconClass", "closable", "tooltip"],
				buttonAttrList = ["label", "showLabel", "iconClass", "closeButton", "title"];

			// watch() so events like page title changes are reflected in tab button
			this.pane2watches[page.id] = array.map(pageAttrList, function(pageAttr, idx){
				return page.watch(pageAttr, function(name, oldVal, newVal){
					button.set(buttonAttrList[idx], newVal);
				});
			});

			// connections so that clicking a tab button selects the corresponding page
			this.pane2connects[page.id] = [
				this.connect(button, 'onClick', lang.hitch(this,"onButtonClick", page)),
				this.connect(button, 'onClickCloseButton', lang.hitch(this,"onCloseButtonClick", page))
			];

			this.addChild(button, insertIndex);
			this.pane2button[page.id] = button;
			page.controlButton = button;	// this value might be overwritten if two tabs point to same container
			if(!this._currentChild){ // put the first child into the tab order
				button.focusNode.setAttribute("tabIndex", "0");
				button.focusNode.setAttribute("aria-selected", "true");
				this._currentChild = page;
			}
			// make sure all tabs have the same length
			if(!this.isLeftToRight() && has("ie") && this._rectifyRtlTabList){
				this._rectifyRtlTabList();
			}
		}