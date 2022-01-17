function (data) {
				console.log("fetched locale data for " + lang);
				thisLocale = $("<div/>").append(data.documentElement).html();
				locale[lang] = thisLocale;
			}