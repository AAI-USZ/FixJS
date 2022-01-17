function() {
      var m = new InsertUnicode({
        "symbol" : this.$el.children(".insert-unicode-input").val(),
        "tipa" :  this.$el.children(".insert-unicode-tipa-input").val()
      });
      app.get("authentication").get("userPrivate").get("prefs").get("unicodes")
          .add(m);
    }