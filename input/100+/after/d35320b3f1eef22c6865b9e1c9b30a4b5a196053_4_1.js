function (element, params) {
		var style = element.style;
		if (HTMLArea.isIEBeforeIE9) {
			style.styleFloat = "";
		} else {
			style.cssFloat = "";
		}
		style.textAlign = "";
		for (var i in params) {
			if (params.hasOwnProperty(i)) {
				var val = params[i];
				switch (i) {
				    case "f_st_backgroundColor":
				    	if (/\S/.test(val)) {
				    		style.backgroundColor = ((val.charAt(0) === '#') ? '' : '#') + val;
				    	} else {
				    		style.backgroundColor = '';
				    	}
					break;
				    case "f_st_color":
				    	if (/\S/.test(val)) {
				    		style.color = ((val.charAt(0) === '#') ? '' : '#') + val;
				    	} else {
				    		style.color = '';
				    	}
					break;
				    case "f_st_backgroundImage":
					if (/\S/.test(val)) {
						style.backgroundImage = "url(" + val + ")";
					} else {
						style.backgroundImage = "";
					}
					break;
				    case "f_st_borderWidth":
					if (/\S/.test(val)) {
						style.borderWidth = val + "px";
					} else {
						style.borderWidth = "";
					}
					if (params.f_st_borderStyle == "none") style.borderWidth = "0px";
					if (params.f_st_borderStyle == "not set") style.borderWidth = "";
					break;
				    case "f_st_borderStyle":
					style.borderStyle = (val != "not set") ? val : "";
					break;
				    case "f_st_borderColor":
				    	if (/\S/.test(val)) {
				    		style.borderColor = ((val.charAt(0) === '#') ? '' : '#') + val;
					} else {
						style.borderColor = '';
					}
					if (params.f_st_borderStyle === 'none') {
						style.borderColor = '';
					}
					break;
				    case "f_st_borderCollapse":
					style.borderCollapse = (val !== 'not set') ? val : '';
					if (params.f_st_borderStyle === 'none') {
						style.borderCollapse = '';
					}
					break;
				    case "f_st_width":
					if (/\S/.test(val)) {
						style.width = val + params.f_st_widthUnit;
					} else {
						style.width = "";
					}
					break;
				    case "f_st_height":
					if (/\S/.test(val)) {
						style.height = val + params.f_st_heightUnit;
					} else {
						style.height = "";
					}
					break;
				    case "f_st_textAlign":
					style.textAlign = (val != "not set") ? val : "";
					break;
				    case "f_st_vertAlign":
					style.verticalAlign = (val != "not set") ? val : "";
					break;
				}
			}
		}
	}