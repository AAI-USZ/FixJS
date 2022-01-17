function(html){
		// summary:
		//		Function to trap and over-ride the editor inserthtml implementation
		//		to try and filter it to match the editor's internal styling mode.
		//		Helpful for plugins like PasteFromWord, in that it extra-filters
		//		and normalizes the input if it can.
		// html:
		//		The HTML string to insert.
		// tags:
		//		private
		if(html){
			var doc = this.editor.document;
			var div = doc.createElement("div");
			div.innerHTML = html;
			div = this._browserFilter(div);
			html = editorHtml.getChildrenHtml(div);
			div.innerHTML = "";

			// Call the over-ride, or if not available, just execute it.
			if(this.editor._oldInsertHtmlImpl){
				return this.editor._oldInsertHtmlImpl(html);
			}else{
				return this.editor.execCommand("inserthtml", html);
			}
		}
		return false;
	}