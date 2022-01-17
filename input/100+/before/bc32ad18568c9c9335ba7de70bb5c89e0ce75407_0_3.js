function (response) {
										var div = new Element('div',{'id':'S'+response.tid});
										var span = new Element('span',{
											'class':'tid',
											'events': {'click':tnicClicked},
											'text':response.tid
										}).inject(div);
										if($$('#tnic div').every(function(item,i) {
											if(item.getElement('span').get('text') > response.tid) {
												div.inject(item,'before');
												return false;
											}
											return true;
										})) {
											$('tnic').adopt(div);
										} 
										team.getParent().dispose();
									}