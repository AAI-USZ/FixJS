function() {
			var self = this,
				clickEventName = "ontouchstart" in window ? "touchend" : "click",
				upArrow = this._upArrow = dom.create("div", {
					className: "TiUIElementGradient",
					style: {
						textAlign: "center",
						position: "absolute",
						top: "0px",
						height: "40px",
						width: "100%",
						borderBottom: "1px solid #666",
						fontSize: "28px",
						cursor: "pointer"
					},
					innerHTML: "\u2227"
				}, this.domNode);
			on(upArrow, clickEventName, function(){
				var nextRow = self._rows.indexOf(self.selectedRow);
				if (nextRow > 0) {
					self.selectedRow = self._rows[nextRow - 1];
				} else {
					self.selectedRow = self._rows[self._rows.length - 1];
				}
			});
			
			var titleContainer = this._titleContainer = dom.create("div", {
				style: {
					position: "absolute",
					top: "50%",
					height: "1em",
					width: "100%",
					marginTop: "-0.5em",
					textAlign: "center"
				}
			}, this.domNode);
			this._addStyleableDomNode(titleContainer);
			
			var titleClickArea = dom.create("div", {
				style: {
					position: "absolute",
					top: "40px",
					bottom: "40px",
					width: "100%"
				}
			}, this.domNode);
			on(titleClickArea, clickEventName, function() {
				// Create the window and a background to dim the current view
				var listWindow = UI.createWindow();
				var dimmingView = UI.createView({
					backgroundColor: "black",
					opacity: 0,
					left: 0,
					top: 0,
					right: 0,
					bottom: 0
				});
				listWindow.add(dimmingView);
				
				// Create the list dialog itself
				var listDialog = UI.createView({
					width: "75%",
					height: UI.SIZE,
					backgroundColor: "white",
					layout: "vertical",
					borderRadius: 3,
					opacity: 0
				});
				listWindow.add(listDialog);
				
				// Create the table rows
				var rows = self._rows,
					data = [],
					selectedRowIndex = 0;
				for(var i in rows) {
					var row = rows[i],
						isSelectedRow = row === self.selectedRow;
					data.push({
						title: row.title,
						hasCheck: isSelectedRow
					});
					isSelectedRow && (selectedRowIndex = parseInt(i));
				}
				
				// Add the table to the dialog
				var listTable = UI.createTableView({
					left: 5,
					right: 5,
					top: 5,
					height: data.length < 10 ? UI.SIZE : "70%",
					data: data
				});
				listDialog.add(listTable);
				listTable.addEventListener("singletap", function(e) {
					e.index in self._rows && (self.selectedRow = self._rows[e.index]);
					listWindow.close();
				});
				
				// Add a cancel button
				var cancelButton = UI.createButton({
					left: 5,
					top: 5,
					right: 5,
					title: "Cancel"
				});
				listDialog.add(cancelButton);
				cancelButton.addEventListener("singletap", function() {
					listWindow.close();
				});
				
				// Add a view to handle padding since there is no TI API to do it
				listDialog.add(UI.createView({ height: "5px" }));
				
				// Show the options dialog
				listWindow.open();
				
				// Animate the background after waiting for the first layout to occur
				setTimeout(function(){
					dimmingView.animate({
						opacity: 0.5,
						duration: 200
					}, function(){
						listDialog.animate({
							opacity: 1,
							duration: 200
						}, function() {
							listTable.scrollToIndex(selectedRowIndex);
						});
					});
				},30);
			});
			
			var downArrow = this._downArrow = dom.create("div", {
				className: "TiUIElementGradient",
				style: {
					textAlign: "center",
					position: "absolute",
					bottom: "0px",
					height: "40px",
					width: "100%",
					borderTop: "1px solid #666",
					fontSize: "28px",
						cursor: "pointer"
				}
			}, this.domNode);
			downArrow.innerHTML = "\u2228";
			on(downArrow, clickEventName, function() {
				var nextRow = self._rows.indexOf(self.selectedRow);
				if (nextRow < self._rows.length - 1) {
					self.selectedRow = self._rows[nextRow + 1];
				} else {
					self.selectedRow = self._rows[0];
				}
			});
			this._rows = [];
		}