function(err) {
			var current = "in '" + (this.sourceFile || '<unknown>') + "'";
			
			if (typeof this.sourceLine != 'undefined') {
				current += ' on line ' + this.sourceLine;
			}
			
			if (typeof err.istStack === 'undefined') {
				err.message += " " + current
				err.istStack = [];
			}
			
			err.istStack.push(current);
			
			return err;
		}