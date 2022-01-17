function(name, method, message, replaceTokenMethod) {
		$.validator.methods[name] = method;
		$.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
		if (method.length < 3) {
			$.validator.addClassRules(name, $.validator.normalizeRule(name));
		}
      if (!replaceTokenMethod)
         replaceTokenMethod = $.validator.defaultTokenReplacer;
      $.validator.replaceTokens[name] = replaceTokenMethod;
	}