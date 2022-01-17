function(doc, collection) {
    var dataUri = this.MONGOHQ_API_BASE_URI +
                  collection + "/documents" +
                  "?_apikey=i0h95kvp3dyx14hvw9bl";
    $.ajax({
      type: 'POST',
      url: dataUri,
      data: {"document": doc},
      dataType: "json",
      success: function() {
        //console.log("done");
      }
    });
  }