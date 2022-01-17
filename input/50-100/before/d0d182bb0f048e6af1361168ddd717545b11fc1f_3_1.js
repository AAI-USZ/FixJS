function() {
      it('should sanitize the title due to incorrect type', function(done) {
        dpd.todos.post({title: 7}, function (todo, err) {
          delete todo.id;
          expect(todo).to.eql({done: false});
          done()
        })
      })
    }