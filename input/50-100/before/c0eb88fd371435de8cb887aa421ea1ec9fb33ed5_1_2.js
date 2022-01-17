function (val) {
			var code = val.replace(regs.simple.only, '$1');
			code = escapers.htmlUnescape(code);
			code = escapers.simpleEscape(code);
			code = "'+("+ code +")+'";
			str = str.replace(regs.simple.first, function () {
				return code;
			});
		}