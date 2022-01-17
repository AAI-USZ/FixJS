function(router, query) {
          var recentsController = router.get('recentsController');
          var applicationController = router.get('applicationController');

          recentsController.addQuery(query);
          applicationController.connectOutlet('results');
          router.get('resultsController').fetch(query);
        }