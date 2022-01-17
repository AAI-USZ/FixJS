function normalize_animation_data(obj, ovalues) {
        var properties = [],
        ptime,
        ptime2,
        kproperty,
        frame,
        i,
        max,
        last_value;

        for(ptime in ovalues) {
            frame = ovalues[ptime];
            for(kproperty in frame) {
                if(properties.indexOf(kproperty) === -1) {
                    properties.push(kproperty);
                }
            }
        }

        max = properties.length;

        for(ptime in ovalues) {
            for(i=0; i < max; ++i) {
                if (!ovalues[ptime].hasOwnProperty(properties[i])) {
                    //do some magic!
                    if(ptime == "0%") {
                        //at first... use the obj value!
                        ovalues[ptime][properties[i]] = obj[properties[i]];
                    } else if(ptime == "100%") {
                        //get the value before!
                        for(ptime2 in ovalues) {
                            if(ptime2 == ptime) {
                                break;
                            }
                            if(ovalues[ptime2].hasOwnProperty(properties[i])) {
                                last_value = ovalues[ptime2][properties[i]];
                            }
                        }

                        ovalues[ptime][properties[i]] = last_value;
                    }
                }

            }
        }

        return properties;
    }