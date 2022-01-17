function(state, formatStr, args) {
		 	check(aState, formatStr, isString, 'printf', 'string', 1, [formatStr].concat(args));
			var msg = helpers.format(formatStr, args, 'printf');
			state.getDisplayHook()(msg);
			state.v = types.VOID;
		 }