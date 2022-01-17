function (schemaValue) {
        var type = fluid.isPrimitive(schemaValue) ? schemaValue : schemaValue.type;
        return type === "array" ? [] : {};
    }