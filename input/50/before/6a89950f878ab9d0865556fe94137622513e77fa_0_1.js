function handler(jqXHR, textStatus, errorThrown, data) {
					            // Reference http://tickets.musicbrainz.org/browse/CAA-24
					            $.log('Ignore the XMLHttpRequest error.  CAA returned XML stating that CAA has no images for this release.');
					            $row.find('div.loadingDiv, .caaAdd').toggle();
					            $row.find('div.caaDiv').slideDown('slow');
					        }