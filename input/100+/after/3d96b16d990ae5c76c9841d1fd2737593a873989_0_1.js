function(){
					// init zoom dialogue
					_diaZoom.dialog({
						autoOpen: false,
						modal: true,
						height: parseInt(_diaZoom.children('img').attr('height')) + 60,
						width: parseInt(_diaZoom.children('img').attr('width')) + 30
					});
					// init zoom button
					_btnZoom.button({
						icons: {
							primary: "ui-icon-zoomin"
						}
					}).click(function(){
						_diaZoom.dialog('open');
					});
					_btnEdit.button({
						icons: {
							primary: "ui-icon-wrench"
						}
					}).click(function(){
						$.ajax({
							async: false,
							type: 'POST',
							url: iceEasyGlobalL10n.ajax_url,
							data: {
								'action': 'ice_options_uploader_image_edit',
								'attachment_id': $this.iceEasyUploader('attach').id()
							},
							success: function(r){
								_btnEdit.after('<div></div>');
								var _btnDia = _btnEdit.next();
								_btnDia.empty();
								_btnDia.append(r);
								_btnDia.dialog({
									modal: true,
									draggable: false,
									width: 600,
									title: 'Edit Image',
									zIndex: 3,
									buttons: {
										"Close": function() {
											$(this).dialog("close");
										}
									},
									beforeClose: function(){
										$this.iceEasyUploader('attach').update()
									}
								});
							}
						});
					});
					// init rem button
					_btnRem.button({
						icons: {
							primary: "ui-icon-trash"
						}
					}).click(function(){
						$this.iceEasyUploader('attach').id('');
						return false;
					});
					// display on load?
					var attachId = $this.iceEasyUploader('attach').id();
					if ( !isNaN(parseInt(attachId)) ) {
						this.show();
					}
				}