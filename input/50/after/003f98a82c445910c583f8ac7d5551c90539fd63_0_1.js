function(error, result) {
      if(error) {
        console.log("create_categorie error with category: "+categoryData.category_id+ " "+categoryData.name);
        console.log(error);
        //pausecomp(10000);
        //create_categorie(categoryData);
      }
      else {console.log("categorie created")}
    }