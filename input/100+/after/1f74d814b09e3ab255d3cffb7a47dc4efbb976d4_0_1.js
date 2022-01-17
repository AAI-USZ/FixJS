function(facet, modifyMode, modifyID, grouping, clear) {
			if (that.singleFacetValues[facet]) {
				document.location = that.addCriteriaUrl + "/facet/" + facet + "/id/" + that.singleFacetValues[facet];
				return true;
			}
			that.isChanging = true;
			if (!facet) { return; }
			jQuery("#" + that.panelID).fadeIn(that.panelTransitionSpeed, function() { that.isChanging = false; });
			
			if (that.useExpose) { 
				jQuery("#" + that.panelID).expose({api: true, color: that.exposeBackgroundColor, opacity: that.exposeBackgroundOpacity}).load(); 
			}
			if (!modifyID) { modifyID = ''; }
			
			var options = { facet: facet, modify: (modifyMode ? 1 : ''), id: modifyID, grouping: grouping, clear: clear ? 1 : 0 };
			if (that.browseID) { options['browse_id'] = that.browseID; }
			jQuery("#" + that.panelContentID).load(that.facetUrl, options);
		}