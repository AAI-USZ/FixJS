function (scope, iElement, tAttrs, controller) {

			var sablona = template(scope.data.Type);

			var compiled = $compile(sablona)(scope);
			iElement.html(compiled);

			scope.add = function (item) {
				GridApi.AddGridElement({
					applicationId: appSettings.Id,
					data: item,
					gridId: scope.grid.Id
				}, function (data) {
					if (data.Line >= scope.grid.Lines.length - 1) {
						var newitem = _newitem(scope.grid.Lines.length);
						scope.grid.Lines.push([newitem]);
					}
					data.Edit = 1;
					scope.grid.Lines[data.Line][data.Position] = data;
				});
			};

			scope.remove = function (item) {
				GridApi.DeleteGridElement({ applicationId: appSettings.Id, data: item },
					function () { item.Id = 0; item.Edit = 0; item.Content = ""; });
			};

			scope.edit = function (item) {
				item.Edit = 1;
			};

			scope.save = function (item) {
				var copy = jQuery.extend(true, {}, item);

				if (angular.isObject(copy.Content))
					copy.Content = JSON.stringify(copy.Content);

				GridApi.UpdateGridElement({ applicationId: appSettings.Id, data: copy },
				function () {
					item.Edit = 0;
				});
			};


		}