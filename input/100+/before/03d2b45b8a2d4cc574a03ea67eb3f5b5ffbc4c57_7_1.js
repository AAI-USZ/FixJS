function _logTestWindowMeasurement(measureInfo) {
        var value = currentPerfUtils.getData(measureInfo.measure.id),
            printName = measureInfo.measure.name,
            record = {};
        
        if (value === undefined) {
            value = "(None)";
        }
        
        if (measureInfo.name) {
            printName = printName + " - " + measureInfo.name;
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