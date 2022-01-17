function (errors, request) {
					var classDef = this._instantiateTemplate(errors, parser, request, true);
					classDef.setAnalysisContextOfVariables(createContext(parser));
					classDef.analyze(createContext(parser));
					return classDef;
				}