function discover(o) {
			var node = f.createElement({style:{margin: "28px 17px"}});
			f(o).notExists() &&  (o = 'null');
			if (f(o).isString() || f(o).isNumber()) {
				node.setHTML(o);
			} else {
				var v = o && o.toString ? o.toString() : o, innerHTML = "";
				f(o).isArray() && (v = "[]");
				f(o).isObject() && (v = "{}");
				node.setHTML(
					f()("<div style='clear:left; line-height: 18px;'>")
					 ("<div style='color: #9b1a00; overflow: hidden; width: 324px; float: left;'>")
						("<span style='padding-left: 18px;'>source</span>")
					 ("</div>")
					 ("<div style='padding-left: 324px;'><xmp> ")(v)("\n</xmp></div>")
					 ("</div>")()
				);
				try {
					for (var p in o) {
						try {
							v = o[p] != null ? o[p] : '""';
						} catch(e) {
							v = "Can't access !!!";
						}
						if (f(v).isObject()) {
							childObject.push(v);
							innerHTML = f()("<div style='width: 324px; overflow: hidden; float: left;'>")
												("<span style='margin-right: 6px;'>[+]</span>")
												("<span style='color: #9b1a00; cursor: pointer;' onclick='")(F_NAME)('.callFunction("viewChild")(this, ')(childObject.length - 1)(")'> ")(p)("</span>")
											("</div>")
											("<div style='margin-left: 324px;'><xmp>Object {...}</xmp></div>")
											("<div style='margin-left: 49px; display: none;'></div>")();
						} else {
							v = v.toString ? v.toString() : v;
							innerHTML = f()("<div style='width: 324px; overflow: hidden; float: left;'>")
												("<span style='margin: 0px 12px 0px 8px;'>-</span>")
												("<span style='color: #9b1a00'> ")(p)("</span>")
											("</div>")
											("<div style='margin-left: 324px;'><xmp> ")(v)("\n</xmp></div>")();
						}
						
						node.addChild(
							f.createElement({
								style: "clear:left; line-height: 18px;",
								innerHTML: innerHTML
							})
						);
					}
				} catch(e) {
					node.setHTML("Can't access !!!");
				}
			}
			return node;
		}