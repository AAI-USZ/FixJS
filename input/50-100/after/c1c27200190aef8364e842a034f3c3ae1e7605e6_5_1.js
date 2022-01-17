function(){
            var data = {
                alpha_a:{
                    id: 'alpha_a',
                    type: 'test_a',
                    name: 'arnold'
                }
            };

            var a = Common.entity.create({type:'test_a'});
            var parsed = a.parse( data, null, {parseFor:'alpha_a'} );

            assert.equal( parsed.id, 'alpha_a' );
        }