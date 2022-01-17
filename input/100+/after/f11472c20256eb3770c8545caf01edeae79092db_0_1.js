function () {
    if ($('docman_approval_table_create_add_reviewers')) {
        var userAutocomplete = new UserAutoCompleter('user_list', codendi.imgroot, true);
        userAutocomplete.registerOnLoad();
        if (!$('approval_table_reminder_checkbox').checked) {
            Element.toggle('approval_table_occurence_form', 'slide', { duration: 0 });
        }
        $('approval_table_reminder_checkbox').observe('click', function () {
            Effect.toggle('approval_table_occurence_form', 'slide', { duration: 0 });
            Effect.toggle('approval_table_reminder', 'slide', { duration: 0 });
        });
    }
}