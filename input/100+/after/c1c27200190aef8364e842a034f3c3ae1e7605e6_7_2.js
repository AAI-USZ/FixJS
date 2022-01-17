function(){
        
        // it('should make the entity belong to a status set');

        // it('should delete the entity cleanly');
        
        
        it('should save an entity', function(done){
            var user = Common.entity.create(Common.entity.TYPE_TEST_A, {name:'freddy'}); 
            Step(
                function(){
                    assert( user.isNew() );
                    assert( !user.id );
                    user.saveCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    assert( !user.isNew() );
                    assert( user.id );
                    result.get('name').should.equal('freddy');
                    Common.entity.create( Common.entity.TYPE_TEST_A, result.id ).fetchCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    result.get('name').should.equal('freddy');
                    done();
                }
            )
        });

        it('should save part of a o2o relationship', function(done){
            var a = Common.entity.create( Common.entity.TYPE_TEST_E, {name:'enigma'} );
            var b = Common.entity.create( Common.entity.TYPE_TEST_F, {name:'foxtrot'} );
            a.set( {comrade:b} );
            Step(
                function(){
                    a.saveCB( this );
                },
                function(err,result){
                    Common.entity.create( Common.entity.TYPE_TEST_E, a.id ).fetchCB( this );
                },
                function(err,model,resp){
                    assert.equal( model.id, a.id );
                    assert.equal( model.get('name'), a.get('name') );
                    
                    assert( !model.get('comrade') );
                    done();
                }
            );
        });



        
        it('should save a complete o2o relationship', function(done){
            var a = Common.entity.create( Common.entity.TYPE_TEST_E, {name:'enigma'} );
            var b = Common.entity.create( Common.entity.TYPE_TEST_F, {name:'foxtrot'} );
            // print_ins(a);
            a.set( {comrade:b} );

            Step(
                function(){
                    assert( a.isNew() );
                    assert( b.isNew() );
                    a.saveRelatedCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    assert( !a.isNew() );
                    assert( !b.isNew() );
                    var aC = Common.entity.create( Common.entity.TYPE_TEST_E, a.id );
                    aC.fetchRelatedCB( this );
                },
                function(err,model,resp){
                    if( err ) throw err;
                    assert.equal( model.get('comrade').get('name'), 'foxtrot' );
                    done();
                }
            );
        });
        
        
        it('should save a parent and child entity', function(done){
            var a = Common.entity.create( Common.entity.TYPE_TEST_A, {name:'alex'} );
            var b = Common.entity.create( Common.entity.TYPE_TEST_B, {name:'beatrix'} );
            
            a.test_b.add( b );
            assert( a.test_b.length, 1 );
            assert( a.test_b instanceof Common.entity.EntityCollection );
            // print_ins( a );
            Step(
                function (){
                    assert( a.isNew() );
                    assert( b.isNew() );
                    a.saveRelatedCB( this );
                },
                function(err,result){
                    assert( !a.isNew() );
                    assert( !b.isNew() );
                    // should still have the same objects essentially
                    assert( result.test_b.length, 1 );
                    // attempt restore
                    var aCopy = Common.entity.create( Common.entity.TYPE_TEST_A, a.id );
                    assert.equal( aCopy.id, a.id );
                    // fetch the parent and children to a depth of two
                    aCopy.fetchRelatedCB( this );
                },
                function(err,result){
                    if( err ) throw err;
                    assert.equal( result.get('name'), 'alex');
                    assert.equal( result.test_b.length, 1 );
                    assert.equal( result.test_b.at(0).get('name'), 'beatrix' );
                    done();
                }
            );

        });

        
        it('should retrieve an associated entity', function(done){
            var a = Common.entity.create( Common.entity.TYPE_TEST_D, {name:'alpha'} );
            var b = Common.entity.create( Common.entity.TYPE_TEST_C, {name:'beta'} );
            a.set('friend',b);
            a.set('colleague',b);
            Step(
                function(){
                    a.saveRelatedCB( null, this ); 
                },
                function(err,result){
                    var copy = Common.entity.create( Common.entity.TYPE_TEST_D, result.id );
                    copy.fetchRelatedCB( this );
                },
                function(err,result){
                    assert( result.get('name') === a.get('name') );
                    assert( result.get('friend').get('name') === b.get('name') );
                    done();
                }
            );
        });

        it('should retrieve a o2m relationship', function(done){
            var a = Common.entity.create({
                id:"enigma_1",
                type: "test_e",
                comrade:{ id:'foxtrot_1', type:'test_f' },
                others:[
                    { id:'foxtrot_2', type:'test_f' },
                    { id:'foxtrot_3', type:'test_f' }
                ]
            });

            Step(
                function(){
                    a.saveRelatedCB( null, this ); 
                },
                function(err,result){
                    Common.entity.create( Common.entity.TYPE_TEST_E, result.id ).fetchRelatedCB( this );
                },
                function(err,result){
                    // print_var( result );
                    assert.equal( result.get('comrade').id, 'foxtrot_1' );
                    assert.equal( result.others.length, 2 );
                    // assert( result.get('name') === a.get('name') );
                    // assert( result.get('friend').get('name') === b.get('name') );
                    done();
                }
            );
        });
        
        it('should respond correctly to fetching a nonexistent entity', function(done){
            Step(
                function(){
                    Common.entity.create( Common.entity.TYPE_TEST_A, 'unknown.001' ).fetchCB( this );
                },
                function(err, result){
                    assert.equal( err, 'unknown.001 not found');
                    done();
                }
            );
        });

        it('should generate ids correctly', function(done){
            var a = Common.entity.create({
                name: "enigma",
                type: "test_e",
                comrade:{
                    name: "foxtrot",
                    type:"test_f",
                    associate:{ type:'test_a', name:'arnold' }
                },
                others:[
                    { name:'foxtrot_2', type:'test_f' },
                    { name:'foxtrot_3', type:'test_f' }
                ]
            });

            Step(
                function(){
                    a.saveRelatedCB(this);
                },
                function(err,result){
                    var json = a.toJSON();
                    assert.equal( a.id, json.id );
                    assert( json.comrade.id );
                    assert.equal( a.get('comrade').id, json.comrade.id );
                    assert( json.others[1].id );
                    assert.equal( a.others.at(1).id, json.others[1].id );
                    done();
                }
            );
        });

        
        it('should logically delete an entity', function(done){
            var a = Common.entity.create( Common.entity.TYPE_TEST_A, {name:'alf',status:Common.Status.ACTIVE} );
            assert.equal( a.get('status'), Common.Status.ACTIVE );
            Step(
                function(){
                    a.saveCB( null, this);
                },
                function(err,result){
                    Common.entity.create( Common.entity.TYPE_TEST_A, a.id ).fetchCB( this );
                },
                function(err,result){
                    assert.equal(result.get('name'), 'alf');
                    assert.equal(result.get('status'),Common.Status.ACTIVE);
                    result.destroyCB(this);
                },
                function(err,result){
                    assert( !err );
                    Common.entity.create( Common.entity.TYPE_TEST_A, a.id ).fetchCB( this );
                },
                function(err,result){
                    assert.equal(err, a.id + ' not found');
                    Common.entity.create( Common.entity.TYPE_TEST_A, a.id ).fetchCB( {ignoreStatus:true}, this );
                },
                function(err, finalResult ){
                    if( err ) throw err;
                    assert( finalResult.get('name'), 'alf' );
                    assert( finalResult.get('status'), Common.Status.LOGICALLY_DELETED );
                    done();
                }
            );
        });


        it('should completely delete an entity', function(done){
            var a = Common.entity.create( {type:Common.entity.TYPE_TEST_A, name:'ash', status:Common.Status.ACTIVE} );
            var initialCount;
            var initialKeys;
            Step(
                function(){
                    Common.sync.keys( this );
                },
                function(err, result){
                    initialKeys = result;
                    initialCount = result.length;
                    a.saveCB( null, this );
                },
                function(err,result){
                    result.destroyCB({destroyHard:true},this);
                },
                function(){
                    Common.entity.create( Common.entity.TYPE_TEST_A, a.id ).fetchCB( {ignoreStatus:true}, this );
                },
                function(err,result){
                    assert.equal(err, a.id + ' not found');
                    Common.sync.keys( this );
                },
                function(err, keys){
                    var config = Common.config.sync.redis;
                    var key = config.key_prefix + ':' + config.uuid.key;
                    // print_var( keys );

                    // the only difference should be the uuid key
                    // assert.equal(key, _.difference( keys, initialKeys )[0] );
                    // same count minus the uuid key
                    assert.equal( initialCount, keys.length );
                    done();
                }
            );
        });

        it('should logically delete an entity and related', function(done){
            var a = Common.entity.create({
                id:"enigma_1",
                name: "enigma",
                status: "atv",
                type: "test_e",
                comrade:{
                    id:"foxtrot_1",
                    name: "foxtrot",
                    status: "atv",
                    type:"test_f",
                    associate:{
                        id:'alpha_a',
                        status:'atv',
                        type:'test_a',
                        name:'arnold'
                    }
                },
                others:[
                    { id:'foxtrot_2', type:'test_f' },
                    { id:'foxtrot_3', type:'test_f' }
                ]
            });

            Step(
                function(){
                    a.saveRelatedCB( this);
                },
                function(err,result){
                    Common.entity.create( Common.entity.TYPE_TEST_E, a.id ).fetchRelatedCB( this );
                },
                function(err,result){
                    assert.equal(result.get('name'), 'enigma');
                    result.destroyRelatedCB(this);
                },
                function(err,result){
                    assert( !err );
                    Common.entity.create( Common.entity.TYPE_TEST_E, a.id ).fetchRelatedCB( this );
                },
                function(err,result){
                    assert.equal(err, a.id + ' not found');
                    Common.entity.create( Common.entity.TYPE_TEST_E, a.id ).fetchRelatedCB( {ignoreStatus:true}, this );
                },
                function(err, result ){
                    if( err ) throw err;
                    assert( result.get('name'), 'enigma' );
                    assert( result.get('status'), Common.Status.LOGICALLY_DELETED );
                    assert( result.get('comrade').get('status'), Common.Status.LOGICALLY_DELETED );
                    assert( result.get('comrade').get('associate').get('status'), Common.Status.LOGICALLY_DELETED );
                    done();
                }
            );
        });//*/

        it('should completely delete an entity and related', function(done){
            var initialCount, initialKeys;
            var a = Common.entity.create({
                id:"enigma_1",
                name: "enigma",
                status: "atv",
                type: "test_e",
                comrade:{
                    id:"foxtrot_1",
                    name: "foxtrot",
                    status: "atv",
                    type:"test_f",
                    associate:{
                        id:'alpha_a',
                        status:'atv',
                        type:'test_a',
                        name:'arnold'
                    }
                },
                others:[
                    { id:'foxtrot_2', type:'test_f' },
                    { id:'foxtrot_3', type:'test_f' }
                ]
            });

            Step(
                function fetchAllKeys(){
                    Common.sync.keys( this );
                },
                function countCurrentKeysAndSave(err, result){
                    initialKeys = result;
                    initialCount = result.length;
                    a.saveRelatedCB( null, this );
                },
                function destroyEntity(err,result){
                    result.destroyRelatedCB({destroyHard:true},this);
                },
                function recreateEntityAndFetch(){
                    Common.entity.create( Common.entity.TYPE_TEST_E, a.id ).fetchRelatedCB( {ignoreStatus:true}, this );
                },
                function recountCurrentKeys(err,result){
                    assert.equal(err, a.id + ' not found');
                    Common.sync.keys( this );
                },
                function confirmAllDestroyed(err, keys){
                    assert.equal( keys.length, 0 );
                    // same count minus the uuid key
                    assert.equal( initialCount, keys.length );
                    done();
                }
            );
        });

        
        it('should retrieve by storeKeys', function(done){
            var TestEntity = Common.entity.Entity.extend({
                storeKeys: function(){
                    var keys = Common.entity.Entity.prototype.storeKeys.apply(this,arguments);
                    return _.union( [ {key:"ans_id", unique:true} ], keys );
                }
            });

            Common.entity.registerEntity( 'test_ent', TestEntity );

            var col = Common.entity.createCollection({entityType:'test_ent'}, [
                { name:'ent1' },
                { name:'ent2' },
                { name:'ent3', ans_id:'sigma5', variance:'none' },
                { name:'ent4' }
            ]);

            Step(
                function(){
                    // var ent = Common.entity.create( TestEntity, { ans_id:'sigma5', variance:'none' } );
                    col.saveCB(this);
                    // ent.saveCB(this);
                },
                function(err,result){
                    if( err ) throw err;

                    var ent = Common.entity.create( TestEntity );
                    ent.fetchCB({query:{ans_id:'sigma5'}}, this);
                },
                function(err,result){
                    if( err ) throw err;
                    assert.equal( result.get('variance'), 'none' );
                    done();
                }
            );

        });//*/
        
    }