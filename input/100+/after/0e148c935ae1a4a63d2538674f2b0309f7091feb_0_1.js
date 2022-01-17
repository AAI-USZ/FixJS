function normalize_animation_data(ovalues, obj) {
        var properties = [],
            ptime,
            ptime2,
            kproperty,
            frame,
            i,
            p,
            max,
            last_value;

        ovalues["0%"] = ovalues["0%"] || {};

        ovalues = ksort(ovalues, 'number');
        for (ptime in ovalues) {
            frame = ovalues[ptime];
            for (kproperty in frame) {
                if (properties.indexOf(kproperty) === -1) {
                    properties.push(kproperty);
                }
            }
        }

        max = properties.length;

        for (ptime in ovalues) {
            for (i = 0; i < max; ++i) {
                p = properties[i];
                if (!ovalues[ptime].hasOwnProperty(p)) {
                    //do some magic!
                    if (ptime == "0%") {
                        //at first... use the obj value!

                        ovalues[ptime][p] = obj[p];
                    } else if (ptime == "100%") {
                        //get the value before!
                        for (ptime2 in ovalues) {
                            if (ptime2 == ptime) {
                                break;
                            }
                            if (ovalues[ptime2].hasOwnProperty(p)) {
                                last_value = ovalues[ptime2][p];
                            }
                        }

                        ovalues[ptime][p] = last_value;
                    }
                }
                ovalues[ptime][p] = ("" + ovalues[ptime][p]).match(obj.__animation[p].maskRegExp);
                // <debug>
                if(ovalues[ptime][p].length === 0) {
                    throw new Error(ptime + "." + p + "cannot be parsed with the given mask!");
                }
                // </debug>

                // right now we dont support hexadecimal!
                ovalues[ptime][p] = ovalues[ptime][p].slice(1, 1 + obj.__animation[p].maskCount).map(function(value) {
                    return parseFloat(value);
                });

            }
        }

        return ovalues;
    }