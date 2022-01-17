function(element, newStyle){
		
		
		var style = element._private.style;
		
		var newShape = element._private.style.shape.strValue;
		var oldShape = element.rscratch().oldShape;
		
		if( element.rscratch().svg == null ){
			$.error("SVG renderer can not update style for node `%s` since it has no SVG element", element.id());
			return;
		}
		
		if( oldShape != undefined && newShape != oldShape ){
			this.svgRemove(element.rscratch().svgGroup);
			this.makeSvgNode(element);
			return;
		}
			
		var visible = element.visible();

		// TODO add more as more styles are added
		// generic styles go here
		this.svg.change(element.rscratch().svg, {
			"pointer-events": "visible", // if visibility:hidden, no events
			fill: style["background-color"].strValue,
			fillOpacity: style["background-opacity"].strValue,
			stroke: style["border-width"].value > 0 ? style["border-color"].strValue : "none",
			strokeWidth: style["border-width"].value,
			strokeDashArray: lineStyle( style["border-style"].strValue ).array,
			strokeOpacity: style["border-opacity"].value,
			cursor: style["cursor"].strValue,
			"visibility": visible ? "visible" : "hidden",
		});
		
		this.svg.change(element.rscratch().svgGroup, {
			opacity: style["opacity"].value
		});
		
		// styles for label		
		var labelOptions = {
			"visibility": visible ? "visible" : "hidden",
			"pointer-events": "none",
			fill: style["color"].strValue,
			"font-family": style["font-family"].strValue,
			"font-weight": style["font-weight"].strValue,
			"font-style": style["font-style"].strValue,
			"text-decoration": style["text-decoration"].strValue,
			"font-variant": style["font-variant"].strValue,
			"font-size": style["font-size"].strValue,
			"text-rendering": "geometricPrecision"
		};
		
		this.svg.change(element.rscratch().svgLabelGroup, {
			opacity: style["text-opacity"].value
		});
		
		this.svg.change(element.rscratch().svgLabelOutline, {
			stroke: style["text-opacity"].value,
			strokeWidth: style["text-outline-width"].value * 2,
			fill: "none",
			opacity: style["text-opacity"].value
		});
		
		this.svg.change(element.rscratch().svgLabelOutline, labelOptions);
		this.svg.change(element.rscratch().svgLabel, labelOptions);
		
		var labelText = style["content"] ? style["content"].value : "";
		element.rscratch().svgLabel.textContent = labelText;
		element.rscratch().svgLabelOutline.textContent = labelText;
		
		var valign = style["text-valign"].strValue;
		var halign = style["text-halign"].strValue;
		
		// styles to the group
		this.svg.change(element.rscratch().svgGroup, {
			fillOpacity: style["opacity"].value
		});
		
		// update shape specific stuff like position
		nodeShape(style.shape.strValue).update(this.svg, this.nodesGroup, element, element.position(), style);
		
		// update label position after the node itself
		this.updateLabelPosition(element, valign, halign);	
		
	}