function MongooseModel(model, config) {

    if (config) {
        _.extend(this, config);
    }
//    console.log('mon model: %s', util.inspect(model));

    if (!(model instanceof mongoose.Model)) {
        //      console.log(' >>>>> processing raw object %s', util.inspect(model));
        if (!this.name) {
            throw new Error("Dynamic models MUST have names!");
        }
        var schema;
        if ((model instanceof mongoose.Schema)) {
            schema = model;
        } else {
            //        console.log('making schema')
            schema = new mongoose.Schema(model);
        }

        schema.statics.active = function (cb) {
            var q = {'deleted':{'$ne':true}};
            return cb ? this.find(q).run(cb) : this.find(q);
        }

        schema.statics.active_count = function (cb) {
            var q = {'deleted':{'$ne':true}};
            return cb ? this.find(q).count(cb) : this.find(q).count();
        }

        schema.statics.inactive = function (cb) {
            return cb ? this.find('deleted', true).run(cb) : this.find('deleted', true)
        }

        model = mongoose.model(this.name, schema);
        //  console.log('model = %s', util.inspect(model));
    }
    this.model = model;

}