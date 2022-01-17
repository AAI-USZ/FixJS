function(router) {
        var query = router.getPath('searchController.query');
        router.transitionTo('result', query);
      }