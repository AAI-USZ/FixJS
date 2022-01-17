function(){
					if (i < json.data.length)
						EventBus.send('new_tuples', {
							statement_name: statement_name,
							data: [_addTuple(i)]});
					if (++i >= json.data.length)
						window.clearInterval(intervale);

				}