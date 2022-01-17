function _logTestWindowMeasurement(measureInfo) {
        var value,
            printName = measureInfo.measure.name || measureInfo.name,
            record = {};
        
        if (measureInfo.measure instanceof RegExp) {
            value = currentPerfUtils.searchData(measureInfo.measure);
        } else {
            value = currentPerfUtils.getData(measureInfo.measure.id);
        }
        
        if (value === undefined) {
            value = "(None)";
        }
        
        if (measureInfo.measure.name && measureInfo.name) {
            printName = measureInfo.measure.name + " - " + measureInfo.name;
        }
        
        if (measureInfo.operation === "sum") {
            if (Array.isArray(value)) {
                value = value.reduce(function (a, b) { return a + b; });
            }
            
            printName = "Sum of all " + printName;
        }
        
        record.name = printName;
        record.value = value;
        
        if (measureInfo.children) {
            record.children = [];
            measureInfo.children.forEach(function (child) {
                record.children.push(_logTestWindowMeasurement(child));
            });
        }
        
        return record;
    }