function() {
            scorm_buttons[0].set('disabled', (scorm_skipprev(scorm_current_node) == null || scorm_skipprev(scorm_current_node).title == null ||
            		scoes_nav[launch_sco].hideprevious == 1));
            scorm_buttons[1].set('disabled', (scorm_prev(scorm_current_node) == null || scorm_prev(scorm_current_node).title == null || 
            		scoes_nav[launch_sco].hideprevious == 1));
            scorm_buttons[2].set('disabled', (scorm_up(scorm_current_node) == null) || scorm_up(scorm_current_node).title == null);
            scorm_buttons[3].set('disabled', (((scorm_next(scorm_current_node) == null || scorm_next(scorm_current_node).title == null) && 
            		(scoes_nav[launch_sco].flow != 1)) || (scoes_nav[launch_sco].hidecontinue == 1)));
            scorm_buttons[4].set('disabled', (scorm_skipnext(scorm_current_node) == null || scorm_skipnext(scorm_current_node).title == null ||
            		scoes_nav[launch_sco].hidecontinue == 1));
        }