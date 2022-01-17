function(profile, agent){
		var tr = dojo.create('tr', {'agent':escape(agent.id)});//, tbody, 'last');
		var now = Math.floor(new Date().getTime() / 1000);
		dojo.create('td', {'agent':escape(agent.id), purpose:'name', innerHTML:agent.name}, tr);
		dojo.create('td', {'agent':escape(agent.id), purpose:'state', style: 'background-image:url("/images/' + agent.state + '.png")'}, tr);
		dojo.create('td', {'agent':escape(agent.id), purpose:'time', innerHTML: formatseconds(now - agent.lastchange)}, tr);
		dojo.create('td', {'agent':escape(agent.id), purpose:'util', innerHTML: Math.floor(agent.calcUtilPercent()) + '%'}, tr);
		dojo.create('td', {'agent':escape(agent.id), purpose:'details', innerHTML:agent.statedataDisplay()}, tr);
		//name, state, time, util, details
		var tbody = dojo.query('#agentDashboardTable *[profile="' + profile.name + '"][purpose="agentDisplay"] table')[0];
		var agentRows = dojo.query('tr[agent]', tbody);
		var i = 0;
		for(i; i < agentRows.length; i++){
			var agentId = agentRows[i].getAttribute('agent');
			var compName = profile.agents[unescape(agentId)].name;
			if(compName > agent.name){
				break;
			}
		}
		dojo.place(tr, tbody, i + 1);
		tr.subs = [];
		tr.subs.push(dojo.subscribe('agentDashboard/agent/' + agent.id + '/update', tr, function(inAgent){
			var nowTime = Math.floor(new Date().getTime() / 1000);
			tr.cells[1].style.backgroundImage = 'url("/images/' + inAgent.state + '.png")';
			tr.cells[2].innerHTML = formatseconds(nowTime - inAgent.lastchange);
			tr.cells[3].innerHTML = Math.floor(inAgent.calcUtilPercent()) + '%';
			tr.cells[4].innerHTML = inAgent.statedataDisplay();
		}));
		var menu = agentDashboard.makeMenu(profile.name, agent.id);
		menu.bindDomNode(tr);
	}