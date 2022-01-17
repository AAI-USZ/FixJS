function(all, indent, name, args, text) {
			if (all) {
				var el, m;
				i = indent.length;
				while (i <= stack[0]) {
					stack.shift();
					
					parent = ("haml_done" in parent) ? parent.haml_done() : parent.parentNode;
				}

				if (name) {
					args = args ? JSON.parse(args) : {};
					el = El(name.replace(/^[^%]/,"%div$&").substr(1), args);
					if (text) el.append( text.replace(/'/g,"\\'") );
					if (m = name.match(/^%(\w+)/)) m[1] in custom && el.setAttribute("data-template", m[1]);
				} else {
					m = text.split(" ");
					switch (m[1]) {
						case "template":
							el = new template(m[2], parent).el;
						break;
						case "markdown":
							//TODO:2011-11-09:lauriro:Write markdown support for haml
						break;
						default:
							el = El.text( args ? all : text )
					}
				}

				!el._parent && parent.append(el);
				if (el.nodeType !== 3) {
					parent = el;
					stack.unshift(i)
				}
			}
			return "";
		}