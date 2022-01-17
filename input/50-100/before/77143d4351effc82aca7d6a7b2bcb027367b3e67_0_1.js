function (d) {
            var currentValue = d.values[d.values.length - 1];
            d.values.push(streamIndex(currentValue.y + random()));
            return d;
        }