function (val) {
			var code = val.replace(regs.compile.only, '$1');
			code = escapers.htmlEscape(code);
			code = ";show('"+ code +"');";
			code = simpleParse(code);
			str = str.replace(regs.compile.first, function () {
				return code;
			});
		}