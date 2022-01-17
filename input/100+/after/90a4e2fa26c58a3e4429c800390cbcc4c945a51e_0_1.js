function (done) {
    ghost.setValue('input[name="q"]', "Cheese!")
    .submitForm("#tsf")
    .pause(2000)
    .getTitle(function (title) {
      console.log("Page title is: " + title);
      title.should.include('Cheese');
    })
    .done(done);
  }