function(error, result) {
      if(error) {
        console.log("update_categorie error with category: "+categoryData.category_id+ " "+categoryData.name);
        console.log(error);
        //pausecomp(10000);
        //update_categorie(categoryData);
      }
      else {console.log("categorie updated")}
    }