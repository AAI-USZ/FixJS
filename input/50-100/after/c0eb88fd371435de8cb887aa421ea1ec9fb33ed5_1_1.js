function (val) {
			var code = val.replace(regs.compile.only, '$1');
			code = escapers.compileEscape(code);
			code = ";show('"+ code +"');";
			code = simpleParse(code);
			str = str.replace(regs.compile.first, function () {
				return code;
			});
		}