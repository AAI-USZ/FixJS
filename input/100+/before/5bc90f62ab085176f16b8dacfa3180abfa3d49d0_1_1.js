function () {
        $data.Class.define('vtestEntity', $data.Entity, null, {
            Id: { type: 'int', key: true, computed: true },
            Title: { type: 'string', required: true },
            Lead: { type: 'string', required: true, minLength: 10 },
            Enabled: { type: 'bool', required: true }
        }, null);

        $data.Class.define('vtestContext', $data.EntityContext, null, {
            Items: { type: $data.EntitySet, elementType: vtestEntity }
        });

        stop();
        var context = new vtestContext({ name: 'sqLite', databaseName: 'vtest' });
        context.onReady(function () {
            var entity = new vtestEntity({ Title: 'title1', Lead: 'Long lead text here' });
            context.Items.add(entity);

            context.saveChanges(function () {
                equal(entity.Enabled, false, 'boolean default value failed');
                context.Items.toArray(function (result) {
                    var e = result[0];
                    equal(e.Enabled, false, 'boolean default value failed');

                    var e2 = new vtestEntity({ Id: e.Id });
                    context.Items.attach(e2);

                    //Dont want to change other fields, just title.
                    //(Lead and Enabled also has validation failed)
                    e2.Title = e.Title + '_changed';

                    context.saveChanges({
                        success: function () {
                            context.Items.filter(function (v) { return v.Id == this.Id }, { Id: e.Id }).single(function (result) {
                                equal(result.Title, e.Title + '_changed', 'changed text failed');
                                start();
                            })
                        },
                        error: function (ex) {
                            equal(e2.ValidationErrors.length, 0, 'Validation errors exists');
                            ok(false, 'Partial update failed' + JSON.stringify(ex));
                            start();
                        }
                    });

                });


            });

        });


    }