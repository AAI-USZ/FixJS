function(cm) {
				if(cm.getCursor(true).line != cm.getCursor().line) {
					// multiple lines selected
					CodeMirror.commands.indentMore(cm);
				} else if(!_this.introspect()) {
					console.log('indentAuto');
					CodeMirror.commands.indentAuto(cm);
				}
			}