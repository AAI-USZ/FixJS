function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined'){
        console.log("You pressed the button");
        var text = $('[name="new_bandname"]').val();
        var author = $('[name="new_bandname"]').val();
        BandNames.insert({'text': text, 'author': author });
      }
    }