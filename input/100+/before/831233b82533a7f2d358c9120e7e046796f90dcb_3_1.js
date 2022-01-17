function (selector, selectorConfig) {
					if ( obj.is(selector) ) {
						configSpecified = true;
						if (selectorConfig instanceof Array) {
							configObj = [];
							configObj = jQuery.merge(configObj, selectorConfig);
						} else if (typeof selectorConfig === "object") {
							configObj = {};
							for (var k in selectorConfig) {
								if ( selectorConfig.hasOwnProperty(k) ) {
									if (selectorConfig[k] instanceof Array) {

									} else if (typeof selectorConfig[k] === "object") {
										configObj[k] = {};
										configObj[k] = jQuery.extend(true, configObj[k], that.config[k], selectorConfig[k]);									
									} else {
										configObj[k] = selectorConfig[k];
									}
								}
							}
						} else {
							configObj = selectorConfig;
						}
					}
				}