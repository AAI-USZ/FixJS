function(err) {
			err.message += " in '" + (this.sourceFile || '<unknown>') + "'";
			if (typeof this.sourceLine != 'undefined') {
				err.message += ' on line ' + this.sourceLine;
			}
			
			return err;
		}