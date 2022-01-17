function link(data, container, context, prevNode, nextNode, index, parentView) {
		// Bind elementChange on the root element, for links from elements within the content, to data;
		container = $(container); // container was an element or selector

		var html, target,
			self = this,
			containerEl = container[0],
			onRender = addLinkAnnotations,
			tmpl = self.markup && self || self.jquery && $templates(self[0]);

			// if this is a tmpl, or a jQuery object containing an element with template content, get the compiled template
		if (containerEl) {
			parentView = parentView || $view(containerEl);

			unlink(containerEl);
			container.on(elementChangeStr, elemChangeHandler);

			if (context) {
				if (parentView.link === FALSE) {
					context.link = FALSE; // If link=false, don't allow nested context to switch on linking
				}
				// Set link=false, explicitly, to disable linking within a template nested within a linked template
				onRender = context.link !== FALSE && onRender;
				if (target = context.target === "replace") {
					context.target = undefined; // Don't pass on as inherited context
				}
			}

			if (tmpl) {
				// Remove previous jsvData on the container elem - e.g. the previous views

				html = tmpl.render(data, context, parentView, undefined, undefined, undefined, onRender);

				if (target === "replace") {
					prevNode = containerEl.previousSibling;
					nextNode = containerEl.nextSibling;
					containerEl = containerEl.parentNode;
					container.replaceWith(html);
				} else {
					// TODO/BUG Currently this will re-render if called a second time, and will leave stale views under the parentView.views.
					// So TODO: make it smart about when to render and when to link on already rendered content
					prevNode = nextNode = undefined; // When linking from a template, prevNode and nextNode parameters are ignored
					container.empty().append(html); // Supply non-jQuery version of this...
					// Using append, rather than html, as workaround for issues in IE compat mode. (Using innerHTML leads to initial comments being stripped)
				}
			}
			parentView.link(data, containerEl, context, prevNode, nextNode, index);
		} else if (typeof(container)=="string") {
			throw container +": does not select a DOM element.";
		} else {
			throw "No DOM element selected.";
                }
		return container; // Allow chaining, to attach event handlers, etc.
	}