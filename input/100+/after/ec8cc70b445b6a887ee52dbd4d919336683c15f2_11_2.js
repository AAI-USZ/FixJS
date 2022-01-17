function(func){
		return function(){
			var t = this[func] ? this : $([this])
			t[func].apply(t, arguments)
			return this;
		}
	}