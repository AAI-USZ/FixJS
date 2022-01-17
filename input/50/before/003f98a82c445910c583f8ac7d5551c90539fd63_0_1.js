function(error, result) {
      if(error) {
        console.log(error);
        //pausecomp(10000);
        create_categorie(categoryData);
      }
      else {console.log("categorie created")}
    }