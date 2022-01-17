function testPaging(t){
				var results, opts = {count: 25, sort: [{attribute: "order"}]};
				results = window.results = [
				    bigStore.query({}, dojo.delegate(opts, {start: 0})),
				    bigStore.query({}, dojo.delegate(opts, {start: 25})),
				    bigStore.query({}, dojo.delegate(opts, {start: 50})),
				    bigStore.query({}, dojo.delegate(opts, {start: 75}))
				];
				var observations = [];
				var lastR;
				dojo.forEach(results, function(r, i){
				    r.observe(function(obj, from, to){
				    	observations.push({from: from, to: to});
				        console.log(i, " observed: ", obj, from, to);
				    }, true, lastR);
				    lastR = r;
				});
				bigStore.add({id: 101, name: "one oh one", order: 2.5});
				t.is(results[0].length, 26);
				t.is(results[1].length, 25);
				t.is(results[2].length, 25);
				t.is(results[3].length, 25);
				t.is(observations.length, 1);
				bigStore.remove(101);
				t.is(observations.length, 2);
				t.is(results[0].length, 25);
				debugger;
				bigStore.add({id: 102, name: "one oh two", order: 24.5});
				t.is(results[0].length, 25);
				t.is(results[1].length, 26);
				t.is(results[2].length, 25);
				t.is(observations.length, 3);
            }