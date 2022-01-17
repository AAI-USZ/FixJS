function Model() {

		this.initialize = function () {
			this.json = F5.getElementById(this.el, 'json');
		};	

		this.viewWillBecomeActive = function () {
			modelListeners[this.node.path] = this;
			F5.Global.flow.root.view.delegate.update();			
		};

		this.viewWillBecomeInactive = function () {
			delete modelListeners[this.node.path];
		};


		this.update = function (model) {
			var jsonFormatter = new JSONFormatter();
			this.json.innerHTML = jsonFormatter.valueToHTML(model);						
			jsonFormatter.attachListeners();																	


			function collapse(node) {
				if (!node.active) {
					var div = document.getElementById('json-' + node.path);

					var collapser = div.parentElement.firstChild;
					if (F5.hasClass(collapser, 'collapser')) {
						jsonFormatter.collapse(collapser);						
					}					
				}
				if (node.children) {
					F5.forEach(node.children, function (id, child) {
						collapse(child);
					});
				}
			}

			collapse(model);
		};		
	}