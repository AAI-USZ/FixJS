function renderTag(tag, parentView, parentTmpl, converter, content, tagInstance) {
		// Called from within compiled template function, to render a nested tag
		// Returns the rendered tag
		var ret,
			tmplTags = parentTmpl.tags,
			nestedTemplates = parentTmpl.templates, 
			props = tagInstance.props = tagInstance.props || {},
			tmpl = props.tmpl,
			args = arguments.length > 6 ? slice.call(arguments, 6) : [],
			tagFn = tmplTags && tmplTags[tag] || $viewsTags[tag];

		if (!tagFn) {
			error("Unknown tag: {{"+ tag + "}}");
			return "";
		}
		if (tmpl) {
			// We don't want to expose tmpl as a prop to view context in rendered content
			delete props.tmpl;
		}

		// Set the tmpl property to the content of the block tag, unless set as an override property on the tag
		content = content && parentTmpl.tmpls[content - 1];
		tmpl = tmpl || content || undefined;

		tagInstance.tmpl =
		"" + tmpl === tmpl // if a string
				? nestedTemplates && nestedTemplates[tmpl] || $templates[tmpl] || $templates(tmpl)
			: tmpl;

		tagInstance.isTag = TRUE;
		tagInstance.converter = converter;
		tagInstance.view = parentView;
		tagInstance.renderContent = renderContent;

		ret = tagFn.apply(tagInstance, args);
		return ret || (ret == undefined ? "" : ret.toString()); // (If ret is the value 0 or false, will render to string)
	}