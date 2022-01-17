function() {
	var ratio = buildingblocks.Canvas.Configuration.ratio;
	var width = buildingblocks.Canvas.Configuration.effective_width;
	var height = buildingblocks.Canvas.Configuration.effective_height;
	var band_height = buildingblocks.Canvas.Configuration.band_height;
	var band_width = buildingblocks.Canvas.Configuration.band_width;
	buildingblocks.Canvas.Context.clearRect(band_width,band_height,width,height);
	var lambda_converter = (function() {
		return { Size : function(s) {
			return { width : s.width / 100 * width, height : s.height / 100 * height};
		}, Position : function(p) {
			return { x : p.x / 100 * width, y : p.y / 100 * height + band_height};
		}};
	})();
	var $it0 = buildingblocks.Canvas.Images.iterator();
	while( $it0.hasNext() ) {
		var image = $it0.next();
		if(image.visible_flag == false) return;
		image.Frame();
		var source_position = image.Jsonify().source_position;
		var source_size = image.Jsonify().source_size;
		var position = lambda_converter.Position(image.Jsonify().position);
		var size = lambda_converter.Size(image.Jsonify().size);
		var skew = { cos : Math.cos(image.Jsonify().angle), sin : Math.sin(image.Jsonify().angle)};
		var center = { x : position.x + size.width / 2, y : position.y + size.height / 2};
		var shift = { x : (1 - skew.cos) * center.x - skew.sin * center.y, y : skew.sin * center.x + (1 - skew.cos) * center.y};
		buildingblocks.Canvas.Context.rotate(image.Jsonify().angle);
		buildingblocks.Canvas.Context.translate(-shift.x,-shift.y);
		buildingblocks.Canvas.Context.drawImage(image.Source(),source_position.x,source_position.y,source_size.width,source_size.height,position.x,position.y,size.width,size.height);
		buildingblocks.Canvas.Context.restore();
		buildingblocks.Canvas.Context.setTransform(1,0,0,1,0,0);
	}
	var $it1 = buildingblocks.Canvas.Texts.iterator();
	while( $it1.hasNext() ) {
		var text = $it1.next();
		if(text.visible_flag == false) return;
		var t = text.Jsonify().raw_text;
		var p = lambda_converter.Position(text.Jsonify().position);
		var size = { width : buildingblocks.Canvas.Context.measureText(t).width, height : text.Jsonify().text_size};
		var a = { cos : Math.cos(text.Jsonify().angle), sin : Math.sin(text.Jsonify().angle)};
		var center = { x : p.x + size.width / 2, y : p.y + size.height / 2};
		var shift = { x : (1 - a.cos) * center.x - a.sin * center.y, y : a.sin * center.x + (1 - a.cos) * center.y};
		buildingblocks.Canvas.Context.rotate(text.Jsonify().angle);
		buildingblocks.Canvas.Context.translate(-shift.x,-shift.y);
		buildingblocks.Canvas.Context.textAlign = text.Jsonify().align;
		buildingblocks.Canvas.Context.textBaseline = text.Jsonify().baseline;
		buildingblocks.Canvas.Context.fillStyle = text.Jsonify().text_color;
		buildingblocks.Canvas.Context.strokeStyle = text.Jsonify().outline_color;
		buildingblocks.Canvas.Context.font = text.Jsonify().text_size + "px " + text.Jsonify().text_font;
		buildingblocks.Canvas.Context.fillText(t,p.x,p.y);
		buildingblocks.Canvas.Context.strokeText(t,p.x,p.y);
		buildingblocks.Canvas.Context.setTransform(1,0,0,1,0,0);
		buildingblocks.Canvas.Context.restore();
	}
	buildingblocks.Canvas.Context.fillStyle = "black";
	buildingblocks.Canvas.Context.fillRect(0,0,width,band_height);
	buildingblocks.Canvas.Context.fillRect(0,buildingblocks.Canvas.Configuration.height - band_height,width,band_height);
	buildingblocks.Canvas.Context.fillRect(0,0,band_width,height);
	buildingblocks.Canvas.Context.fillRect(buildingblocks.Canvas.Configuration.width - band_width,0,band_width,height);
}