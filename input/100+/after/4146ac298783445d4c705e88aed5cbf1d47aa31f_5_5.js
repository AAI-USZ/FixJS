function(selector, refNodes) {
			refNodes && ("length" in refNodes || (refNodes = [refNodes])) || (refNodes = [this]);

			var result,
				i = 0,
				l = refNodes.length;

			do {
				result = refNodes[i].querySelector(selector);
				i++;
			}
			while(!result && i < l);

			return result || null;
		}