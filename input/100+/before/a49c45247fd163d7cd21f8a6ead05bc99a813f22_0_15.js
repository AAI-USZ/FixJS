function(element, dom) {
	var self = this;
	var output = function(text, truncated) {
		dom.get("text").empty().append(text);
		dom.get("textEllipses")[!truncated || self.textExpanded ? "hide" : "show"]();
		dom.get("textToggleTruncated")[truncated || self.textExpanded ? "show" : "hide"]();
	};
	// temporary fix because Firefox hides CDATA content
	var text = this.data.object.content.replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1');
	var source = this.data.source.name;
	var openLinksInNewWindow = this.config.get("openLinksInNewWindow");
	var contentTransformations = this.config.get("contentTransformations." +
							this.data.object.content_type, {});
	if (source && source == "Twitter" && this.config.get("aggressiveSanitization")) {
		output(this.labels.get("sharedThisOn", {"service": source}));
		return;
	}

	var limits = this.config.get("parent.limits");
	var wrap = function(tag) {
		var template = 
			(tag.length > limits.tags)
			? '<span class="{class:tag}" title="{data:tag}">{data:truncatedTag}</span>'
			: '<span class="{class:tag}">{data:tag}</span>';
		var truncatedTag = tag.substring(0, limits.tags) + "...";
		return (self.substitute(template, {"tag": tag, "truncatedTag": truncatedTag}));	
	};

	if (contentTransformations.hashtags) {
		text = text.replace(/(#|\uff03)(<a[^>]*>[^<]*<\/a>)/ig, function($0, $1, $2){
			return wrap($2);
		});
	}

	var insertHashTags = function(t) {
		if (!contentTransformations.hashtags) return t;
		return t.replace(/(^|[^\w&\/])(?:#|\uff03)([^\s\.,;:'"#@\$%<>!\?\(\)\[\]]+)/ig, function($0, $1, $2) {
			return $1 + wrap($2);
		});
	};
	var tags2meta = function(text) {
		var tags = [];
		text = text.replace(/((<a\s+[^>]*>)(.*?)(<\/a>))|<.*?>/ig, function($0, $1, $2, $3, $4) {
			//we are cutting and pushing <a> tags to acc to avoid potential html issues after autolinking
			if ($1) {
				var content = tags2meta($3);
				content.text = insertHashTags(content.text);
				$0 = $2 + meta2tags(content) + $4;
			}
			tags.push($0);
			return ' %%HTML_TAG%% ';
		});
		return {"text" : text, "tags": tags};
	};
	var meta2tags = function(content) {
		$.each(content.tags, function(i, v) {
			content.text = content.text.replace(' %%HTML_TAG%% ', v);
		});
		return content.text;
	};
	var urlMatcher = "((?:http|ftp|https):\\/\\/(?:[a-z0-9#:\\/\\;\\?\\-\\.\\+,@&=%!\\*\\'(){}\\[\\]$_|^~`](?!gt;|lt;))+)";
	var normalizeLinks = function(content) {
		return content.replace(/(<a\s+[^>]*>)(.*?)(<\/a>)/ig, function($0, $1, $2, $3) {
			if (new RegExp("^" + urlMatcher + "$").test($2)) {
				$2 = $2.length > limits.bodyLink ? $2.substring(0, limits.bodyLink) + "..." : $2;
			}
			if (openLinksInNewWindow && !/\s+target=("[^<>"]*"|'[^<>']*'|\w+)/.test($1)) {
				$1 = $1.replace(/(^<a\s+[^>]*)(>$)/, '$1 target="_blank"$2');
			}
			return $1 + $2 + $3;
		});
	};
	var content = tags2meta(text);
	if (source && source != 'jskit' && source != 'echo') {
		var url = this.depth
			? this.data.target.id
			: this.config.get("reTag")
				? this.data.object.permalink || this.data.target.id
				: undefined;
		if (url) {
			content.text = content.text.replace(new RegExp(url, "g"), "");
			if (!/\S/.test(content.text)) {
				output(this.labels.get("sharedThisOn", {"service": source}));
				return;
			}
		}
	}
	var textBeforeAutoLinking = content.text = insertHashTags(content.text);
	if (contentTransformations.urls) {
		content.text = content.text.replace(new RegExp(urlMatcher, 'ig'), function($0, $1) {
			return Echo.Utils.hyperlink({
				"href": $1,
				"caption": $1
			}, {
				"skipEscaping": true,
				"openInNewWindow": openLinksInNewWindow
			});
		})
	}
	if (contentTransformations.smileys) {
		if (content.text != textBeforeAutoLinking) {
			content = tags2meta(meta2tags(content));
		}
		var smileys = this.initSmileysConfig();
		if (content.text.match(smileys.regexps.test)) {
			$.each(smileys.codes, function(i, code) {
				content.text = content.text.replace(smileys.regexps[code], smileys.tag(smileys.hash[code]));
			});
		}
	}

	if (contentTransformations.newlines) {
		content.text = content.text.replace(/\n\n+/g, '\n\n');
		content.text = content.text.replace(/\n/g, '&nbsp;<br>');
	}
	var result = normalizeLinks(meta2tags(content));
	var truncated = false;
	if ((limits.body || limits.lines) && !self.textExpanded) {
		if (limits.lines) {
			var splitter = contentTransformations.newlines ? "<br>" : "\n";
			var chunks = result.split(splitter);
			if (chunks.length > limits.lines) {
				result = chunks.splice(0, limits.lines).join(splitter);
				truncated = true;
			}
		}
		var limit = limits.body && result.length > limits.body
			? limits.body
			: truncated
				? result.length
				: undefined;
		// we should call $.htmlTextTruncate to close
		// all tags which might remain unclosed after lines truncation
		var truncatedText = $.htmlTextTruncate(result, limit, "", true);
		if (truncatedText.length != result.length) {
			truncated = true;
		}
		result = truncatedText;
	}
	output(result, truncated);
}