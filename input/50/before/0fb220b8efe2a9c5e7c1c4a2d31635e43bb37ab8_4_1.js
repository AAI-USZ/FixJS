function(event) {
									var kStudent = $("#kStudent").val();
									if (kStudent != '') {
										document.location = "index.php?target=student&action_task=view&kStudent="
												+ kStudent;
									} else {
										document.location = document.location;
									}
								}