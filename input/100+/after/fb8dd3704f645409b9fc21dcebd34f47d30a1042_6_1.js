function() {
			// Create the window and a background to dim the current view
			var alertWindow = this._alertWindow = UI.createWindow(),
				dimmingView = UI.createView({
					backgroundColor: "black",
					opacity: 0,
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				}),
				alertDialog = UI.createView({
					backgroundColor: "white",
					borderRadius: 3,
					height: UI.SIZE,
					layout: UI._LAYOUT_CONSTRAINING_VERTICAL,
					opacity: 0,
					width: "50%"
				}),
				buttons = this.buttonNames || [];

			alertWindow.add(dimmingView);
			alertWindow.add(alertDialog);

			// Add the title
			alertDialog.add(UI.createLabel({
				text: Locale._getString(this.titleid, this.title),
				font: {fontWeight: "bold"},
				left: 5,
				right: 5,
				top: 5,
				height: UI.SIZE,
				textAlign: UI.TEXT_ALIGNMENT_CENTER
			}));

			// Add the message
			alertDialog.add(UI.createLabel({
				text: Locale._getString(this.messageid, this.message),
				left: 5,
				right: 5,
				top: 5,
				height: UI.SIZE,
				textAlign: UI.TEXT_ALIGNMENT_CENTER
			}));

			buttons.length || buttons.push(Locale._getString(this.okid, this.ok || "OK"));

			buttons.forEach(function(title, i) {
				var button = UI.createButton({
					left: 5,
					right: 5,
					top: 5,
					bottom: i === buttons.length - 1 ? 5 : 0,
					height: UI.SIZE,
					title: title,
					index: i
				});
				i === this.cancel && css.add(button.domNode, "TiUIElementGradientCancel");
				alertDialog.add(button);
				button.addEventListener("singletap", lang.hitch(this, function(){
					alertWindow.close();
					this._alertWindow = void 0;
					this.fireEvent("click", {
						index: i,
						cancel: this.cancel === i
					});
				}));
			}, this);

			// Animate the background after waiting for the first layout to occur
			dimmingView.addEventListener("postlayout", function() {
				setTimeout(function(){ // We have to wait for the entire layout pass to complete and the CSS rules to be applied.
					dimmingView.animate({
						opacity: 0.5,
						duration: 200
					}, function(){
						alertDialog.animate({
							opacity: 1,
							duration: 200
						});
					});	
				}, 0);
			});

			// Show the alert dialog
			alertWindow.open();
		}