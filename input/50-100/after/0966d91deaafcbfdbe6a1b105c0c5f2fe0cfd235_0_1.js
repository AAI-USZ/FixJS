function deleteNote(id, notif, refresh)
{
        (typeof refresh === "undefined")?true:refresh;
        (typeof notify === "undefined")?true:notif;

        $.get('/notes/delete?_id='+id, function(data) {
        		if(refresh) refreshNotes();
                if(notif) notify('Note deleted successfully!', 'alert-success');
        });
}