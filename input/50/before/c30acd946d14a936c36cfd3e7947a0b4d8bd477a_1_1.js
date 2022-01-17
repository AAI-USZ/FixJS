function(router) {
        var query = router.getPath('searchController.query');
        var recentsController = router.get('recentsController');

        recentsController.addQuery(query);
        router.transitionTo('result', query);
      }