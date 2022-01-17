function (obj, citeproc) {
	obj.citationLangPrefs = {};
	var segments = ['Persons', 'Institutions', 'Titles', 'Publishers', 'Places'];
	for (var i = 0, ilen = segments.length; i < ilen; i += 1) {
        var settings = Zotero.Prefs.get("csl.citation" + segments[i]);
        if (settings) {
            settings = settings.split(",");
        } else {
            settings = ['orig']
        }
		obj.citationLangPrefs[segments[i].toLowerCase()] = settings;
	}
    obj.citationAffixes = null;
    var affixes = Zotero.Prefs.get("csl.citationAffixes");
    if (affixes) {
        affixes = Zotero.Prefs.get("csl.citationAffixes").split("|");
        if (affixes.length === 30) {
            obj.citationAffixes = affixes;
        }
    }
    if (!obj.citationAffixes) {
        obj.citationAffixes = [,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];
    }
	obj.citationTransliteration = [];
	obj.citationTranslation = [];
	obj.citationSort = [];
	var sql = 'SELECT param, tag FROM zlsPreferences '
		+ 'WHERE profile=? AND '
		+ 'param IN (?,?,?)';
	var res = Zotero.DB.query(sql,['default','citationTransliteration','citationTranslation','citationSort']);
	
	if (res) {
		for (var i = 0, ilen = res.length; i < ilen; i += 1) {
			obj[res[i].param].push(res[i].tag);
		}
	}
	if (citeproc) {
		citeproc.setLangPrefsForCites(obj.citationLangPrefs);

		citeproc.setLangTagsForCslTransliteration(obj.citationTransliteration);
		citeproc.setLangTagsForCslTranslation(obj.citationTranslation);
		citeproc.setLangTagsForCslSort(obj.citationSort);

		citeproc.setAutoVietnameseNamesOption(Zotero.Prefs.get('csl.autoVietnameseNames'));
	}
}