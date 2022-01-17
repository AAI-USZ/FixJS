function(e) {
            if (skipClientValidation) {
                return;
            }
            var is_tool_selected = M.plagiarism_programming.assignment_setting.check_mandatory_form_field(Y);
            var is_date_valid = M.plagiarism_programming.assignment_setting.check_submit_date(Y);
            if (!is_tool_selected || !is_date_valid) {
                e.preventDefault();
            }
        }