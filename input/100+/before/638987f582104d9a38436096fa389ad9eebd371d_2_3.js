function (data) {
			var that = this;

			// Transform loaded json into a set of repository documents
			jQuery.each(data, function (key, value) {
				var el = value;
				el.id = key;
				el.repositoryId = that.repositoryId;
				el.type = 'language';
				el.url =  FlagIcons.path + '/img/flags/' + el.id + '.png';
				// el.renditions.url = "img/flags/" + e.id + ".png";
				// el.renditions.kind.thumbnail = true;
				that.languageCodes.push(new Aloha.RepositoryDocument(el));
			});
		}