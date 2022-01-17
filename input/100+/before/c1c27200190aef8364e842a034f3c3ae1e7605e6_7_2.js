function(done){
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

        }