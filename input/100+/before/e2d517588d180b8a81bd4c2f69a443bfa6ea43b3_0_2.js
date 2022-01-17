function renderTag(tag, parentView, parentTmpl, converter, content, tagObject) {
		// Called from within compiled template function, to render a nested tag
		// Returns the rendered tag
		var ret,
			tmplTags = parentTmpl.tags,
			nestedTemplates = parentTmpl.templates, 
			tmpl = tagObject.props && tagObject.props.tmpl,
			args = arguments,
			tagFn = tmplTags && tmplTags[tag] || tags[tag];

		if (!tagFn) {
			return "";
		}
		// Set the tmpl property to the content of the block tag, unless set as an override property on the tag
		content = content && parentTmpl.tmpls[content - 1];
		tmpl = tmpl || content || undefined;

		tagObject.tmpl =
		"" + tmpl === tmpl // if a string
			? nestedTemplates && nestedTemplates[tmpl] || templates[tmpl] || templates(tmpl)
			: tmpl;

		tagObject.isTag = TRUE;
		tagObject.converter = converter;
		tagObject.view = parentView;
		tagObject.renderContent = renderContent;

		ret = tagFn.apply(tagObject, args.length > 6 ? slice.call(args, 6) : []);
		return ret || (ret == undefined ? "" : ret.toString()); // (If ret is the value 0 or false, will render to string)
	}