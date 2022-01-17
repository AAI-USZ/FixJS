function(session) {
        var worker = new WorkerClient(["ace"], "ace/worker/coffee", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("error", function(e) {
            session.setAnnotations([e.data]);
        });
        
        worker.on("ok", function(e) {
            session.clearAnnotations();
        });
        
        return worker;
    }