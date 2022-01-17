function(){
    $('ul.storylist').sortable({
        connectWith: 'ul.storylist',
        opacity: 0.7,
        revert: 200,
        placeholder: 'alert alert-info',
        forcePlaceholderSize: true
    }).disableSelection();
    
    $('ul.sprint').on('sortupdate sortcreate', function(e, ui){
        set_sprint_points();
    });

    $('#sprint-form').on('submit', function(e){
        var bug_ids = $('ul.sprint').sortable('toArray');

        if (bug_ids.length) {
            $('#id_sprint_bugs').val(bug_ids.join(','));
        }
        else {
            e.preventDefault();
            $('#form_error').show();
        }
    });

    set_sprint_points();
}