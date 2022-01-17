function() {
    return requirejs(["ui/editor/Editor", "model/presentation/Deck"], function(Editor, Deck) {
      var deck, editor;
      deck = new Deck();
      editor = new Editor({
        model: deck
      });
      window.zTracker = {
        z: 0,
        next: function() {
          return ++this.z;
        }
      };
      $("body").append(editor.render());
      return deck.newSlide();
    });
  }