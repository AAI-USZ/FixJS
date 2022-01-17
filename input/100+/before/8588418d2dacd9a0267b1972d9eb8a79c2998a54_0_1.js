function elemChangeHandler(ev) {
		var setter, cancel, fromAttr, to, linkContext, sourceValue, cnvtBack, target,
			source = ev.target,
			$source = $(source),
			view = $.view(source),
			context = view.ctx,
			beforeChange = context.beforeChange;

		if (source.getAttribute(jsv.linkAttr) && (to = jsViewsData(source, "to"))) {
			fromAttr = defaultAttr(source);
			setter = fnSetters[fromAttr];
			sourceValue = $.isFunction(fromAttr) ? fromAttr(source) : setter ? $source[setter]() : $source.attr(fromAttr);

			if ((!beforeChange || !(cancel = beforeChange.call(view, ev) === FALSE)) && sourceValue !== undefined) {
				cnvtBack = jsv.converters[to[2]];
				target = to[0];
				to = to[1];
				linkContext = {
					src: source,
					tgt: target,
					cnvtBack: cnvtBack,
					path: to
				};
				if (cnvtBack) {
					sourceValue = cnvtBack.call(linkContext, sourceValue);
				}
				if (sourceValue !== undefined && target) {
					observable(target).setProperty(to, sourceValue);
					if (context.afterChange) {  //TODO only call this if the target property changed
						context.afterChange.call(linkContext, ev);
					}
				}
				ev.stopPropagation(); // Stop bubbling
			}
			if (cancel) {
				ev.stopImmediatePropagation();
			}
		}
	}