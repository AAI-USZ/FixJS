function(keywords) {
		var bits = keywords.split('; ');
		var keywordDisplayField = this.down('#keywords');
		var bodyEl = keywordDisplayField.bodyEl;
		var domElem = bodyEl.dom;
		this.clearDomBelow(domElem);
		var tpl = Ext.DomHelper.createTemplate({
			tag: 'div',
			cls: 'keyword',
			html: '{kw}'
		});

    if (bits.length > 0) {
      Ext.each(bits, function(keyword) {
        tpl.append(bodyEl, {
          kw: keyword
        });
      }, this);
    }

		keywordDisplayField.show();
	}