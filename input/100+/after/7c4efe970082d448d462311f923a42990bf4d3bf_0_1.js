function (parser, classDef) {
			if (resolveImmmediately) {
				classDef.resolveTypes(
					new AnalysisContext(
						errors,
						parser,
						(function (errors, request) {
							return this._instantiateTemplate(errors, parser, request, true);
						}).bind(this)));
			}
		}