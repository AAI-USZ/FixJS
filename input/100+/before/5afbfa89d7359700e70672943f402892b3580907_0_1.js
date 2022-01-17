function (/*Object*/ props) {

		var prop,

			propsList = [],

			customProp = L.Transition.CUSTOM_PROPS_PROPERTIES;



		for (prop in props) {

			if (props.hasOwnProperty(prop)) {

				prop = customProp[prop] ? customProp[prop] : prop;

				prop = this._dasherize(prop);

				propsList.push(prop);

			}

		}



		this._el.style[L.Transition.DURATION] = this.options.duration + 's';

		this._el.style[L.Transition.EASING] = this.options.easing;

		this._el.style[L.Transition.PROPERTY] = propsList.join(', ');



		for (prop in props) {

			if (props.hasOwnProperty(prop)) {

				this._setProperty(prop, props[prop]);

			}

		}



		this._inProgress = true;



		this.fire('start');



		if (L.Transition.NATIVE) {

			clearInterval(this._timer);

			this._timer = setInterval(this._onFakeStep, this.options.fakeStepInterval);

		} else {

			this._onTransitionEnd();

		}

	}