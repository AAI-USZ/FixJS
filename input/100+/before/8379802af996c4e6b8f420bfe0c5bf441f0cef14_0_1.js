function(err, response) {
				tick();
				if(err) throw err;
				card.started = '';
				card.finished = '';
				response.forEach(function(action) {
					var list = action.data.listAfter.name;
					var startedAction = list == 'In Arbeit' || 'Ready';
					var doneAction = list.indexOf('Released') == 0; //Some type of release
					var newDate = new Date(action.date);
					if(startedAction) {
						if(!card.started) card.started = newDate;
						if(card.started && newDate < card.started) card.started = newDate;	
					}
					if(doneAction && !card.finished) {
						card.finished = newDate;
					}
				});
				//fallback
				if(!card.started) {
					console.log("couldn't find a real start date using created card")
					api.get('/1/cards/' + card.card_id + '/actions', {filter:'createCard'}, function(err, response) {
						if(err) throw err;
						var list = response[0].data.list.name;
						var newDate = new Date(response[0].date);
						card.started = newDate;
						card.finished = newDate;
						data2.push(card);
						callback2(null);
					});
				} else {
					data2.push(card);
					callback2(null);
				}
			}