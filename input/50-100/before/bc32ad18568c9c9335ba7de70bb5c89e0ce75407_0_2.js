function(team) {
								var div = new Element('div',{'id':'T'+team});
								var input = new Element('input',
									{'type':'checkbox','name':team,'events':{'change':changeMpStatus}}
								).inject(div);
								var span = new Element('span',{
									'class':'tid',
									'events': {'click':teamClicked},
									'text':team
								}).inject(div);
								return div;
							}