function() {
		this.inherited(arguments);
		for (var i=0, b; b=mock_bookmarks[i]; i++) {
			var c = this.createComponent({kind: "BookmarkItem",
				ontap: "itemTap",
				}, b);
			c.setTitle(b.Title);
			c.setDetails(b.Address);
		}
	}