function(d) {
                var data = d.data;
                if (chart.valueFunction()(data) == 0)
                    return "";
                return labelFunction(d);
            }