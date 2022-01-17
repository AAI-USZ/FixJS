function (options, value) {
            var svalue = typeOf(value),
                start = +(new Date),
                current = start,
                update_interval,
                animation,
                kvalue,
                fvalue,
                i,
                max,
                ovalue = {
                    "0%" : {},
                    "100%" : {}
                };

            // <debug>
            if (typeOf(options) != "object") {
                throw new Error("options must be an object!");
            }
            if (typeOf(options.time) != "number") {
                throw new Error("options.time must be a number!");
            }
            if (["number", "array", "object"].indexOf(svalue) === -1) {
                throw new Error("value must be a number, array or object!");
            }
            if (["number", "array"].indexOf(svalue) !== -1 && typeOf(options.property) != "string") {
                throw new Error("options.property must be a string if value is [number|array]");
            }
            // </debug>


            // defaults
            animation = {
                property : options.property,
                time : options.time,
                transition : options.transition || Animate.Transitions.linear,
                fps : Math.round(1000 / options.fps) || 85, // 1000 / 12
                queue : options.queue || false
            };

            // normalize value input to internal format
            switch (svalue) {
            case "array":
                ovalue["0%"][options.property] = value[0];
                ovalue["100%"][options.property] = value[1];
            break;
            case "number":
                ovalue["0%"][options.property] = this[options.property];
                ovalue["100%"][options.property] = value;
            break;
            case "object":
                if (value.hasOwnProperty("from") && value.hasOwnProperty("to")) {
                    ovalue["0%"][options.property] = value.from;
                    ovalue["100%"][options.property] = value.to;
                } else {
                    ovalue = value;
                }
            break;
            }
            // <debug>
            /* !ovalue.hasOwnProperty("0%") || */
            if (!ovalue.hasOwnProperty("100%")) {
                throw new Error("values as object must have 0%-100% or from/to");
            }
            // </debug>

            ovalue = normalize_animation_data(ovalue, this);
            animation.properties = Object.keys(ovalue["0%"]);

            fvalue = Object.keys(ovalue);
            kvalue = Object.keys(ovalue);
            max = kvalue.length;
            for (i = 0; i < max; ++i) {
                fvalue[i] = parseFloat(kvalue[i]) / 100;
            }
            fvalue.sort();

            animation.getValue = function (factor, property) {
                var i,
                    max = kvalue.length,
                    rfactor,
                    found = false;

                for (i = 0; i < max; ++i) {
                    if (fvalue[i] <= factor) {

                        if (i === max - 1) {
                            //last element
                            found = true;
                            --i;
                        }

                        if (fvalue[i + 1] > factor) {
                            found = true;
                        }

                        if (found === true) {
                            //next one is greater
                            rfactor = (factor - fvalue[i]) / (fvalue[i + 1] - fvalue[i]);

                            return rebuild_property(this, property, ovalue[kvalue[i]][property], ovalue[kvalue[i + 1]][property], factor);

                            return ((ovalue[kvalue[i + 1]][property] - ovalue[kvalue[i]][property]) * factor) + ovalue[kvalue[i]][property];
                        }
                    }
                }
                throw new Error("unreachable");
            }.bind(this);

            function update() {
                var now = +(new Date),
                    elapsed = now - current,
                    elapsed_total = now - start,
                    tfactor = Math.min(1, elapsed_total / animation.time),
                    factor = animation.transition(tfactor),
                    i,
                    max;

                current = now;

                max = animation.properties.length;
                for(i = 0; i < max; ++i) {
                    this[animation.properties[i]] = animation.getValue(factor, animation.properties[i]);
                    //console.log("update", animation.properties[i], ":", factor, "=", this[animation.properties[i]]);
                }


                if (tfactor === 1) {
                    clearInterval(update_interval);
                    //animation end!
                    this.emit("animation:end", [animation]);
                } else {
                    this.emit("animation:update", [animation]);
                }
            }

            max = animation.properties.length;
            for(i = 0; i < max; ++i) {
                this[animation.properties[i]] = animation.getValue(0, animation.properties[i]);
            }
            this.emit("animation:start", [animation]);
            update_interval = update.periodical(animation.fps, this);
        }