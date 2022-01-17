function(checked) {
            if (checked) {
                showQuestion();
            } else {
                reset();
            }
            $(actionCheckboxes).attr("checked", checked)
                .parent().parent().toggleClass(options.selectedClass, checked);
        }