function() {
		return $('<a href="https://twitter.com/share" class="twitter-share-button">Tweet</a>')
			.attr('data-url',this._get_uri)
			.attr('counturl',this._get_uri)
			.attr('data-via',this.options.reply_to)
			.attr('data-lang', this.options.language)
			.attr('data-related', this.options.reply_to)
			.attr('data-dnt',true);
	}