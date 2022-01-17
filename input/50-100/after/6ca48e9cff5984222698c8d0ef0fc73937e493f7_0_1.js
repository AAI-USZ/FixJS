function() {
					commentBox.val(commentBox.val().replace(/>>(\d\d\d\d\d\d\d\d\d)/g, ">>>/b/$1"));
					$jq(".thread .post", document).each(function() {
						var id = this.id.substring(1);
						commentBox.val(commentBox.val().replace(new RegExp(">>>/b/"+id, "g"), ">>"+id));
					});
					commentBox[0].dispatchEvent(new Event("input"));
				}