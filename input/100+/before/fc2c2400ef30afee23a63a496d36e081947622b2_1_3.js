function(evt) {
        var id = $(evt.target).data("id");
        if (!id) {
            $(evt.target).data("id", id = IPython.utils.uuid());
        }
        if (replaceOutput && sagecell.last_session[id]) {
            $(sagecell.last_session[id].session_container).remove();
        }
        var session = new sagecell.Session(outputLocation, false);
        session.execute(textArea.val());
        sagecell.last_session[id] = session;
        // TODO: kill the kernel when a computation with no interacts finishes,
        //       and also when a new computation begins from the same cell
        outputLocation.find(".sagecell_output_elements").show();
    }