function (paths) {
        var values = [];
        for (var i = 0; i < paths.length; i++) {
            var path = paths[i];
            values.push({
                expander: {
                    type: "fluid.model.transform.value",
                    path: path
                }
            });
        }
        
        return {
            values: values
        };
    }