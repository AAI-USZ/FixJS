function(context, character) {
		if (arguments.length == 2 && context instanceof s.Context && new Object(character) instanceof String && character.length <= 1) {
			switch (character) {
			case "W": case "\uff37":
			context.header += context.getFunctionApplication(0);
			context.upperCaseWCountInFunctionApplication = 1;
			context.state = s.FunctionApplicationUpperCaseWState.getInstance();
			break;
			case "w": case "\uff57":
			context.lowerCaseWCountInFunctionApplication++;
			break;
			case "v": case "\uff56":
			context.header += context.getFunctionApplication(0);
			context.state = s.LowerVState.getInstance();
			break;
			case "":
			context.header += context.header + context.getFunctionApplication(0);
			context.state = null;
			break;
			case "\n":
			context.line++;
			break;
			}
		} else {
			throw new Error(u.ErrorMessage.overload);
		}
	}