function(event) {
      var member,
        _this = this;
      member = $(event.target).model();
      console.log(member);
      if (confirm("Sign in as " + member.attributes.member.name + "?")) {
        this.thankYouName = member.attributes.member.name;
        this.render();
        setTimeout(function() {
          _this.thankYouName = false;
          _this.filtered.reset([]);
          _this.emptyInput = true;
          _this.render();
          return _this.$('input[type="text"]').focus();
        }, 3000);
        $.post('/signin?memberId=' + member.attributes.member.member_id, {});
        return generateUniqueTweet(member.attributes.member.name);
      }
    }