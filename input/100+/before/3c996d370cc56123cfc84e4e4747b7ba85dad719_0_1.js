function(event) {
      var member,
        _this = this;
      member = $(event.target).model();
      if (confirm("Sign in as " + member.attributes.name + "?")) {
        this.thankYouName = member.attributes.name;
        this.render();
        setTimeout(function() {
          _this.thankYouName = false;
          _this.filtered.reset([]);
          _this.emptyInput = true;
          _this.render();
          return _this.$('input[type="text"]').focus();
        }, 3000);
        $.post('/signin?memberId=' + member.attributes.id, {});
        return generateUniqueTweet(member.attributes.name);
      }
    }