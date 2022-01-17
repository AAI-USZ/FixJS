function(d) {
                var xValue = chart.keyFunction()(d);
                return xValue < start || xValue >= end;
            }