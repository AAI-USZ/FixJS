function() {
						var name = jQuery(this).attr('name')+ '_SetQuantityLink';
						var setQuantityLink = jQuery('[name=' + name + ']');
						if(jQuery(setQuantityLink).length > 0) {
							setQuantityLink = jQuery(setQuantityLink).get(0);
							if(! this.value) this.value = 0;
							else this.value = this.value.replace(/[^0-9]+/g, '');
							var url = jQuery('base').attr('href') + setQuantityLink.value;
							var parts = url.split("?");
							if(parts.length > 1){
								url += '&quantity=' + this.value;
							}else{
								url += '?quantity=' + this.value;
							}
							jQuery.getJSON(url, null, setChanges);
						}
					}