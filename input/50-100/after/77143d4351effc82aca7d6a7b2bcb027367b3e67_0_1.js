function (d) {
            var currentValue = d.values[d.values.length - 1],
                newValue = currentValue.y - (currentValue.y + random());
            d.values.push(streamIndex(currentValue.y + random()));
            return d;
        }