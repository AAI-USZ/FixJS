function (msg) {
		var id = "zk_err",
			$id = "#" + id,
			// Use zUtl.encodeXML -- Bug 1463668: security
 			html = '<div class="z-error" id="' + id + '"><table cellpadding="2" cellspacing="2" width="100%">'
 					+ '<tr valign="top"><td class="msgcnt" colspan="3"><div class="msgs">'+ zUtl.encodeXML(msg, {multiline : true}) + '</div></td></tr>'
 					+ '<tr id="'+ id + '-p"><td class="errnum" align="left">'+ ++_errcnt+ ' Errors</td><td align="right"><div >'
					+ '<div class="btn redraw" onclick="zk._Erbx.redraw()"></div>'
					+ '<div class="btn close" onclick="zk._Erbx.remove()"></div></div></td></tr></table></div>';

		jq(document.body).append(html);
		_erbx = this;
		this.id = id;
		try {
			var n;
			this.dg = new zk.Draggable(null, n = jq($id)[0], {
				handle: jq($id + '-p')[0], zIndex: n.style.zIndex,
				starteffect: zk.$void, starteffect: zk.$void,
				endeffect: zk.$void});
		} catch (e) {
		}
		jq("#" + id).slideDown(1000);
	}