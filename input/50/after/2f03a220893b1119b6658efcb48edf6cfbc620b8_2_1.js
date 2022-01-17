function() {
      listController = Application.getController('KR.controller.EntryController');
      listWidget = listController.getPanelView();
      expect(listWidget).toBeDefined();
   }