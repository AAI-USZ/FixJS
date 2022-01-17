function(tracer_id, idIsPid, originalInput) {
        if (typeof tracer_id === "undefined") {
            return null;
        }
        
        if (idIsPid)
            tracer_id = this.pidToTracerMap[tracer_id];
        var id = "section" + tracer_id;
        var $ext = document.getElementById("console_" + id);

        // Create the output block
        if (!$ext && typeof originalInput !== "undefined") {
            this.createOutputBlock(this.getPrompt(originalInput), null, tracer_id);
            $ext = document.getElementById("console_" + id);
        }

        return {
            $ext : $ext,
            id : id
        };
    }