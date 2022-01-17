function() {
        console.log("hiding user welcome, syncing sapir");
        //Load a corpus, datalist, session and user
        a = new App();
        a.createAppBackboneObjects("sapir-firstcorpus",function() {
          $('#user-welcome-modal').modal("hide");
          window.startApp(a, function() {
            window.appView.loadSample();
          });
        });
      }