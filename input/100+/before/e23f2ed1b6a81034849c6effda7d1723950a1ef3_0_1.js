function(targetId) {
		var target = $(W3S.Core.Util.formatId(targetId));
		while (target.not('body')&&target.siblings('.w3s-store_url').length<1) {
			// find cloisest reloadable target
			target = target.parent();
		}
		if (target.is('body')) {
			// not found, reload whole page instead
			window.location.reload();
			return false;
		}
		// reload target
		var id = target.getAttr('id');
		var url = W3S.Core.Store.Dom.get(id, 'url');
        W3S.Core.Ajax.action(url, id,{},{'refresh':true});
        return false;
    }