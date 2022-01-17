function (key, value) {
				var el = value;
				el.id = key;
				el.repositoryId = that.repositoryId;
				el.type = 'language';
				if (that.flags) {
					if (el.flag) {
						el.url =  FlagIcons.path + '/img/flags/' + el.flag + '.png';
					} else {
						el.url =  waiLangPath + '/img/button.png';
					}
				}
				// el.renditions.url = "img/flags/" + e.id + ".png";
				// el.renditions.kind.thumbnail = true;
				that.languageCodes.push(new Aloha.RepositoryDocument(el));
			}