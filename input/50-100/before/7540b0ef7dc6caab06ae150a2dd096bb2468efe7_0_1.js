function() {
		// @see https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference:Global_Objects:Date
		function pad(n){return n<10 ? '0'+n : n}
		return this.getUTCFullYear()+'-'
		      + pad(this.getUTCMonth()+1)+'-'
		      + pad(this.getUTCDate())+'T'
		      + pad(this.getUTCHours())+':'
		      + pad(this.getUTCMinutes())+':'
		      + pad(this.getUTCSeconds())+'Zxx'
	}