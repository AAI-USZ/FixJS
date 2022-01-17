function(model, obj, field)
    {
        var o = this.findModel(model, obj[field || 'id']);
        if (o) {
            for (var p in obj) {
                o[p] = obj[p];
            }
        } else {
            this.addModel(model, obj);
        }
    }