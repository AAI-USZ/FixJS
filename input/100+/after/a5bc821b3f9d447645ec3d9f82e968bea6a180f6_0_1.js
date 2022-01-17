function(req) {
            var eBusy = $('editorBusy');
            if (eBusy) eBusy.hide();
            $('editorOverlay').setStyle({display: "none"});

            if (index > 0) {
            	geocat.edit.doXLinkNewElementAjax(index - 1,metadataId,thisElement);
            }

            var html = req.responseText;
            
            var what = index === 0 ? dialogRequest.replacement : 'add';
            if (what == 'replace') {
                thisElement.replace(html);
            } else if (what == 'before') {
                thisElement.insert({
                    'before': html
                });
                setAddControls(thisElement.previous(), orElement);
            } else if (what == 'add') {
            	thisElement.insert({
            		'after': html
            	});
            	setAddControls(thisElement.next(), orElement);
            } else {
                alert("doNewElementAjax: invalid what: " + what + " should be replace or add.");
            }
            
            if (index === 0) {
                // Init map if spatial extent editing - usually bounding box or bounding polygon
                if (geocat.edit.Extent.accepts(dialogRequest.name)) {
                	if(typeof(searchTools) != "undefined")
                		searchTools.initMapDiv();
                }

                // Check elements
                validateMetadataFields();

                setBunload(true);
                // reset warning for window destroy
            }

        }