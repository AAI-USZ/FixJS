f				var code = "if(" + expression + "){";
				return "';" + code.replace(/\\'/g, "'").replace(/\\\\/g,"\\").replace(/[\r\t\n]/g, ' ')  + "out+='";
			})
