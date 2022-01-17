function(error, response, body) {
			selfP.renamePending = false;
			if (body) {
				console.log('BODY: "'+body+'"');

				if (users[userid] && !users[userid].authenticated && users[userid].connected) {
					if (auth) {
						if (users[userid] !== selfP) users[userid].resetName();
					} else {
						selfP.emit('nameTaken', {userid:selfP.userid, token:token, reason: "Someone is already using the name \""+users[userid].name+"\"."});
						return false;
					}
				}
				var group = config.groupsranking[0];
				var avatar = 0;
				var authenticated = false;
				if (body !== '1') {
					authenticated = true;

					if (userid === "serei") avatar = 172;
					else if (userid === "hobsgoblin") avatar = 52;
					else if (userid === "etherealsol") avatar = 1001;
					else if (userid === "ataraxia") avatar = 1002;
					else if (userid === "verbatim") avatar = 1003;
					else if (userid === "mortygymleader") avatar = 144;
					else if (userid === "leadermorty") avatar = 144;
					else if (userid === "leaderjasmine") avatar = 146;
					else if (userid === "championcynthia") avatar = 260;
					else if (userid === "aeo") avatar = 167;
					else if (userid === "aeo1") avatar = 167;
					else if (userid === "aeo2") avatar = 166;
					else if (userid === "sharktamer") avatar = 7;
					else if (userid === "bmelts") avatar = 1004;
					else if (userid === "n") avatar = 209;

					try {
						var data = JSON.parse(body);
						switch (data.group) {
						case '2':
							group = '&';
							break;
						case '3':
							group = '+';
							break;
						case '4':
							group = '%';
							break;
						case '5':
							group = '@';
							break;
						}
						userid = data.userid;
						name = data.username;
						/* var userdata = JSON.parse(body.userdata);
						avatar = parseInt(userdata.trainersprite);
						if (!avatar || avatar > 263 || avatar < 1) {
							avatar = 0;
						} */
					} catch(e) {
					}
					if (usergroups[userid]) {
						group = usergroups[userid].substr(0,1);
					}
				}
				if (users[userid] && users[userid] !== selfP) {
					// This user already exists; let's merge
					var user = users[userid];
					if (selfP === user) {
						// !!!
						return true;
					}
					for (var i in selfP.roomCount) {
						getRoom(i).leave(selfP);
					}
					for (var i=0; i<selfP.people.length; i++) {
						console.log(''+selfP.name+' preparing to merge: socket '+i+' of '+selfP.people.length);
						user.merge(selfP.people[i]);
					}
					selfP.roomCount = {};
					selfP.people = [];
					selfP.connected = false;
					if (!selfP.authenticated) {
						selfP.group = config.groupsranking[0];
					}

					user.group = group;
					if (avatar) user.avatar = avatar;
					user.authenticated = authenticated;
					user.ip = selfP.ip;

					if (userid !== selfP.userid) {
						// doing it this way mathematically ensures no cycles
						delete prevUsers[userid];
						prevUsers[selfP.userid] = userid;
					}
					for (var i in selfP.prevNames) {
						if (!user.prevNames[i]) {
							user.prevNames[i] = selfP.prevNames[i];
						}
					}
					if (selfP.named) user.prevNames[selfP.userid] = selfP.name;
					return true;
				}

				// rename success
				selfP.token = token;
				selfP.group = group;
				if (avatar) selfP.avatar = avatar;
				return selfP.forceRename(name, authenticated);
			} else if (tokens[1]) {
				console.log('BODY: ""');
				// rename failed, but shouldn't
				selfP.emit('nameTaken', {userid:userid, name:name, token:token, reason: "Your authentication token was invalid."});
			} else {
				console.log('BODY: ""');
				// rename failed
				selfP.emit('nameTaken', {userid:userid, name:name, token:token, reason: "The name you chose is registered"});
			}
			return false;
		}