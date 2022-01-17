function($0, $1, $2, $3, $4) {
			//we are cutting and pushing <a> tags to acc to avoid potential html issues after autolinking
			if ($1) {
				var content = tags2meta($3);
				content.text = insertHashTags(content.text);
				$0 = $2 + meta2tags(content) + $4;
			}
			tags.push($0);
			return " %%HTML_TAG%% ";
		}