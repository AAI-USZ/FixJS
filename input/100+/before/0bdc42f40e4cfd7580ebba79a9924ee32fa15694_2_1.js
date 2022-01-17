function authorAndArticles(name) {
    return {
      topic: function () {
        resources[e].Author.create({
          _id: name,
          name: name
        }, this.callback);
      },
      'should not error': function (err, author) {
        assert.isNull(err);
      },
      'should return correct author': function (err, author) {
        assert.equal(author._id, name);
      },
      'with': {
        'article #1': {
          topic: function (author) {
            author.createArticle({
              _id: 'article-1',
              title: name + '\'s article #1'
            }, this.callback);
          },
          'should not error': function (err, article) {
            assert.isNull(err);
          },
          'should return correct article': function (err, article) {
            assert.equal(article._id,  'article/author/' + name + '/article-1');
          }
        },
        'article #2': {
          topic: function (author) {
            author.createArticle({
              _id: 'article-2',
              title: name + '\'s article #2'
            }, this.callback);
          },
          'should not error': function (err, article) {
            assert.isNull(err);
          },
          'should return correct article': function (err, article) {
            assert.equal(article._id,  'article/author/' + name + '/article-2');
          }
        }
      }
    };
  }