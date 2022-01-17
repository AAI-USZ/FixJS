function (node) {
			F5.forEach(node.view.el.querySelectorAll('[f5widget]'), function (el) {
				if (el.widget.release) {
					el.widget.release();
				}
			});
			
			if (node.view.delegate && node.view.delegate.release) {
				node.view.delegate.release();
			}

			F5.removeTouchEventListenersRecursive(node.view.el);
			node.view.el.parentElement.removeChild(node.view.el);
			
			function deleteViewsRecursive(node) {
				// TODO: call viewRelease?
				delete node.view;
				delete node.animation;
				if (node.children) {
					F5.forEach(node.children, function (id, child) {
						deleteViewsRecursive(child);
					});
				}
			}
			deleteViewsRecursive(node);			
		}