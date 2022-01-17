function(args, node){
				var scaler = new LinearScaler();
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 132);
				scale.set("originY", 133.5);
				scale.set("radius", 100);
				scale.set("startAngle", 120);
				scale.set("endAngle", 60);
				scale.set("orientation", "clockwise");
				scale.set("labelGap", 6);
				scale.set("font", {
					family: "Helvetica",
					weight: "bold",
					size: "8pt"
				});
				this.addElement("scale", scale);
				var indicator = new CircularValueIndicator();
				indicator.set("interactionArea", "gauge");
				indicator.set("value", scaler.minimum);
				indicator.set("indicatorShapeFunc", lang.hitch(this, function(group, indicator){

					var l = indicator.scale.radius - 2;
					group.createPath().moveTo(-20, 0).lineTo(-20, -5).lineTo(l, 0).lineTo(-20, 5).closePath().setFill(this.indicatorColor);
					return group;

				}));
				scale.addIndicator("indicator", indicator);
				this.addElement("foreground", lang.hitch(this, this.drawForeground));
			}