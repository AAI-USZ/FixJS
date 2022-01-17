function(URL) {
					URL = URL.replace(/^(\s?href|\s?src)=['"]?/i,"").replace(/^\s*/,"");
					URL = URL.replace(/^url\(['"]*/i,"");
					URL = URL.replace(/^javascript\:[a-z0-9]+\(['"]/i,"");
					URL = URL.replace(/["'\)]$/i,"");
					URL = URL.split(/\s+/g).shift();

					if (URL.match(/^\s*#/)) {
						// Bookmark URL
						return false;
					}

					URL = URL.split("#").shift();

					if (URL.replace(/\s+/,"").length && protocolSupported(URL)) {
						if (!resources.reduce(function(prev,current) {
								return prev || current === URL;
							},false)) {

							resources.push(URL);
						}
					}
				}