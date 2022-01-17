function( extra ) {// extra can be a number, shortcut for increasing-calling-decreasing
				if ( !this.multiline ) {
					return "";
				}
				var chr = this.indentChar;
				if ( this.HTML ) {
					chr = chr.replace( /\t/g, "   " ).replace( / /g, "&nbsp;" );
				}
				return new Array( this._depth_ + (extra||0) ).join(chr);
			}