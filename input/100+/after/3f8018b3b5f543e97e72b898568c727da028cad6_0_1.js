function () { 

			var element, bindingExpr, directives;



			element = view.$(this);

			bindingExpr = element.attr(databindAttr);

			directives = rj.parse(bindingExpr, makeDataBindAttrBindingDeclReviver(model));



			bindingDecls.push({

				element: element,

				directives: directives,

				dataSource: model

			});

		}