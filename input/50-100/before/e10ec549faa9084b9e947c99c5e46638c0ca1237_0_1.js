function(e) {
            var is_valid = M.plagiarism_programming.assignment_setting.check_mandatory_form_field(Y);
            if (!is_valid) {
                e.preventDefault();
            }
        }