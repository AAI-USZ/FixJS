function() {
        console.log("hiding user welcome, syncing sapir");
        this.syncUser("sapir","phoneme");

//        //This is the old logic which can still be used to load sapir without contacting a server. DO NOT DELETE
//        a = new App();
//        a.createAppBackboneObjects("sapir-firstcorpus",function() {
//          $('#user-welcome-modal').modal("hide");
//          window.startApp(a, function() {
//            window.appView.loadSample();
//          });
//        });
      }