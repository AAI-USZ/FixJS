function() {
    var mml_store = new grainstore.MMLStore(redis_opts);
    var mml_builder = mml_store.mml_builder({dbname: 'my_database', table:'my_table', sql: 'SELECT * from my_table'});
    var baseMML = mml_builder.baseMML();

    assert.equal(baseMML.Layer[0].id, 'my_table');
    assert.equal(baseMML.Layer[0].Datasource.table, 'SELECT * from my_table');
  }