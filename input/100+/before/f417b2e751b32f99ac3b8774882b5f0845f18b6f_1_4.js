function (properties, durationMs, linearity, callback, delayMs) {
				function toNumWithoutUnit(v) {
					return parseFloat(toString(v).replace(/[^0-9]+$/, ''));
				}
				function findUnit(v) {
					return toString(v).replace(/^([+-]=)?-?[0-9. ]+\s*/, ' ');
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
							// TODO: catch error cases, such as non-numeric values as start or stop
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