function(type, paint) {
	// make a copy
	var p = new $.jGraduate.Paint(paint);
	this.setPaintOpacity(type, p.alpha/100, true);
	// now set the current paint object
	cur_properties[type + '_paint'] = p;
	switch ( p.type ) {
		case "solidColor":
		  
			if (p.solidColor != "none" && p.solidColor != "#none") {
			  this.setColor(type, "#"+p.solidColor)
			}
			else {
			  this.setColor(type, "none");
			  var selector = (type == "fill") ? "#fill_color rect" : "#stroke_color rect" 
			  document.querySelector(selector).setAttribute('fill', 'none');
			}
			break;
		case "linearGradient":
		case "radialGradient":
			canvas[type + 'Grad'] = p[p.type];
			setGradient(type);
			break;
		default:
//			console.log("none!");
	}
}