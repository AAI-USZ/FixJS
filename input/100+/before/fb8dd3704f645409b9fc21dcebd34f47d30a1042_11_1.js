function() {
			// Create the window and a background to dim the current view
			var optionsWindow = this._optionsWindow = UI.createWindow(),
				dimmingView = UI.createView({
					backgroundColor: "black",
					opacity: 0,
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				}),
				optionsDialog = UI.createView({
					width: "100%",
					height: UI.SIZE,
					bottom: 0,
					backgroundColor: "white",
					layout: "vertical",
					opacity: 0
				});

			optionsWindow.add(dimmingView);
			optionsWindow.add(optionsDialog);

			// Add the title
			optionsDialog.add(UI.createLabel({
				text: Locale._getString(this.titleid, this.title),
				font: {fontWeight: "bold"},
				left: 5,
				right: 5,
				top: 5,
				height: UI.SIZE,
				textAlign: UI.TEXT_ALIGNMENT_CENTER
			}));

			// Create buttons
			require.is(this.options, "Array") && this.options.forEach(function(opt, i, arr) {
				var button = UI.createButton({
					left: 5,
					right: 5,
					top: 5,
					bottom: i === arr.length - 1 ? 5 : 0,
					height: UI.SIZE,
					title: opt,
					index: i
				});
				if (i === this.destructive) {
					css.add(button.domNode, "TiUIElementGradientDestructive");
				} else if (i === this.cancel) {
					css.add(button.domNode, "TiUIElementGradientCancel");
				}
				optionsDialog.add(button);
				button.addEventListener("singletap", lang.hitch(this, function(){
					optionsWindow.close();
					this._optionsWindow = void 0;
					this.fireEvent("click", {
						index: i,
						cancel: this.cancel,
						destructive: this.destructive
					});
				}));
			}, this);

			// Animate the background after waiting for the first layout to occur
			optionsWindow.addEventListener("postlayout", function() {
				optionsDialog.animate({
					bottom: -optionsDialog._measuredHeight,
					opacity: 1,
					duration: 0
				});
				dimmingView.animate({
					opacity: 0.5,
					duration: 150
				}, function(){
					optionsDialog.animate({
						bottom: 0,
						duration: 150
					});
				});
			});

			// Show the options dialog
			optionsWindow.open();
		}