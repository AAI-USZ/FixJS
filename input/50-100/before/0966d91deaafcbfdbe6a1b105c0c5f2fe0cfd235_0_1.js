function deleteNote(id, notify, refresh)
{
        (typeof refresh === "undefined")?true:refresh;
        (typeof notify === "undefined")?true:notify;

        $.get('/notes/delete?_id='+id, function(data) {
		if(refresh) refreshNotes();
                if(notify) notify('Note deleted successfully!', 'alert-success');
        });
}