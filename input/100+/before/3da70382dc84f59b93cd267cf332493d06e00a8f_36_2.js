function(time, result) {
        if (typeof time === 'undefined') {
            throw new DeveloperError('time is required.');
        }

        var interval = this._cachedInterval;
        if (this._cachedTime !== time) {
            this._cachedTime = time;
            if (typeof interval === 'undefined' || !interval.contains(time)) {
                interval = this._propertyIntervals.findIntervalContainingDate(time);
                this._cachedInterval = interval;
            }
        }

        if (typeof interval === 'undefined') {
            return undefined;
        }
        var property = interval.data;
        var valueType = property.valueType;
        if (valueType === CzmlCartesian3) {
            return property.getValue(time, result);
        }
        result = interval.cachedValue = property.getValue(time, interval.cachedValue);
        if (typeof result !== 'undefined') {
            result = wgs84.toCartesian(result);
        }
        return result;
    }