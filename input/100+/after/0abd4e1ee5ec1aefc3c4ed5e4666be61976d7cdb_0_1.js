function (rule, inc) { //the inc parameter is a boolean, deciding whether to include all properties
		var css_array = rule.split(";"),
			rules = [];
		for (var r = 0; r < css_array.length; r++) {
			if ( !! ~css_array[r].indexOf(":")) {
				var rule = css_array[r].split(":");
				if (rule.length != 2) {
					return false;
				}
				var property = str_combo(rule[0]);
				var value = str_combo(rule[1]);
				var clean_rule = [property, value].join(":");
				var new_rules = [];

				if (inArray(property, prefixes01)) {
					//-moz, -webkit
					new_rules.push(_moz + clean_rule, _webkit + clean_rule);
				} else if (inArray(property, prefixes013)) {
					//-moz, -webkit, -ms
					new_rules.push(	_moz + clean_rule,
									_webkit + clean_rule,
									(property == "box-align" ? _ms + property + ":middle" : _ms + clean_rule));
				} else if (inArray(property, prefixes0123)) {
					//-moz, -webkit, -o, -ms
					//This includes all transition rules
					eachArray([0, 1, 2, 3], function (_r) {
						if (property == "transition") {
							var trans_prop = value.split(" ")[0];
							if (inArray(trans_prop, prefixed_rules)) {
								new_rules.push(prefix[_r] + clean_rule.replace(trans_prop, prefix[_r] + trans_prop));
							} else {
								new_rules.push(prefix[_r] + clean_rule);
							}

						} else if (property == "transition-property") {
							if (_r == 0) {
								//Only Firefox supports this at the moment
								var trans_props = value.split(",");
								var replaced_props = [];
								eachArray(trans_props, function (p) {
									var prop = str_combo(p);
									if (inArray(prop, prefixed_rules)) {
										replaced_props.push(prefix[_r] + prop);
									}
								});
								new_rules.push(prefix[_r] + property + ":" + replaced_props.join(","))
							}
						} else {
							new_rules.push(prefix[_r] + clean_rule)
						}
					});
				} else if (inArray(property, prefixesMisc)) {

					if (property == __background + "-clip") {
						if (value === "padding-box") {
							new_rules.push(	_webkit + clean_rule,
											_moz + property + ":padding");
						}
					} else {
						//Border-radius properties here ONLY
						var v = property.split("-");
						new_rules.push(	_moz + "border-radius-" + v[1] + v[2] + ":" + value,
										_webkit + clean_rule);
					}

				} else {
					switch (property) {
					case "display":
						if (value == "box") {
							eachArray([0, 1, 3], function (_r) {
								new_rules.push("display:" + prefix[_r] + value)
							});
						} else if (value == "inline-block") {
							new_rules.push(	"display:" + _moz + "inline-stack",
											"zoom:1;*display:inline");
						}
						break;
					case "text-overflow":
						if (value == "ellipsis") {
							new_rules.push(_opera + clean_rule);
						}
						break;
					case "opacity":
						var opacity = Math.round(value*100);
						new_rules.push(	_ms + "filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=" + opacity + ")",
										"filter: alpha(opacity=" + opacity + ")",
										_moz + clean_rule,
										_webkit + clean_rule);
						break;
					case __background + "-image":
					case __background + "-color":
					case __background:
						var lg = "linear-gradient";
						if ( !! ~value.indexOf(lg)) {
							var attributes = new RegExp(lg+"\\s?\\((.*)\\)","ig").exec(value);
							if(attributes[1]!=null){
								attributes = attributes[1];
								var prop = lg + "("+attributes+")";
								eachArray([0, 1, 2, 3], function (_r) {
									new_rules.push(property + ":" + prefix[_r] + prop);
								});
								var attributes_colors = attributes.match(/\#([a-z0-9]{3,})/g);
								if(attributes_colors && attributes_colors.length>1 && attributes_colors[attributes_colors.length-1]!=null){
									new_rules.push(ms_gradient.replace("{1}",attributes_colors[0]).replace("{2}",attributes_colors[attributes_colors.length-1]));
								}
							}
						} else if ( !! ~value.indexOf("rgba")) {
							//Color array
							var cA = value.match(/rgba\((.*?)\)/)[1].split(",");
							var hex = Math.floor(+(str_combo(cA[3])) * 255).toString(16) + rgb2hex(+str_combo(cA[0]), +str_combo(cA[1]), +str_combo(cA[2]));
							new_rules.push(ms_gradient.replace("{1}","#"+hex).replace("{2}","#"+hex)+";zoom:1");
						}
						break;
					default:
						if (inc != null) {
							new_rules.push(clean_rule);
						}
						break;
					}
				}
				if (new_rules.length) {
					rules.push(new_rules.join(";"));
				}
			}
		}
		return rules.length && rules.join(";");
	}