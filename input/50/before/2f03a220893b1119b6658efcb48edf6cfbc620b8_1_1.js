function() {
      listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getEntriesList();
      expect(listWidget).toBeDefined();

  }