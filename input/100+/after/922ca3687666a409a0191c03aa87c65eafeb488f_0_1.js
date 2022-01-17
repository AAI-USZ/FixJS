function addImageRow (event) {
			var $releaseAnchor = $.single( this );

			if ( $releaseAnchor[0].nodeName === 'TABLE' ) { // Detect bitmap's script's expandos.

				/* DOMNodeInserted is triggered for each new element added to the table by bitmap's script.
				   This looks for the editing tr he adds at the end, since that is the last DOMNodeInserted which is
				   triggered when a RG is expanded.  He does not add that row for expanded releases, so this only
				   kicks in when a RG is expanded, and only when that entire expando has been inserted. */
				
				var $editRow = $releaseAnchor.find('a[href^="/release/add?release-group"]').parent();

				if ( $editRow.length ) {
					$editRow.remove();
					$releaseAnchor.find( 'a' )
								  .filter( '[href^="/release/"]' )
								  .each( INNERCONTEXT.UI.addImageRow );
				}
				return;
			}

			var $releaseRow = $releaseAnchor.parents('tr:first');
			INNERCONTEXT.UTILITY.assemble(
				INNERCONTEXT.TEMPLATES.image_row(
					{ $row : $releaseRow
					, cols: $releaseRow[0].getElementsByTagName('td').length
					, MBID: INNERCONTEXT.CONSTANTS.REGEXP.mbid.exec($releaseAnchor.attr('href'))
					}
				)
			)[0].insertAfter($releaseRow);
			
//			$addButton.on('click', INNERCONTEXT.UI.addNewImageDropBox);
//			$loadButton.on('click', { $row : $newRow
//									, $add : $addButton
//									}, INNERCONTEXT.UTILITY.loadRowInfo);
		}