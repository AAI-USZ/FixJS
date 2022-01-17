function(session) {
        var worker = new WorkerClient(["ace"], "ace/worker/json", "JsonWorker");
        worker.attachToDocument(session.getDocument());

        worker.on("error", function(e) {
            session.setAnnotations([e.data]);
        });

        worker.on("ok", function() {
            session.clearAnnotations();
        });

        return worker;
    }