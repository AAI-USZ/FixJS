function(done){
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
        }