function(error, result) {
      if(error) {
        console.log(error);
        //pausecomp(10000);
        update_categorie(categoryData);
      }
      else {console.log("categorie updated")}
    }