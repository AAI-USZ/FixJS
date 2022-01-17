function(pageobj) {
			var statelem = pageobj.getStatusElement();

			if (!pageobj.exists()) {
				statelem.error( "It seems that the page doesn't exist; perhaps it has already been deleted" );
				return;
			}

			var text = pageobj.getPageText();
			var params = pageobj.getCallbackParameters();

			statelem.status( 'Checking for tags on the page...' );

			// check for existing deletion tags
			var tag = /(?:\{\{\s*(db|delete|db-.*?)(?:\s*\||\s*\}\}))/.exec( text );
			if( tag ) {
				statelem.error( [ Morebits.htmlNode( 'strong', tag[1] ) , " is already placed on the page." ] );
				return;
			}

			var xfd = /(?:\{\{([rsaiftcm]fd|md1)[^{}]*?\}\})/i.exec( text );
			if( xfd && !confirm( "The deletion-related template {{" + xfd[1] + "}} was found on the page. Do you still want to add a CSD template?" ) ) {
				return;
			}

			var code, parameters, i;
			if (params.normalized === 'multiple')
			{
				code = "{{db-multiple";
				for (i in Twinkle.speedy.dbmultipleCriteria) {
					if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string') {
						code += "|" + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase();
					}
				}
				for (i in Twinkle.speedy.dbmultipleParameters) {
					if (typeof Twinkle.speedy.dbmultipleParameters[i] === 'string') {
						code += "|" + i + "=" + Twinkle.speedy.dbmultipleParameters[i];
					}
				}
				code += "}}";
				params.utparams = [];
			}
			else
			{
				parameters = Twinkle.speedy.getParameters(params.value, params.normalized, statelem);
				if (!parameters) {
					return;  // the user aborted
				}
				code = "{{db-" + params.value;
				for (i in parameters) {
					if (typeof parameters[i] === 'string') {
						code += "|" + i + "=" + parameters[i];
					}
				}
				code += "}}";
				params.utparams = Twinkle.speedy.getUserTalkParameters(params.normalized, parameters);
			}

			var thispage = new Morebits.wiki.page(mw.config.get('wgPageName'));
			// patrol the page, if reached from Special:NewPages
			if( Twinkle.getPref('markSpeedyPagesAsPatrolled') ) {
				thispage.patrol();
			}

			// Wrap SD template in noinclude tags if we are in template space.
			// Won't work with userboxes in userspace, or any other transcluded page outside template space
			if (mw.config.get('wgNamespaceNumber') === 10) {  // Template:
				code = "<noinclude>" + code + "</noinclude>";
			}

			// Remove tags that become superfluous with this action
			text = text.replace(/\{\{\s*(New unreviewed article|Userspace draft)\s*(\|(?:\{\{[^{}]*\}\}|[^{}])*)?\}\}\s*/ig, "");
			if (mw.config.get('wgNamespaceNumber') === 6) {
				// remove "move to Commons" tag - deletion-tagged files cannot be moved to Commons
				text = text.replace(/\{\{(mtc|(copy |move )?to ?commons|move to wikimedia commons|copy to wikimedia commons)[^}]*\}\}/gi, "");
			}

			// Generate edit summary for edit
			var editsummary;
			switch (params.normalized)
			{
				case 'db':
					editsummary = 'Requesting [[WP:CSD|speedy deletion]] with rationale \"' + parameters["1"] + '\".';
					break;
				case 'multiple':
					editsummary = 'Requesting speedy deletion (';
					for (i in Twinkle.speedy.dbmultipleCriteria) {
						if (typeof Twinkle.speedy.dbmultipleCriteria[i] === 'string') {
							editsummary += '[[WP:CSD#' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + '|CSD ' + Twinkle.speedy.dbmultipleCriteria[i].toUpperCase() + ']], ';
						}
					}
					editsummary = editsummary.substr(0, editsummary.length - 2); // remove trailing comma
					editsummary += ').';
					break;
				case 'g6':
					if (params.value === 'histmerge') {
						editsummary = "Requesting history merge with [[" + parameters["1"] + "]] ([[WP:CSD#G6|CSD G6]]).";
						break;
					}
					/* falls through */
				default:
					editsummary = "Requesting speedy deletion ([[WP:CSD#" + params.normalized.toUpperCase() + "|CSD " + params.normalized.toUpperCase() + "]]).";
					break;
			}
			pageobj.setPageText(code + ((params.normalized === 'g10' || Twinkle.speedy.dbmultipleCriteria.indexOf('g10') !== -1) ?
					'' : ("\n" + text) )); // cause attack pages to be blanked
			pageobj.setEditSummary(editsummary + Twinkle.getPref('summaryAd'));
			pageobj.setWatchlist(params.watch);
			pageobj.setCreateOption('nocreate');
			pageobj.save(Twinkle.speedy.callbacks.user.tagComplete);
		},
