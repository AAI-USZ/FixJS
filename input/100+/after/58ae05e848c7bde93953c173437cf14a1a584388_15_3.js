function (done){
      supertest(Tester.getApiVhost())
      .post('/api/postLink/' + Tester.getAuthSession())
      .send({data: JSON.stringify(createPostConvertYoutube)})
      .expect('Content-Type', 'application/json; charset=utf-8')
//      .expect(201)
      .end(function (err, res) {
        
        if (err) {
          return done(err);
        }
        
        try {
          res.body.should.have.property('postId');
          res.body.postId.should.above(0);
          res.body.should.have.property('categoryId');
          res.body.should.have.property('added');
          res.body.added.should.above(0);
          res.body.should.have.property('userId');
          res.body.userId.should.above(0);
          res.body.should.have.property('userName');
          res.body.userName.should.match(/^.+$/);  //not empty
          res.body.should.have.property('url');
          res.body.url.should.equal(url);
          res.body.should.have.property('thumbUrl');
          res.body.thumbUrl.should.match(/^.+$/);  //not empty
          res.body.should.have.property('rate');
          res.body.rate.should.equal(1);
          res.body.should.have.property('views');
          res.body.views.should.equal(0);
          res.body.should.have.property('tags');
//          res.body.tags.should.have.length(1);  //TODO
          
          Tester.setCreatedPostId(res.body.postId);
          done();
        }
        catch (e) {
          done(e);
        }
      });
    }