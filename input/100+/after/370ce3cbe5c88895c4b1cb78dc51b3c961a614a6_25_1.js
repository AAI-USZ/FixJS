function(){
				var scaler = new LinearScaler({
					majorTickInterval: 25,
					minorTickInterval: 5
				});
				this.addElement("background", lang.hitch(this, this.drawBackground));
				var scale = new CircularScale();
				scale.set("scaler", scaler);
				scale.set("originX", 131);
				scale.set("originY", 149.5);
				scale.set("radius", 108.66756);
				scale.set("startAngle", -136);
				scale.set("endAngle", -43);
				scale.set("orientation", "clockwise");
				scale.set("labelGap", 2);
				scale.set("font", {
					family: "Helvetica",
					weight: "bold",
					size: "10pt"
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