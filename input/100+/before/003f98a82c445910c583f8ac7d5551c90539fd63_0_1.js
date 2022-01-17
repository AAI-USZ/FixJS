function(error, result) {

    if (error) {console.log(error);}
    else {
      var children = result.children.split(',');
      //pausecomp(10000);
      //console.log(result);
      update_or_create(result);
      for (var i = children.length - 1; i >= 0; i--) {
        getCategorie(children[i]);
      }
    }
  }