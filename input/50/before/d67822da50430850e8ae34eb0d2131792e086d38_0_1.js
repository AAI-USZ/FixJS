function (node) {
			return (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) ? node.innerText : node.textContent;;
		}