function(el, steps, duration) {
				if (!animations[steps]) {
					var name = 'spin' + steps;
					var rule = '@-webkit-keyframes '+ name +' {';
					for (var i=0; i < steps; i++) {
						var p1 = Math.round(100000 / steps * i) / 1000;
						var p2 = Math.round(100000 / steps * (i+1) - 1) / 1000;
						var value = '% { -webkit-transform:rotate(' + Math.round(360 / steps * i) + 'deg); }\n';
						rule += p1 + value + p2 + value; 
					}
					rule += '100% { -webkit-transform:rotate(100deg); }\n}';
					document.styleSheets[0].insertRule(rule);
					animations[steps] = name;
				}
				el.css('-webkit-animation', animations[steps] + ' ' + duration +'s linear infinite');
			}