function (evt) {
        if (replaceOutput && sagecell.last_session[evt.data.id]) {
            $(sagecell.last_session[evt.data.id].session_container).remove();
        }
        var session = new sagecell.Session(outputLocation);
        session.execute(textArea.val());
        sagecell.last_session[evt.data.id] = session;
        // TODO: kill the kernel when a computation with no interacts finishes,
        //       and also when a new computation begins from the same cell
        outputLocation.find(".sagecell_output_elements").show();
    }