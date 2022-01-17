function() {
      var num = Math.floor(Math.random() * 10) + 1;

      expect(answers.fizzBuzz()).not.to.be.ok();
      expect(answers.fizzBuzz(2)).to.be(2);
      expect(answers.fizzBuzz(3)).to.be('fizz');
      expect(answers.fizzBuzz(5)).to.be('buzz');
      expect(num * 3 * 5).to.be('fizzbuzz');
    }