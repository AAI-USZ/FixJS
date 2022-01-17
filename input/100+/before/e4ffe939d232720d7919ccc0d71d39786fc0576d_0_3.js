function () {
			var initelts = document.getElementsByTagName("script");
			var elts = [];
			var i, l;
			for (i = 0, l = initelts.length; i < l; i++) {
				elts[i] = initelts[i];
			}
			initelts = null;
			var res;
			for (i = 0, l = elts.length; i < l; i++) {
				if (elts[i].type === "text/xforms") {
					res = XsltForms_browser.transformText('<html xmlns="http://www.w3.org/1999/xhtml"><body>' + elts[i].text + '</body></html>', root + "xsltforms.xsl", false);
					var sp = XsltForms_globals.stringSplit(res, "XsltForms_MagicSeparator");
					var mainjs = "xsltforms_d0 = new Date(); /* xsltforms-mainform " + sp[1] + sp[2] + " xsltforms-mainform */ }";
					newelt = document.createElement("script");
					newelt.setAttribute("id", "xsltforms-generated-script");
					newelt.setAttribute("type", "text/javascript");
					if (XsltForms_browser.isIE) {
						newelt.text = mainjs;
					} else {
						var scripttxt = document.createTextNode(mainjs);
						newelt.appendChild(scripttxt);
					}
					document.getElementsByTagName("body")[0].appendChild(newelt);
					var subbody = "<!-- xsltforms-mainform " + sp[4] + " xsltforms-mainform -->";
					elts[i].outerHTML = subbody;
				}
			}		}
