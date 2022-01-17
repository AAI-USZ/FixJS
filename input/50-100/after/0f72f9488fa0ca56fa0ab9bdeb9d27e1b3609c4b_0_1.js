function(checked) {
            if (checked) {
                showQuestion();
                $(actionCheckboxes).attr("checked", true)
                    .parent().parent().toggleClass(options.selectedClass, checked);
            } else {
                reset();
                $(actionCheckboxes).attr("checked", false)
                    .parent().parent().toggleClass(options.selectedClass, checked);
            }
        }