function loadRowInfo (e) {
			var $row         = $.single(this).parents('td.imageRow')
			  , ui           = INNERCONTEXT.UI
			  , $loadBtn     = $('.caaLoad:first')
			  , $tblParent   = $loadBtn.parents('table:first')
			  , $widthEle    = !$tblParent.hasClass('tbl') ? $tblParent.parents('td:first') : $loadBtn.parents('td:first')
			  , dropboxCount = Math.max(3, ($widthEle.quickWidth(0) / 132 << 0) - 5)
			  , $self        = $(this)
			  ;
			  
			ui.showLoading();

			while (dropboxCount--) {
				$self.after(ui.$makeDropbox());
			}

			$.ajax(
				{ cache   : false
				, context : this
				, url     : 'http://coverartarchive.org/release/' + $self.data('entity')
				, error   : function handler(jqXHR, textStatus, errorThrown, data) {
					            // Reference http://tickets.musicbrainz.org/browse/CAA-24
					            $.log('Ignore the XMLHttpRequest error.  CAA returned XML stating that CAA has no images for this release.');
					            $row.find('div.loadingDiv, .caaAdd').toggle();
					            $row.find('div.caaDiv').slideDown('slow');
					        }
				, success : function caa_response_mediator(response, textStatus, jqXHR) {
					            return INNERCONTEXT.UTILITY.caaResponseHandler(response, textStatus, jqXHR, { $row: $row });
					        }
				}
			);
		}