function (div) {
						var ou = $('ou');
						if (!ou.checked) {
							div.getElement('input[name=cscore]').readOnly = true;
						}
						var matchtime = div.getElement('input[name=mtime]');
						var oldtime = matchtime.value;
						var matchcal = new Calendar.Single(matchtime,{format:'D j M g:ia',width:'172px',onHideStart:function(){
							if(new Date(matchtime.value *1000) > new Date() || confirm(messages.matchtime)){
								oldtime = matchtime.value;
								matchtime.fireEvent('change');
							} else {
									matchtime.value = oldtime;
									matchcal.resetVal();
							}
							return true;
						}});

						div.getElements('input[type=text]').append(div.getElements('input[type=checkbox]')).append(div.getElements('textarea')).addEvent('change', function(e) {
						  e.stop();
						  var validated = true;
							if(validated && (this.name == 'cscore'
									|| this.name == 'ascore' 
									|| this.name == 'hscore')) {
								if(!MBB.intValidate(this)) {
									validated = false;
								}
							}
							if (validated && this.name == 'open' && this.checked) {
								var hid = div.getElement('input[name=hid]');
								if (hid.value ==  '' || hid.value == null) {
									this.checked = false;
									validated = false;
									hid.highlight('#F00');
								}
								if ( validated && (matchtime.value == '' || matchtime.value == 0)) {  //Ask user to confirm if no matchdate is set
									if (!confirm(messages.nomatchdate)) {
										validated = false;
										this.checked = false;
									}
								}

							}
							if(validated & this.name =='comment') {
								// with emoticons it is possible for the change event on this element to fire twice
								// this check prevents a round trip to the server when it is not necessary
								var oldcontent = this.retrieve('old');
								this.store('old',this.value);
								if (oldcontent == this.value) validated = false;
							}	
							if (validated) {
								var updateReq = new MBB.req('updatematch.php',function(response) {
								  //Should not be necessary to update page (but may have effected the user picks part)
								  $('userpick').empty();
								});
								updateReq.post(div.getElement('form'));
							}
						});
						div.getElement('.aid').addEvent('click',function(e) {
							e.stop();
							// switch aid/hid over
							var hid = div.getElement('input[name=hid]');
							if(hid.value != null && hid.value != '' ) {
								// Can only switch if aid exists
								var switchReq = new MBB.req('switchaid.php',function(response){
									div.getElement('input[name=aid]').value = response.aid;
									hid.value = response.hid;
									e.target.set('text',response.aid);
									div.getElement('.hid').getFirst().set('text',response.hid);
									$('userpick').empty();
								});
								switchReq.get(Object.merge(params,{'aid':this.getElement('span').get('text')}));
							}
						});
						div.getElement('.hid').addEvent('click',function(e) {
							e.stop();
							var hid = div.getElement('input[name=hid]');
							if(hid.value != null && hid.value != '' ) {
								var open = div.getElement('input[name=open]');
								if (open.checked) {
									open.highlight('#F00');
								} else {
									var removehidReq = new MBB.req('removehid.php',function(response){
									// remove hid from match
										hid.value = null;
										e.target.set('text','---');
										$('T'+response.hid).removeClass('inmatch');
										$('userpick').empty();
									});
								}
								removehidReq.get(Object.merge(params,{'haid':div.getElement('input[name=aid]').value}));
							}
						});
						div.getElement('.del').addEvent('click',function(e) {
						  e.stop(); 
							if(confirm(messages.deletematch)) {
								var deleteReq = new MBB.req('deletematch.php',function(response) {
									div.dispose();
									$('T'+response.aid).removeClass('inmatch');
									var hid = $('T'+response.hid);
									if(hid) hid.removeClass('inmatch'); //only if not null
									$('userpick').empty();
								});
								deleteReq.get(Object.merge(params,{'aid':div.getElement('input[name=aid]').value}));
							}
						});
						var underdog = div.getElement('input[name=underdog]');
						var scoreMap = [0,1,2,4,8,12];  //This maps the individual absolute value of the slider to a score increment
						var AwayUnder = false;	//set true if we need to negate values (because its the array side that is the underdog
						var inputValue = underdog.value.toInt();
						if (inputValue < 0) {
						  AwayUnder = true;
						  inputValue = - inputValue;
						}
						var indexedValue = scoreMap.indexOf(inputValue);  //convert from score to step value
						if (indexedValue < 0 ) indexedValue = 0;
						if (AwayUnder && indexedValue > 0){
						  indexedValue = -indexedValue;
						  div.getElement('.aid').getElement('span').addClass('isUnderdog');
						  div.getElement('.open').addClass('isUnderdog');
						} else if (indexedValue != 0) {
						  div.getElement('.hid').getElement('span').addClass('isUnderdog');
						  div.getElement('.open').addClass('isUnderdog');
						} 
						var slider = div.getElement('.slider');
						var knob = slider.getElement('.knob');
						new Slider(slider,knob,{
						  minstep:-5,
						  maxstep:5,
						  initial:indexedValue,
						  minortick:1,
						  majortick:10,
						  onTick: function(step) {
						    knob.set("text",scoreMap[Math.abs(step)]);
						  },
						  onChange:function(step) {
						    if (step == 0) {
						      div.getElement('.aid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.hid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').removeClass('isUnderdog');
						      underdog.value = 0;
						    } else if (step < 0 ) {
						      div.getElement('.aid').getElement('span').addClass('isUnderdog');
						      div.getElement('.hid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').addClass('isUnderdog');
						      underdog.value = -scoreMap[-step];
						    } else {
						      div.getElement('.hid').getElement('span').addClass('isUnderdog');
						      div.getElement('.aid').getElement('span').removeClass('isUnderdog');
						      div.getElement('.open').addClass('isUnderdog');
						      underdog.value = scoreMap[step];
						    }
						    var updateReq = new MBB.req('updatematch.php',function(response) {
							//Should not be necessary to update page (but may have effected the user picks part)
						      $('userpick').empty();
						    });
						    updateReq.post(div.getElement('form'));
						  }
						});
		 
					}