function(){
		// Call after fetching the profiles.  Should only need to be done once.
		for(var i = 0; i < agentDashboard.profiles.length; i++){
			var testnom = agentDashboard.profiles[i].name;
			nodes = dojo.query('#agentDashboard *[profile="' + testnom + '"]');
			if(nodes.length == 0){
				var profCache = agentDashboard.profiles[i];
				var profileTr = dojo.create('tr', {profile: testnom, purpose: 'profileDisplay'}, 'agentDashboardTable');
				dojo.create('td', {purpose: 'name', innerHTML: testnom}, profileTr);
				dojo.create('td', {purpose: 'agentCount', innerHTML: profCache.agentsCount}, profileTr);
				dojo.create('td', {purpose: 'idle', innerHTML: profCache.idle}, profileTr);
				//dojo.create('td', {purpose: 'incall', innerHTML: profCache.oncall}, profileTr);
				dojo.create('td', {purpose: 'released', innerHTML: profCache.released}, profileTr);
				//dojo.create('td', {purpose: 'wrapup', innerHTML: profCache.wrapup}, profileTr);
				profileTr.sub = dojo.subscribe('agentDashboard/profile/' + testnom + '/update', profileTr, function(inProf){
					this.cells[1].innerHTML = inProf.agentsCount;
					this.cells[2].innerHTML = inProf.idle;
					this.cells[3].innerHTML = inProf.released;

				//	this.cells[3].innerHTML = inProf.oncall;
				//	this.cells[5].innerHTML = inProf.wrapup;
				});
				profileTr.onclick = function(){
					var profileNom = this.getAttribute('profile');
					var profile = {};
					for(var i = 0; i < agentDashboard.profiles.length; i++){
						if(agentDashboard.profiles[i].name == profileNom){
							profile = agentDashboard.profiles[i];
							break;
						}
					}
					var agentDisps = dojo.query('#agentDashboardTable *[profile="' + profileNom + '"][purpose="agentDisplay"]');
					if(agentDisps[0].style.display == 'none'){
						agentDisps[0].style.display = '';
					} else {
						agentDisps[0].style.display = 'none';
					}
				}
				dojo.byId('agentDashboardTable').appendChild(profileTr);
				var menu = new dijit.Menu({});
				menu.addChild(new dijit.MenuItem({
					label:'Blab...',
					profile: testnom,
					onClick: function(){
						agentDashboard.showBlabDialog('profile', this.profile);
					}
				}));
				menu.bindDomNode(profileTr);
				agentDashboard.drawAgentTable(profCache);
				profileTr.style.display = '';
				if (profCache.agentsCount == 0) {
					profileTr.style.display = 'none';
				}
			}
		}
	}