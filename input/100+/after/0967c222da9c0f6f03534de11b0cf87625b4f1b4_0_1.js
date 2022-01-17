function (res) {
			if (!this.trace) return;

			function onResolve(res) {
				// for now, only save primitive values
				this.vars = {};
				for (var i in res.result) {
					var info = res.result[i];
					this.vars[info.name] = info.value.value;
				}
				console.log(res.result);
			}

			var callFrames = res.callFrames;
			this.trace.push({ date: new Date().getTime(), callFrames: callFrames });
			$(this).triggerHandler("trace", this);

			// resolve call frame scope variables
			var cf = callFrames[0];
			if (!cf || !cf) return;
			for (var i in cf.scopeChain) {
				Inspector.Runtime.getProperties(cf.scopeChain[i].object.objectId, true, onResolve.bind(cf.scopeChain[i]));
			}
		}