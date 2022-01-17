function(note) {

        $("input[name='notename']").val(note.title);
        $("textarea#id_note_message").val(note.message);
        $("#last-edited-note").text(noteID);
    }