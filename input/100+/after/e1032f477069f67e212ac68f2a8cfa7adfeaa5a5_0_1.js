function (name, transition, params) {
            params = Array.from(params);

            Animate.Transitions[name] = function (pos) {
                return transition(pos, params);
            };

            Animate.Transitions[name + "In"] = Animate.Transitions[name];

            Animate.Transitions[name + "Out"] = function (pos) {
                return 1 - transition(1 - pos, params);
            };

            Animate.Transitions[name + "InOut"] = function (pos) {
                return (pos <= 0.5 ? transition(2 * pos, params) : (2 - transition(2 * (1 - pos), params))) / 2;
            };

        }