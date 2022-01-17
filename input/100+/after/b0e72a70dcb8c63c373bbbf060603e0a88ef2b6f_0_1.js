function(ev, src, title) {
		var tiddler = store.getTiddler(title);
		if(tiddler) {
			fieldsCache[title] = $.extend({}, tiddler.fields);
			tiddler.fields["server.workspace"] = tiddlyspace.getCurrentWorkspace(config.options.chkPrivateMode ?
		"private" : "public");
			tiddler.fields["server.permissions"] = "read, write, create"; // no delete
			delete tiddler.fields["server.page.revision"];
			delete tiddler.fields["server.title"];
			delete tiddler.fields["server.etag"];
			// special handling for pseudo-shadow tiddlers
			if(tiddlyspace.coreBags.contains(tiddler.fields["server.bag"])) {
				tiddler.tags.remove("excludeLists");
			}
		} else { // ensure workspace is the current space
			var el = story.findContainingTiddler(src);
			el = $(el);
			var fields = el.attr("tiddlyfields");
			if(fields) { // inherited via TiddlyLink
				fields = fields.decodeHashMap();
				fields["server.workspace"] = config.
					defaultCustomFields["server.workspace"];
			} else {
				fields = config.defaultCustomFields;
			}
			fields = String.encodeHashMap(fields);
			el.attr("tiddlyfields", fields);
		}
		cmd.editTiddler.handler.apply(this, arguments);
		if(tiddler) {
			tiddler.fields["server.permissions"] += ", delete";
		}
		return false;
	}