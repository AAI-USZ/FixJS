function (properties, durationMs, linearity, callback, delayMs) {
			  // @cond debug if (!properties || typeof properties == 'string') error('First parameter must be a map of properties (e.g. "{top: 0, left: 0}") ');
			  // @cond debug if (callback || typeof callback == 'function') error('Fourth is optional, but if set it must be a callback function.');
			  // @cond debug var colorRegexp = /^(rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)|#\w{3}|#\w{6})\s*$/i;
				function toNumWithoutUnit(v) {
					return parseFloat(toString(v).replace(/[^0-9]+$/, ''));
				}
				function findUnit(v) {
					return toString(v).replace(/^([+-]=)?-?[0-9. ]+\s*/, ' ').replace(/^ $/, '');
				}
				if (delayMs)
					window.setTimeout(function(){list['animate'](properties, durationMs, linearity, callback);}, delayMs);
				else {
					durationMs = durationMs || 500;
					linearity = Math.max(0, Math.min(1, linearity || 0));
					var initState = []; // for each item contains a map {s:{}, e:{}, o} s/e are property name -> startValue of start/end. The item is in o.
					eachlist(function(li) {
						var p = {o:MINI(li), s:{}, e:{}, u:{}}; 
						each(properties, function(name) {
							var dest = properties[name];
							var components = getNameComponents(name), len=components.length-1;
							var a = li;
							for (var j = 0; j < len; j++) 
								a = a[components[j]];
							p.s[name] = ((/^@/.test(name)) ? li.getAttribute(name.substr(1)) : a[components[len]]) || 0;
							p.e[name] = /^[+-]=/.test(dest) ?
								toNumWithoutUnit(p.s[name]) + toNumWithoutUnit(dest.substr(2)) * (dest.charAt(0)=='-' ? -1 : 1) + findUnit(dest) 
								: dest;
							// @cond debug if (!colorRegexp.test(dest) && isNan(toNumWithoutUnit(dest))) error('End value of "'+name+'" is neither color nor number: ' + toString(dest));
							// @cond debug if (!colorRegexp.test(p.s[name]) && isNan(toNumWithoutUnit(p.s[name]))) error('Start value of "'+name+'" is neither color nor number: ' + toString(p.s[name]));
							// @cond debug if (colorRegexp.test(dest) && !colorRegexp.test(p.s[name])) error('End value of "'+name+'" looks like a color, but start value does not: ' + toString(p.s[name]));
							// @cond debug if (colorRegexp.test(p.s[name]) && !colorRegexp.test(dest)) error('Start value of "'+name+'" looks like a color, but end value does not: ' + toString(dest));
						});
						initState.push(p);
					});

					function interpolate(startValue, endValue, t) {
						var c = (endValue - startValue)*t*t/(durationMs*durationMs);
						return startValue + 
						  linearity * t/durationMs * (endValue - startValue) +   // linear equation
						  (1-linearity) * (3*c - 2*c*t/durationMs);              // bilinear equation
					}
					function getColorComponent(colorCode, index) {
						return (/^#/.test(colorCode)) ?
							parseInt(colorCode.length > 6 ? colorCode.substr(1+index*2, 2) : ((colorCode=colorCode.charAt(1+index))+colorCode), 16)
							:
							parseInt(colorCode.replace(/[^\d,]+/g, '').split(',')[index]);
					}

					runAnimation(function(timePassedMs, stop) {
						if (timePassedMs >= durationMs || timePassedMs < 0) {
							each(initState, function(isi) {
								isi.o.set(isi.e);
							});
							stop();
							if (callback) 
								callback(list);
						}
						else
							each(initState, function(isi) {
								each(isi.s, function(name, start) {
									var newValue= 'rgb(', end=isi.e[name];
									if (/^#|rgb\(/.test(end)) { // color in format '#rgb' or '#rrggbb' or 'rgb(r,g,b)'?
										for (var i = 0; i < 3; i++) 
											newValue += Math.round(interpolate(getColorComponent(start, i), getColorComponent(end, i), timePassedMs)) + (i < 2 ? ',' : ')');
									}
									else 
										newValue = interpolate(toNumWithoutUnit(start), toNumWithoutUnit(end), timePassedMs) + findUnit(end);
									isi.o.set(name, newValue);
								});
							});
					});
				}
				return list;		
			}