function() {
    xhr.useResult("no_identities");

    bid.manageAccount(mocks, function() {
      equal($("#emailList").children().length, 0, "no children have been added");
      start();
    });
  }