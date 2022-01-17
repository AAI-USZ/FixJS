function (returned) {
							if (returned == 0){
								console.log('Error: Cannot insert!!.');
								
							} else {
								document.getElementById('welcome').style.display = 'none';
								jQuery('#chat').show();
								
								// add div to side box menu
								var data = returned.split(' ');
								var jid = data[0];
								var name = data[1] + ' ' + data[2];
								var pic = data[3];
								Client.show_new_contact(jid, name, pic);
								
								course_members_jids = data.slice(4, data.length);
								console.log(course_members_jids);
								
								jQuery(document).trigger('connected', [course_members_jids]);
							}
				        }