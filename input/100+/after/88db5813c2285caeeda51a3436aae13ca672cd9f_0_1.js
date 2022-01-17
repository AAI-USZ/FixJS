function(error, result) {

    if (error) {
      console.log("getCategorie error with category_id: "+category_id);
      console.log(error);
    }
    else {
      var children = result.children.split(',');
      //pausecomp(10000);
      //console.log(result);
      update_or_create(result);
      for (var i = children.length - 1; i >= 0; i--) {
        //console.log(children[i]);
        if(children[i] != null && children[i] != "" &&  children[i] != " ")
          getCategorie(Number(children[i]));
        else {
          //console.log('wrong child?!');
          //console.log(result);
        }
      }
    }
  }