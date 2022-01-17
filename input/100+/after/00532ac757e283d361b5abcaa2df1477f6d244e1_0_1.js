function(lang){
	var thisLocale = locale[lang],
		localePath;

	if (typeof(thisLocale) === "undefined") {
		// try to fetch from server
		localePath = CSLEDIT.options.get("rootURL") + "/external/locales/locales-" + lang + ".xml";

		$.ajax({
			url : localePath,
			success : function (data) {
				console.log("fetched locale data for " + lang);
				locale[lang] = data;
			},
			error : function (jqXHR, textStatus) {
				console.log("ERROR retrieving locale data for " + lang);
				console.log("Falling back to en-US");

				thisLocale = locale["en-US"];
			},
			dataType : "text",
			async : false
		});
	}
	
	return thisLocale;
}