function(evt, node, evtSplitInfo) {
			var instance = this;

			node.addClass(CSS_SVT_TABLE_DATA_EVENT);

			if (evtSplitInfo.left) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_LEFT).prepend(TPL_SVT_EV_ICON_LEFT);
			}

			if (evtSplitInfo.right) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_RIGHT).append(TPL_SVT_EV_ICON_RIGHT);
			}

			if (evt.get(PARENT_EVENT)) {
				node.addClass(CSS_SVT_TABLE_DATA_EVENT_REPEATED);
			}
		}