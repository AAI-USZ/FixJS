function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined'){
        console.log("You pressed the button");
        BandNames.insert({'text': new_bandname, 'author': new_author });
      }
    }