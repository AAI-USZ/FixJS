function() {
    var mml_store = new grainstore.MMLStore(redis_opts, {
        datasource: {
            user:'overridden_user',
            password:'overridden_password'
        }});
    var mml_builder = mml_store.mml_builder({
            dbname: 'my_database',
            table:'my_table',
            // NOTE: authentication tokens here are silengly discarded
            user:'shadow_user', password:'shadow_password'
        });
    var baseMML = mml_builder.baseMML();

    assert.ok(_.isArray(baseMML.Layer));
    assert.equal(baseMML.Layer[0].id, 'my_table');
    assert.equal(baseMML.Layer[0].Datasource.dbname, 'my_database');
    assert.equal(baseMML.Layer[0].Datasource.user, 'overridden_user');
    assert.equal(baseMML.Layer[0].Datasource.password, 'overridden_password');
  }