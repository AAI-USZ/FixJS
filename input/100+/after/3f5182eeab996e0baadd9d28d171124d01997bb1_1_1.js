function () {

            var User = objection.map('User', {
                created : 'date',
                admin : 'boolean',
                username : 'string'
            });

            objection.map('Comment', {
                author : 'User',
                text : 'string',
                votes : 'number'
            });

            objection.map('Post', {
                author : User,
                text : 'string',
                created : 'date'
            });

            var user =  { created : new Date(),
                          admin : true,
                          username : 'calvinfo' };

            var badUser = { created : 0,
                            admin   : 0,
                            username : 'calvinfo' };

            var result = objection.validate('User', user);

            result.valid.should.be.true;

            result.errors.should.have.length(0);

            result = objection.validate('User', badUser);

            result.valid.should.be.false;

            result.errors.should.have.length(2);


            result = objection.validate('Comment', {
                author : user,
                text   : 'hello world',
                votes  : 200
            });

            result.valid.should.be.true;

            result = objection.validate('Comment', {
                author : badUser,
                text   : 'hello world',
                votes  : 200
            });

            result.valid.should.be.false;

            result = objection.validate('Post', {
                author : user,
                text   : 'hello world',
                votes  : 200
            });

            result.valid.should.be.true;

            result = objection.validate('Post', {
                author : badUser,
                text   : 'hello world',
                votes  : 200
            });

            result.valid.should.be.false;
        }