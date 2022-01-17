function(){
    
    var testEntities = [
        { type: 'test_a', ER:[ { oneToMany: 'test_b' } ] },
        { type: 'test_b', ER:[ { oneToMany:'test_c'} ] },
        // { type: 'test_c' },
        // { type: 'test_d', ER:[ { oneToOne:'test_c', name:'friend'},{ oneToOne:'test_c', name:'colleague'} ] },
        { type: 'test_e', ER:[ {oneToOne:'test_f', name:'comrade'}, {oneToOne:'test_b', name:'friend'}, {oneToMany:'test_f', name:'others'} ] },
        { type: 'test_f', ER:[ {oneToOne:'test_a', name:'associate'} ] }
    ];

    _.each( testEntities.reverse(), function(e){
        Common.entity.registerEntity(e);
    });
    
    
    describe('create', function(){

        it('should create from a type', function(){
            var inst = Common.entity.create( Common.entity.TYPE_TEST_A );
            assert( inst instanceof Common.entity.TestA.entity );
        });

        it('should create from a hash', function(){
            var inst = Common.entity.create( { type:'test_a', id:'mail.001'} );
            assert( inst instanceof Common.entity.TestA.entity );
        });

        it('should create from an entity', function(){
            var inst = Common.entity.create( 'test_a', "mail.001" );
            var oinst = Common.entity.create( inst );
            assert( oinst instanceof Common.entity.TestA.entity );
        });

        it('should create with a valid id', function(){
            var inst = Common.entity.create( Common.entity.TYPE_TEST_A, '001' );
            assert.equal( inst.id, '001');
            assert( inst instanceof Common.entity.TestA.entity);
            inst = Common.entity.create( Common.entity.TYPE_TEST_A, {id:'002'} );
            assert.equal( inst.id, '002');
        });

        it('should create from attr', function(){
            var inst = Common.entity.create( {id:'001', type:Common.entity.TYPE_TEST_A} );
            assert.equal( inst.id, '001');
        });

        it('should create from a def and attr', function(){
            var inst = Common.entity.create( Common.entity.TYPE_TEST_A, {name:'pink', id:'001'} );
            assert.equal( inst.id, '001');
            assert.equal( inst.get('name'), 'pink');
        });

        it('should have a default status of active', function(){
            var inst = Common.entity.create( {type:'test_a', id:'101'} );
            assert.equal( inst.get('status'), Common.Status.ACTIVE );
        });

        it('should set status', function(){
            var inst = Common.entity.create( {type:'test_a', status:Common.Status.ACTIVE, id:'101'} );
            assert.equal( inst.get('status'), Common.Status.ACTIVE );
        });
    });//*/

    /*
    describe('registration', function(){

        it('can', function(){
            Common.entity.registerEntity( { type: 'test_a', ER:[ { oneToMany: 'test_b' } ] } );
            // var myEntity = {
            //     type: 'test',
            //     entity: Common.entity.Entity.extend({})
            // };

            // Common.entity.registerEntity( myEntity );

            // var inst = Common.entity.create( "test.001" );
            // inst.should.be.an.instanceof( Common.entity.Test.entity );
        });
    });//*/

    
    describe('reference counting', function(){
        it('increments the reference count when adding', function(){
            var e = Common.entity.create( {type:'test_e', id:'e.001'} );
            var f = Common.entity.create( {type:'test_f', id:'f.001'} );
            assert.equal( f.refCount, 0 );
            e.set('comrade', f );
            assert.equal( f.refCount, 1 );
        });

        it('decrements the reference count when removing', function(){
            var e = Common.entity.create( {type:'test_e', id:'e.001'} );
            var f = Common.entity.create( {type:'test_f', id:'f.001'} );
            e.set('comrade', f);
            e.set('comrade', null );
            assert.equal( f.refCount, 0 );
        });

        it('decrements the reference count when replacing', function(){
            var e = Common.entity.create( {type:'test_e', id:'e.001'} );
            var f = Common.entity.create( {type:'test_f', id:'f.001'} );
            var f2 = Common.entity.create( {type:'test_f', id:'f.002'} );
            e.set('comrade', f);
            assert.equal( f.refCount, 1 );
            e.set({comrade:f2, seemsOK:true} );
            assert.equal( f.refCount, 0 );
        });

        it('increments on o2m', function(){
            var a = Common.entity.create( {type:'test_a'} );
            var a2 = Common.entity.create( {type:'test_a'} );
            var b = Common.entity.create( {type:'test_b'} );

            a.test_b.add( b );
            a2.test_b.add( b );

            assert.equal( b.refCount, 2 );

            a.test_b.reset();
            assert.equal( b.refCount, 1 );
        });

        it('works with a o2o and o2m', function(){
            var a = Common.entity.create({
                id:"enigma_1",
                type: "test_e",
                comrade:{
                    id:"foxtrot_1",
                    type:"test_f",
                    associate:{ id:'alpha_a', type:'test_a' }
                },
                others:[
                    { id:'foxtrot_2', type:'test_f' },
                    { id:'foxtrot_3', type:'test_f' }
                ]
            });
            // print_ins( a );

            assert.equal( a.get('comrade').refCount, 1 );
            assert.equal( a.get('comrade').get('associate').refCount, 1 );
            assert.equal( a.others.at(1).refCount, 1 );
        });

        
    });//*/

    describe('one to many', function(){
        it('returns details of o2m relationships', function(){
            var a = Common.entity.create({
                id:"enigma_1",
                type: "test_e",
                comrade:{
                    id:"foxtrot_1",
                    type:"test_f",
                    associate:{ id:'alpha_a', type:'test_a' }
                },
                others:[
                    { id:'foxtrot_2', type:'test_f' },
                    { id:'foxtrot_3', type:'test_f' }
                ]
            });

            assert.deepEqual( a.getOneToMany(), { "others": { "oneToMany": "test_f", "name": "others", "type": "test_f" } } );
            assert.deepEqual( a.getOneToMany('others'), { "oneToMany": "test_f", "name": "others", "type": "test_f" } );
        });
    });

    
    describe('serialisation', function(){

        it('should persist to JSON without relations', function(){
            var a = Common.entity.create( Common.entity.TYPE_TEST_E, {name:'enigma'} );
            var b = Common.entity.create( Common.entity.TYPE_TEST_F, {name:'foxtrot'} );
            a.set( {comrade:b} );
            assert.deepEqual( a.toJSON({relations:false}), { "name": "enigma", "type":"test_e" } );
        });
    });
    
    describe('parsing', function(){
        it('should parse correctly', function(){
            var data = { 
                enigma_1: { 
                    status: 'atv',
                    id: 'enigma_1',
                    name: 'enigma',
                    type: 'test_e',
                    comrade: 'foxtrot_1' },
                foxtrot_1: { 
                    status: 'atv',
                    id: 'foxtrot_1',
                    name: 'foxtrot',
                    type: 'test_f',
                    associate: 'alpha_a' },
                alpha_a: { 
                    status: 'atv',
                    id: 'alpha_a',
                    type: 'test_a',
                    name: 'arnold' } 
                };

            var a = Common.entity.create({type:'test_e'});
            var parsed = a.parse( data, null, {parseFor:'enigma_1',removeId:true} );
            
            assert.equal( parsed.name, 'enigma' );
            assert.equal( parsed.comrade.name, 'foxtrot' );
            assert.equal( parsed.comrade.associate.name, 'arnold' );
        });

        it('should parse a o2m relationship', function(){
            var data = {
                alpha_1:{
                    id: 'alpha_1',
                    type:'test_a',
                    name:'alfred',
                    test_b:[ 'beta_1', 'beta_2' ]
                },
                beta_1:{
                    id:'beta_1',
                    type:'test_b',
                    name:'ben'
                },
                beta_2:{
                    id:'beta_2',
                    type:'test_b',
                    name:'bernard'
                }
            };
            var expected = {
                id: 'alpha_1',
                type:'test_a',
                name:'alfred',
                test_b:{
                    items:[
                        { id:'beta_1', type:'test_b', name:'ben' },
                        { id:'beta_2', type:'test_b', name:'bernard' }
                    ]
                }
            };

            var a = Common.entity.create({type:'test_a'});
            var parsed = a.parse( data, null, {parseFor:'alpha_1'} );
            // print_ins( parsed );
            assert.deepEqual( parsed, expected );
        });

        it('should parse a different form of o2m relationship', function(){
            var data = {
                alpha_1:{
                    id: 'alpha_1',
                    type:'test_a',
                    name:'alfred',
                    test_b:{ debug:true, items:['beta_1', 'beta_2'] }
                },
                beta_1:{
                    id:'beta_1',
                    type:'test_b',
                    name:'ben'
                },
                beta_2:{
                    id:'beta_2',
                    type:'test_b',
                    name:'bernard'
                }
            };
            var expected = {
                id: 'alpha_1',
                type:'test_a',
                name:'alfred',
                test_b:{
                    debug:true,
                    items:[
                        { id:'beta_1', type:'test_b', name:'ben' },
                        { id:'beta_2', type:'test_b', name:'bernard' }
                    ]
                }
            };

            var a = Common.entity.create({type:'test_a'});
            var parsed = a.parse( data, null, {parseFor:'alpha_1'} );
            assert.deepEqual( parsed, expected );
        });
    });

    it('should parse another form of o2m', function(){
        var data = {
            "1": { "type": "test_e", "name": "enigma", "others": 2, "id": 1 },
            "2": { "excel": "nice", "id": 2, "others": [ "3", "4" ] },
            "3": { "name": "falco_1", "type": "test_f", "id": "3" },
            "4": { "name": "falco_2", "type": "test_f", "id": "4" }
        };
        var expected = {
            "type": "test_e",
            "name": "enigma",
            "others": {
                "id": 2, "excel": "nice",
                "items": [
                    { "name": "falco_1", "type": "test_f", "id": "3" },
                    { "name": "falco_2", "type": "test_f", "id": "4" }
                ]
            },
            "id": 1
        }

        var a = Common.entity.create({type:'test_e'});
        var parsed = a.parse( data, null, {debug:true,parseFor:'1'});
        assert.deepEqual( parsed, expected );
    });
    
    
    describe('cloning', function(){
        it('should clone an entity', function(){
            var a = Common.entity.create({
                id:'euro',
                name:'eurovision',
                type:'test_e',
                status:'atv'
            });

            var b = a.clone();
            assert.equal( b.get('name'), 'eurovision' );
            assert( !b.id );
            assert( !b.get('id') );
        });

        it('should clone an entity with a one2one relation', function(){
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
                }
            });
            assert.equal( a.get('comrade').refCount, 1 );

            var b = a.clone({recurse:true});
            assert.equal( b.get('comrade').get('name'), 'foxtrot' );
            assert.equal( b.get('comrade').get('associate').get('name'), 'arnold' );
            assert( !b.get('comrade').id );
            assert.equal( b.get('comrade').refCount, 1 );
            assert( b.get('comrade').get('associate') );
            assert.equal( b.get('comrade').get('associate').refCount, 1 );
        });
    });

    
    describe('flatten', function(){
        it('should produce a flattened map of a one2one relation', function(){
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
                        type:'test_a'
                    }
                }
            });
            
            var result = a.flatten();
            assert.equal( _.keys(result).length, 3 );
            assert( result.enigma_1 );
            assert( result.foxtrot_1 );
            assert( result.alpha_a );
        });

        it('should ignore non-owned entities', function(){
            var a = Common.entity.create({type:'test_e', id:'e.001'} );
            var b = Common.entity.create({type:'test_e', id:'e.002'} );
            var c = Common.entity.create({type:'test_f', id:'f.001'} );
            var d = Common.entity.create({type:'test_f', id:'f.002'} );
            var e = Common.entity.create({type:'test_b', id:'b.001'} );

            a.set({comrade:c, friend:e});
            b.set({comrade:c});

            assert.equal(c.refCount,2);

            // only flatten (related) entities owned by a - c is also owned by b
            var result = a.flatten({ownedOnly:true});

            assert( result['b.001'] );
            assert( !result['f.001'] );
        })
    });

    
    describe('entity.set', function(){
        it('should set a one2one from a serialised form', function(){
            var ser = {
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
                        id:'alfred_1',
                        type:'test_a',
                        name:'alfred',
                        status:'atv'
                    }
                }
            };

            var a = Common.entity.create( Common.entity.TYPE_TEST_E, {name:'enigma'} );
            assert.equal( a.type, Common.entity.TYPE_TEST_E );
            a.set( ser );

            assert.equal( a.id, 'enigma_1');

            var b = a.get('comrade');
            assert( b instanceof Common.entity.Entity );
            assert.equal( b.id, 'foxtrot_1');
            assert.equal( b.type, Common.entity.TYPE_TEST_F );
            assert.equal( b.get('name'), 'foxtrot' );

            var c = b.get('associate');
            assert( c instanceof Common.entity.Entity );
            assert.equal( c.id, 'alfred_1');
            assert.equal( c.type, Common.entity.TYPE_TEST_A );
            assert.equal( c.get('name'), 'alfred' );            
        });

        it('should set a one2many from a serialised form', function(){
            var json = {
                id:"alpha_1",
                name:"alpha",
                type:"test_a",
                status:"atv",
                test_b:[
                    {
                        id:"beta_1",
                        name:"beta",
                        type:"test_b",
                        status:"atv"
                    }
                ]
            };
            var a = Common.entity.create( Common.entity.TYPE_TEST_A );
            a.set( json );
            assert.equal( a.id, "alpha_1" );
            var b = a.test_b.at(0);
            assert.equal( b.id, "beta_1" );
            assert.equal( b.type, "test_b" );
        });

        it('should set an attribute on one2one associations', function(){
            var a = Common.entity.create({
                id:"enigma_e",
                name: "enigma",
                status: "atv",
                type: "test_e",
                comrade:{
                    id:"foxtrot_f",
                    name: "foxtrot",
                    status: "atv",
                    type:"test_f"
                }
            });
            assert.equal( a.type, Common.entity.TYPE_TEST_E );
            assert.equal( a.get('comrade').type, Common.entity.TYPE_TEST_F );
            assert.equal( a.get('status'), Common.Status.ACTIVE );
            assert.equal( a.get('comrade').get('status'), Common.Status.ACTIVE );

            a.set('status', Common.Status.INACTIVE, {setRelated:true,debug:true} );
            assert.equal( a.get('status'), Common.Status.INACTIVE );
            assert.equal( a.get('comrade').get('status'), Common.Status.INACTIVE );
        });
    });//*/

}