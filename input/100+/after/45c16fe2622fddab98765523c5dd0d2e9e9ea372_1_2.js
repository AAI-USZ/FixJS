function(step) {
                var value;
                if(! (step in datum.value.steps)) { // No data about this step
                    // That means no one completed it.
                    value = 0;
                } else {
                    value = datum.value.steps[step];
                }

                dataByStep[step][date] = value;
            }