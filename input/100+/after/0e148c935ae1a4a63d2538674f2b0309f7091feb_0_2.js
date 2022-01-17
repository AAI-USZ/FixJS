function (factor, property) {
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
            }