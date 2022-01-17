function() {
    describe('hasAssociation', function() {
      before(function(done) {
        var self = this

        this.Article = sequelize.define('Article', { 'title': Sequelize.STRING })
        this.Label = sequelize.define('Label', { 'text': Sequelize.STRING })

        this.Article.hasMany(this.Label)

        sequelize.sync({ force: true }).success(done)
      })

      describe('hasLabel', function() {
        it('does not have any labels assigned to it initially', function(done) {
          var self = this

          var chainer = new Sequelize.Utils.QueryChainer([
            this.Article.create({ title: 'Article' }),
            this.Label.create({ text: 'Awesomeness' }),
            this.Label.create({ text: 'Epicness' })
          ])

          chainer.run().success(function(results, article, label1, label2) {
            var chainer = new Sequelize.Utils.QueryChainer([
              article.hasLabel(label1),
              article.hasLabel(label2)
            ])

            chainer.run().success(function(_, hasLabel1, hasLabel2) {
              expect(hasLabel1).toBeFalse()
              expect(hasLabel2).toBeFalse()
              done()
            })
          })
        })

        it('answers true if the label has been assigned', function(done) {
          var self = this

          var chainer = new Sequelize.Utils.QueryChainer([
            this.Article.create({ title: 'Article' }),
            this.Label.create({ text: 'Awesomeness' }),
            this.Label.create({ text: 'Epicness' })
          ])

          chainer.run().success(function(results, article, label1, label2) {
            var chainer = new Sequelize.Utils.QueryChainer([
              [ article, 'addLabel', [ label1 ]],
              [ article, 'hasLabel', [ label1 ]],
              [ article, 'hasLabel', [ label2 ]]
            ])

            chainer.runSerially().success(function(_, label1, hasLabel1, hasLabel2) {
              expect(hasLabel1).toBeTrue()
              expect(hasLabel2).toBeFalse()
              done()
            })
          })
        })
      })

      describe('hasLabels', function() {
        it('answers false if only some labels have been assigned', function(done) {
          var self = this

          var chainer = new Sequelize.Utils.QueryChainer([
            this.Article.create({ title: 'Article' }),
            this.Label.create({ text: 'Awesomeness' }),
            this.Label.create({ text: 'Epicness' })
          ])

          chainer.run().success(function(results, article, label1, label2) {
            article.addLabel(label1).success(function() {
              article.hasLabels([label1, label2]).success(function(result) {
                expect(result).toBeFalse()
                done()
              })
            })
          })
        })

        it('answers true if all label have been assigned', function(done) {
          var self = this

          var chainer = new Sequelize.Utils.QueryChainer([
            this.Article.create({ title: 'Article' }),
            this.Label.create({ text: 'Awesomeness' }),
            this.Label.create({ text: 'Epicness' })
          ])

          chainer.run().success(function(results, article, label1, label2) {
            article.setLabels([label1, label2]).success(function() {
              article.hasLabels([label1, label2]).success(function(result) {
                expect(result).toBeTrue()
                done()
              })
            })
          })
        })
      })
    })

    describe('many to many', function() {
      it("removes the reference id, which was added in the first place", function() {
        var User = sequelize.define('User', { username: Sequelize.STRING })
          , Task = sequelize.define('Task', { title: Sequelize.STRING })

        User.hasMany(Task)
        expect(Task.attributes.UserId).toBeDefined()

        Task.hasMany(User)
        expect(Task.attributes.UserId).not.toBeDefined()
      })
    })
  }