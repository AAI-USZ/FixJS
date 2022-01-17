function (start, end) {
		var inp = this.jq[0],
			len = inp.value.length;
		if (start == null || start < 0) start = 0;
		if (start > len) start = len;
		if (end == null || end > len) end = len;
		if (end < 0) end = 0;
		if (zk.android) { // the focus will penetrate the input element which is behind the popup
			setTimeout(function () {
				inp.setSelectionRange(start, end);
			});
		} else {
			if (inp.setSelectionRange) {
				inp.setSelectionRange(start, end);
			} else if (inp.createTextRange) {
				var range = inp.createTextRange();
				if(start != end){
					range.moveEnd('character', end - range.text.length);
					range.moveStart('character', start);
				}else{
					range.move('character', start);
				}
				range.select();
			}
		}
		return this;
	}