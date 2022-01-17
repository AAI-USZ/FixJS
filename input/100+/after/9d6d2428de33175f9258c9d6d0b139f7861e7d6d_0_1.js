function() {
		var tabbox = this.getTabbox();
		var tbx = tabbox.$n(),
		hgh = tbx.style.height;
		if (hgh && hgh != "auto") {
			if (!tabbox.inAccordionMold()) {
				var n = this.$n(),
					isHor = tabbox.isHorizontal();
				hgh = isHor ?
					zk(n.parentNode).vflexHeight(): n.parentNode.clientHeight;
					// B50-ZK-473: Tabpanel in vertical Tabbox should always have full height
				if (zk.ie8)
					hgh -= 1; // show the bottom border
				zk(n).setOffsetHeight(hgh);

				// Bug ZK-473
				if (zk.ie6_ && isHor) {
					var s = this.$n('cave').style,
					z = s.zoom;
					s.zoom = 1;
					s.zoom = z;
				}
			} else {
				var n = this.$n(),
					hgh = zk(tbx).revisedHeight(tbx.offsetHeight);
				hgh = zk(n.parentNode).revisedHeight(hgh);
				
				// fixed Opera 10.5+ bug
				if (zk.opera) {
					var parent;
					if ((parent = tbx.parentNode) && tbx.style.height == '100%')
						hgh = zk(parent).revisedHeight(parent.offsetHeight);
				}
				
				for (var e = n.parentNode.firstChild; e; e = e.nextSibling)
					if (e != n)
						hgh -= e.offsetHeight;
				hgh -= n.firstChild.offsetHeight;
				hgh = zk(n = n.lastChild).revisedHeight(hgh);
				if (zk.ie8)
					hgh -= 1; // show the bottom border
				var cave = this.$n('cave'),
					s = cave.style;
				s.height = jq.px0(hgh);
			}
		}
	}