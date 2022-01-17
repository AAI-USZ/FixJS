function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/css_worker", "Worker");
        worker.attachToDocument(session.getDocument());
        
        worker.on("csslint", function(e) {
            var errors = [];
            e.data.forEach(function(message) {
                errors.push({
                    row: message.line - 1,
                    column: message.col - 1,
                    text: message.message,
                    type: message.type,
                    lint: message
                });
            });
            
            session.setAnnotations(errors);
        });
        return worker;
    }