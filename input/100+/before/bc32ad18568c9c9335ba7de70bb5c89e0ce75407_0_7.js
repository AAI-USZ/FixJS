function(div) {
					var answer;
					var noopts;
					$('userpick').empty();  //if round changes the user picks will need to change also, so just clear it out and let the user reload if he wants to
					var setMatchEvents = function (div) {
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
		 
					};
					var changeSelectedAnswer = function(e) {
					  //called when an option has been selected as the correct answer
						e.stop();
						if(this.checked) {
							var changeAnsReq = new MBB.req('changeselans.php', function(response) {
								answer = response.opid;
								$('answer').value = answer;
							});
					    	changeAnsReq.get(Object.merge(params,{'opid':this.value}));
						}
					};
					var changeAnswer = function(e) {
						e.stop();
						if(MBB.textValidate(this)) {
					  		var changeAnsReq = new MBB.req('changeans.php', function(response) {
								//Nothing to do here?
							});
							changeAnsReq.get(Object.merge(params,{'opid':this.name,'label':this.value}));
						}
					};
					var deleteAnswer = function(e) {
						e.stop();
						var deleteAnsReq = new MBB.req('deleteans.php', function(response) {
							e.target.getParent().getParent().dispose();
							var nullAnsRow = $('nullanswer').getParent().getParent();
							if(nullAnsRow.getNext() == null) {
								nullAnsRow.dispose();
								$('answer').readOnly = false;
								$('answer').value = '';
								answer = 0;
								noopts = 0;
							} else {
								if (response.opid == answer) {
									$('nullanswer').checked = true;
									$('answer').value = 0;
									answer = 0;
								}
							}
							$('userpick').empty();
						});
						deleteAnsReq.get(Object.merge(params,{'opid':this.get('id').substr(1).toInt()}));
					};
					if(params.rid != 0) {
						MBB.adjustDates(div);
						elAns =$('answer');
						if(elAns.value == '') {
							answer = 0;
						} else {
							answer = elAns.value.toInt();
						}
						var dead = $('deadline');
						var oldtime = dead.value;
						var deadcal = new Calendar.Single(dead,{format:'j M Y g:i a (D)',width:'235px',onHideStart:function(){
							if(new Date(dead.value *1000) > new Date() || confirm(messages.quesdead)){
								oldtime = dead.value;
								dead.fireEvent('change');
							} else {
								dead.value = oldtime;
								deadcal.resetVal();
							}
							return true;
						}});
						div.getElements('input').append(div.getElements('textarea')).addEvent('change', function(e) {
							if (this.id == 'ou') {
								//if ou changes then all the matches combined scores are diabled or not
								$('matches').getElements('input[name=cscore]').each(function(item) {
									item.readOnly = ! e.target.checked;
								});
							}
							var validated = true;
							
							if (!MBB.intValidate($('value'))) {
								validated = false;
							}
							if (!MBB.intValidate(elAns)) {
								validated = false;
							}
							if (!MBB.textValidate($('rname'))) {
								validated = false;
							}
							if(validated & this.name =='question') {
								// with emoticons it is possible for the change event on this element to fire twice
								// this check prevents a round trip to the server when it is not necessary
								var oldcontent = this.retrieve('old');
								this.store('old',this.value);
								if (oldcontent == this.value) validated = false;
							}	
							// Ask user to confirm if he wants to open a round with no open matches
							if ( validated && this.name == 'open' && this.checked) {
								var openmatches = $('matches').getElements('input[name=open]');
								if(openmatches.length == 0 ||
										openmatches.every(function (match) {
											return (!match.checked);
										})
									) {
									if (! confirm(messages.nomatchround)) {
										validated = false;
										this.checked = false;
									}
								}
							}
							if(validated) {
								var updateReq = new MBB.req('updateround.php', function(response) {
									//Should not be necessary to update page
									$('userpick').empty(); //but user picks may have changed
								});
								updateReq.post($('roundform'));
							}
						});
						var scoreMap = [1,2,4,6,8,12,16];
						var points = div.getElement('input[name=value]');
						var slider = div.getElement('.slider');
						var knob = slider.getElement('.knob');
						var stepValue = scoreMap.indexOf(points.value.toInt());
						if (stepValue < 0) stepValue = 0;
						new Slider(slider,knob,{
						  minstep:0,
						  maxstep:6,
						  initial:stepValue,
						  minortick:1,
						  majortick:10,
						  onTick:function(step) {
						    knob.set("text",scoreMap[step]);
						  },
						  onChange:function(step) {
						    points.value = scoreMap[step];
						    var updateReq = new MBB.req('updateround.php', function(response) {
							    //Should not be necessary to update page
							    $('userpick').empty(); //but user picks may have changed
						    });
						    updateReq.post($('roundform'));
						  }
						});
						// if user clicks on create option area we need to create an option
						$('option').addEvent('click', function(e) {
							e.stop();
							if (typeof(noopts) == 'number' ) { //if set option page must have loaded
								var newOptionReq = new MBB.req('createoption.php', function(response) {
									$('answer').readOnly = true;
									if (noopts == 0) {
									//We just created our first option, so we also have to create the no answer row first
										var nuloption = new Element('tr').adopt(
											new Element('td').adopt(
												new Element('input',{
													'id':'nullanswer',
			 										'type':'radio',
			  										'name':'option',
			   										'value':0,
													'checked':true,
													'events':{'change':changeSelectedAnswer}
												})
											)
										).adopt(
											new Element('td',{
												'colspan':2
											}).adopt(
												new Element('span',{
													'text':'No Answer Set Yet'
												})
											)
										).inject($('optionform').getElement('tbody'));
										answer = 0;
										$('answer').value = 0;
									}
									var option = new Element('tr').adopt(
										new Element('td').adopt(
											new Element('input',{
												'type':'radio',
												'name':'option',
												'class':'option_select',
												'value':response.opid,
												'events':{'change':changeSelectedAnswer}
											})
										)
									).adopt(
										new Element('td').adopt(
											new Element('input',{
												'type':'text',
			 									'name':response.opid,
			 									'class':'option_input',
			 									'events':{'change':changeAnswer}
											})
										)
									).adopt(
										new Element('td').adopt(
											new Element('div',{
												'id':'O'+response.opid,
												'class':'del',
												'events':{'click':deleteAnswer}
											})
										)
									).inject($('optionform').getElement('tbody'));
									noopts = response.opid; //should be one more than before (no need to update hidden input - its ignored
									$('userpick').empty();
								});
								newOptionReq.get(Object.merge(params,{'opid':noopts+1}));
							}
						});
						if (emoticons) {
							emoticons.addTextareas(div.getElements('textarea'));
						} else {
							emoticons = new MBB.emoticon($('emoticons'),$('content').getElements('textarea'));
						}
					} else {
						answer =0;
					}
					//Initialise Round Data Form
					this.matches = new MBB.subPage(this,'matches.php',$('matches'),function (div) {
						if (params.cid !=0 && params.rid != 0) {
							MBB.adjustDates(div);
							div.getElements('.match').each(function(match) {
								setMatchEvents(match);
							});
							if (emoticons) {
								emoticons.addTextareas(div.getElements('textarea'));
							} else {
								emoticons = new MBB.emoticon($('emoticons'),$('content').getElements('textarea'));
							}
						}
						$('userpick').empty();
					});
					this.options = new MBB.subPage(this,'options.php',$('options'),function(div) {
						if (params.cid != 0 && params.rid != 0) {
							noopts = $('noopts').value.toInt();
							if (noopts != 0) {
								$('answer').readOnly = true;
								$('nullanswer').addEvent('change',changeSelectedAnswer);
								var of = $('optionform');
								of.getElements('.option_select').addEvent('change',changeSelectedAnswer);
								of.getElements('.option_input').addEvent('change',changeAnswer);
								of.getElements('.del').addEvent('click',deleteAnswer);
							}
						}
						$('userpick').empty();
					});
					this.teams = new MBB.subPage(this,'teams.php',$('teams'),function (div) {
						if (params.cid != 0) {
							var lock = $('lock');
							var tnicClicked;
							var teamClicked = function (e) {
								e.stop();
								var team = this;
								if(!lock.checked) {
									var remTiC = new MBB.req('remtic.php', function (response) {
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
									});
									remTiC.get({'cid':params.cid,'tid':team.get('text')});	
								} else {
									//only do something if not already in a match
									if(!this.getParent().hasClass('inmatch')) {
										var teamName = this.get('text');
										if ($$('.match').every(function(match) {
											var hidSpan = match.getElement('input[name=hid]'); 
											if(hidSpan.value == '') {
												// found a match so we can add this team to it
												var addhidReq = new MBB.req('addhid.php', function(response) {
													hidSpan.value = teamName;
													match.getElement('div.hid').getFirst().set('text',teamName);
													team.getParent().addClass('inmatch');
												});
												addhidReq.get(Object.merge(params,{
													'aid':match.getElement('input[name=aid]').value,
													'hid':teamName}));
												return false;
											}
											return true;
										})){
											// Was no match with missing AID, so create new match
											var match = new Element('div',{'class':'match'});
											match.inject($('matches'));
											var matchPage = new MBB.subPage(this,'creatematch.php',match, function(div) {
												if (!$('ou').checked)  match.getElement('input[name=cscore]').readOnly=true;
												setMatchEvents(match);
												team.getParent().addClass('inmatch');
											});
											matchPage.loadPage(Object.merge(params,{'aid':teamName}));
										}
									}
								}
							};
							var changeMpStatus = function(e) {
								var mpReq = new MBB.req('updatepostate.php',function(response) {
								});
								mpReq.get({'cid':params.cid,'tid':this.name,'mp':this.checked});
							};
							var makeTeam = function(team) {
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
							};
							tnicClicked = function(e) {
								e.stop();
								if(!lock.checked) {
									var team=this;
									var addTiC = new MBB.req('addtic.php', function (response) {
										var div = makeTeam(response.tid);
										if($$('#tic div').every(function(item,i) {
											if(item.getElement('span').get('text') > response.tid) {
												div.inject(item,'before');
												return false;
											}
											return true;
										})) {
											$('tic').adopt(div);
										} 
										team.getParent().dispose();
									});
									addTiC.get({'cid':params.cid,'tid':team.get('text')});
								} else {
									$('lock_cell').highlight('#F00');
								}
							};
							$$('#tic span').addEvent('click',teamClicked);
							$$('#tnic span').addEvent('click',tnicClicked);
							$$('#tic input').addEvent('change',changeMpStatus);
							$('addall').addEvent('click',function(e) {
								e.stop();
								if(!lock.checked) {
									var addAll = new MBB.req('addalltic.php', function (response) {
										var teams = response.teams;
										$('tnic').empty();
										var tic = $('tic').empty();
										teams.each(function(team,i) {	
											tic.adopt(makeTeam(team));
										});
									});
									addAll.get({'cid':params.cid});
								} else {
									$('lock_cell').highlight('#F00');
								}
							});
						}
					});
					if (params.rid != 0){
						this.matches.loadPage(Object.merge(params,{'ou':$('ou').checked }));
						this.options.loadPage(Object.merge(params,{'answer':answer}));
					} else {
						this.matches.loadPage(params);
						this.options.loadPage(params);
					}
					this.teams.loadPage(params);
				}