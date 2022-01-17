function propertyChangeHandler(ev, eventArgs, bind) {
		var setter, changed, sourceValue, css, prev,
			link = this,
			source = link.src,
			target = link.tgt,
			$target = $(target),
			attr = link.attr || defaultAttr(target, TRUE), // attr for binding data value to the element
			view = link.view,
			context = view.ctx,
			beforeChange = context.beforeChange;

		// TODO for <input data-link="a.b" />
		//Currently the following scenarios do work:
		//$.observable(model).setProperty("a.b", "bar");
		//$.observable(model.a).setProperty("b", "bar");
		// TODO Add support for $.observable(model).setProperty("a", { b: "bar" });
		//	var testsourceValue = ev.expr( source, view, jsv, ev.bind );

		//	TODO call beforeChange on data-link initialization.
		//			if ( changed && context.afterChange ) {
		//				context.afterChange.call( link, ev, eventArgs );
		//			}

		if ((!beforeChange || !(eventArgs && beforeChange.call(this, ev, eventArgs) === FALSE))
		// If data changed, the ev.data is set to be the path. Use that to filter the handler action...
		&& !(eventArgs && ev.data !== eventArgs.path))
		// && (!view || view._onDataChanged( eventArgs ) !== FALSE ) // Not currently supported or needed for property change
		{
			sourceValue = link.fn(source, link.view, jsv, bind || returnVal);
			if ($.isFunction(sourceValue)) {
				sourceValue = sourceValue.call(source);
			}
			if (attr === "visible") {
				attr = "css-display";
				sourceValue = sourceValue ? "block" : "none";
			}
			if (css = attr.lastIndexOf("css-", 0) === 0 && attr.substr(4)) {
				if (changed = $target.css(css) !== sourceValue) {
					$target.css(css, sourceValue);
				}
			} else {
				if (attr === "value") {
					if (target.type === "radio") {
						if (target.value === sourceValue) {
							sourceValue = TRUE;
							attr = "checked";
						} else {
							return;
						}
					}
				}
				setter = fnSetters[attr];

				if (setter) {
					if (changed = $target[setter]() !== sourceValue) {
						if (attr === "html") {
							$target[setter](sourceValue);
							if (eventArgs) {
								view.link(source, target, undefined, NULL);
								// This is a data-link=html{...} update, so need to link new content
							}
						} else {
							$target[setter](sourceValue);
						}
						if (target.nodeName.toLowerCase() === "input") {
							$target.blur(); // Issue with IE. This ensures HTML rendering is updated.
						}
					}
				} else if (changed = $target.attr(attr) !== sourceValue) {
					$target.attr(attr, sourceValue);
				}
			}

			if (eventArgs && changed && context.afterChange) {
				context.afterChange.call(link, ev, eventArgs);
			}
		}
	}