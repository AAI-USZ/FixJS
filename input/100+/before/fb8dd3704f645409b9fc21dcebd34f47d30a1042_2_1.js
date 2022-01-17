function(e) {
			if (!showingError) {
				showingError = 1;

				var f = e.filename || "",
					match = f.match(/:\/\/.+(\/.*)/),
					filename = match ? match[1] : e.filename,
					line = e.lineno,
					win = UI.createWindow({
						backgroundColor: "#f00",
						top: "100%",
						height: "100%",
						layout: "vertical"
					}),
					view,
					button;

				function makeLabel(text, height, color, fontSize) {
					win.add(UI.createLabel({
						color: color,
						font: { fontSize: fontSize, fontWeight: "bold" },
						height: height,
						left: 10,
						right: 10,
						textAlign: UI.TEXT_ALIGNMENT_CENTER,
						text: text
					}));
				}

				makeLabel("Application Error", "15%", "#0f0", "24pt");
				makeLabel((e.message || "Unknown error").trim() + (filename && filename !== "undefined" ? " at " + filename : "") + (line ? " (line " + line + ")" : ""), "45%", "#fff", "16pt");

				win.add(view = UI.createView({ height: "12%" }));
				view.add(button = UI.createButton({ title: "Dismiss" }));
				win.addEventListener("close", function() { win.destroy(); });
				button.addEventListener("singletap", function() {
					win.animate({
						duration: 500,
						top: "100%"
					}, function() {
						win.close();
						showingError = 0;
					});
				});

				makeLabel("Error messages will only be displayed during development. When your app is packaged for final distribution, no error screen will appear. Test your code!", "28%", "#000", "10pt");
				
				on.once(win,"postlayout", function() {
					setTimeout(function() {
						win.animate({
							duration: 500,
							top: 0
						}, function() {
							win.top = 0;
							win.height = "100%";
						});
					}, 100);
				});
				
				win.open();
			}
		}