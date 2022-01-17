function(when) {

	"use strict";

	function Lifecycle(config) {
		this._config = config;
		this._lifecycle = {};

		this._lifecycle.startup = generateSteps(config.lifecycleSteps.startup);
		this._lifecycle.shutdown = generateSteps(config.lifecycleSteps.shutdown);
	}

	Lifecycle.prototype = {
		startup: function(proxy) {
			return processLifecycle(proxy, this._lifecycle.startup, this._config);
		},

		shutdown: function(proxy) {
			return processLifecycle(proxy, this._lifecycle.shutdown, this._config);
		}
	};

	return Lifecycle;

	function processLifecycle(proxy, steps, config) {
		return when.reduce(steps,
			function (unused, step) {
				return processFacets(step, proxy, config);
			}, proxy);
	}

	function processFacets(step, proxy, config) {
		var promises, options, name, spec, facets;
		promises = [];
		spec = proxy.spec;

		facets = config.facets;

		for (name in facets) {
			options = spec[name];
			if (options) {
				processStep(promises, facets[name], step, proxy, options, config.pluginApi);
			}
		}

		var d = when.defer();

		when.all(promises,
			function () {
				return when.chain(processListeners(step, proxy, config), d, proxy.target);
			},
			function (e) { d.reject(e); }
		);

		return d;
	}

	function processListeners(step, proxy, config) {
		var listeners, listenerPromises;

		listeners = config.listeners;
		listenerPromises = [];

		for (var i = 0; i < listeners.length; i++) {
			processStep(listenerPromises, listeners[i], step, proxy, {}, config.pluginApi);
		}

		return when.all(listenerPromises);
	}

	function processStep(promises, processor, step, proxy, options, pluginApi) {
		var facet, facetPromise;

		if (processor && processor[step]) {
			facetPromise = when.defer();
			promises.push(facetPromise);

			facet = Object.create(proxy);
			facet.options = options;
			processor[step](facetPromise.resolver, facet, pluginApi);
		}
	}

	function generateSteps(steps) {
		return steps.reduce(reduceSteps, []);
	}

	function reduceSteps(lifecycle, step) {
		lifecycle.push(step + ':before');
		lifecycle.push(step);
		lifecycle.push(step + ':after');
		return lifecycle;
	}
}