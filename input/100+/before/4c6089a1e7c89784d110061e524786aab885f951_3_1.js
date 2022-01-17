function(evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) {
		var _latestValue,
			_hasBeenEvaluating = false,
			readFunction = evaluatorFunctionOrOptions;
		
		//single-parameter syntax - everything is on this "options" param
		if(readFunction && typeof readFunction == "object") {
			options = readFunction;
			readFunction = options["read"];
		}
		//Multi-parameter syntax - construct the options according to the params passed
		else {
			options = options || {};
			if(!readFunction)
				readFunction = options["read"];
		}
		
		if(typeof readFunction != "function")
			throw new Error("Pass a function that returns the value of the computed");
			
		var writeFunction = options["write"];
		if(!evaluatorFunctionTarget)
			evaluatorFunctionTarget = options["owner"];
			
		var _subscriptionsToDependencies = [];
		function disposeAllSubscriptionsToDependencies() {
			_.each(_subscriptionsToDependencies, function(subscription) {
				subscription.dispose();
			});
			_subscriptionsToDependencies = [];
		}
		
		//TODO dispose when DOM node is removed callbacks  
		var disposeWhen = options["disposeWhen"] || function() { return false };
		
		var evaluationTimeoutInstance = null;
		function evaluatePossibleAsync() {
			var throttleEvaluationTimeout = computed['throttleEvaluation'];
			if(throttleEvaluationTimeout && throttleEvaluationTimeout >= 0) {
				clearTimeout(evaluationTimeoutInstance);
				evaluationTimeoutInstance = setTimeout(evaluateImmediate, throttleEvaluationTimeout);
			}
			else
				evaluateImmediate();
		}
		
		function evaluateImmediate() {
			if(_isBeingEvaluated) {
				//its possible that a computed my have side-effects that trigger its own re-evaluation.  For predictability, computeds are prevented
				//from causing their own re-evaluation.
				return;
			}
			
			//Don't dispose on first evaluation because the "disposeWhen" callback might
			if(_hasBeenEvaluated && disposeWhen()) {
				dispose();
				return;
			}
			
			_isBeingEvaluated = true;
			try {
				var disposalCandidates = _.pluck(_subscriptionsToDependencies, 'target');
				dependencyDetection.begin(function(subscribable) {
					var inOld = _.indexOf(disposalCandidates, subscribable);
					if(inOld >= 0)
						disposalCandidates[inOld] = undefined; //Don't want to dispose this subscription, as it's still in use
					else
						_subscriptionsToDependencies.push(subscribable.subscribe(evaluatePossibleAsync)); //Brand new subscription
				});
				
				var newValue = readFunction.call(evaluatorFunctionTarget);
				
				 // For each subscription no longer being used, remove it from the active subscriptions list and dispose it
           		 for (var i = disposalCandidates.length - 1; i >= 0; i--) {
                	if (disposalCandidates[i])
                    	_subscriptionsToDependencies.splice(i, 1)[0].dispose();
           		}	
            	_hasBeenEvaluated = true;
            	
            	computed["notifySubscribers"](_latestValue, "beforeChange");
            	_latestValue = newValue;
			}
			finally {
				dependencyDetection.end();
			}
			
			computed["notifySubscribers"](_latestValue);
			_isBeingEvaluated = false;
		}
		
		function computed() {
			if(arguments.length > 0) {
				if(typeof writeFunction === "function") {
					//Writing a value
					writeFunction.apply(evaluatorFunctionTarget, arguments);
				}
				else 
					throw new Error("Cannot write a value to a computed unless you specify a 'write' option. If you wish to read the current value, don't pass any parameters.");
			}
			else {
				//Reading the value
				if(!_hasBeenEvaluated)
					evaluateImmediate();
				dependencyDetection.registerDependency(computed);
				return _latestValue;
			}
		}
		
		computed.peek = function() {
			if(!_hasBeenEvaluated)
				evaluateImmediate();
			return _latestValue;
		}
		
		computed.getDependenciesCount = function() { return _subscriptionsToDependencies.length };
		computed.hasWriteFunction = typeof options["write"] === "function";
		computed.dispose = function() { dispose(); };
		
		subscribable.call(computed);
		
		if(options['deferEvaluation'] !== true)
			evaluateImmediate();
			
		//TODO isComputed
	}