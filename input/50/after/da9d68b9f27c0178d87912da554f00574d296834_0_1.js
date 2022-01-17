function(cm) {
				if(cm.getCursor(true).line != cm.getCursor().line || !_this.introspect()) {
					CodeMirror.commands.indentMore(cm);
				}
			}