function(profCache){
		var profile = profCache.name;
		var profileAgentsTr = dojo.create('tr', {'profile': profile, purpose: 'agentDisplay', style:'display:none'});
		dojo.place(profileAgentsTr, dojo.query('#agentDashboardTable *[profile="' + profile + '"][purpose="profileDisplay"]')[0], 'after');
		// make the odd even stripping consistant w/ queueDashboard
		dojo.create('tr', {style:'display:none'}, profileAgentsTr, 'before');

		var widetd = dojo.create('td', {colspan: 6}, profileAgentsTr);
		var table = dojo.create('table', {'width':'100%'}, dojo.create('div', {'class':'subData'}, widetd));
		table.innerHTML = '<tr>' + 
		'<th>name</th>' +
		'<th>state</th>' +
		'<th>time</th>' +
		'<th>util</th>' +
		'<th>Details</th>';
		var tbody = dojo.query('#agentDashboardTable *[profile="' + profile + '"][purpose="agentDisplay"] table')[0];
		for(var i in profCache.agents){
			agentDashboard.drawAgentTableRow(profCache, profCache.agents[i], tbody);
		}
		if (profCache.agentsCount == 0) {
			profileAgentsTr.style.display = 'none';
		}
	}