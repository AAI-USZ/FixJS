function hasStyleIndent(n) {

							n = dom.getParent(n, dom.isBlock);

							return n && (parseInt(ed.dom.getStyle(n, 'margin-left') || 0, 10) + parseInt(ed.dom.getStyle(n, 'padding-left') || 0, 10)) > 0;

						}