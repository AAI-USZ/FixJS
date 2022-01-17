function() {
        //fix for #1036 where closing a edit form before the autocomplete was filled
        //resulted in a dropdown box that could not be removed. We remove all
        //autocomplete boxes the hard way
        $('.ac_results').remove();

        // initialize autocompleters
        ProjectItems.setup_autocomplete_for_projects('input[name=project_name]');
        ContextItems.setup_autocomplete_for_contexts('input[name=context_name]');
        ContextItems.setup_autocomplete_for_contexts('input[id="project_default_context_name"]');
        TracksPages.setup_autocomplete_for_tag_list('input[name=tag_list]'); // todo edit form
        TracksPages.setup_autocomplete_for_tag_list('input[id="project_default_tags"]');
        TodoItems.setup_autocomplete_for_predecessor();
    }