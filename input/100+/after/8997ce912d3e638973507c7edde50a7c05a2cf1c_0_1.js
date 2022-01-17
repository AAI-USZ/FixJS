function() {
            var form = $(this);
            // callback
            options.onBeforeInit(form);
            // add options.formCssClass to all forms in the inline
            // except table/theader/add-item
            if (form.attr('id') !== "") {
                form.not("." + options.emptyCssClass).not(".table").not(".thead").not(".add-item").addClass(options.formCssClass);
            }
            // add options.predeleteCssClass to forms with the delete checkbox checked
            form.find("li.delete-handler-container input").each(function() {
                if ($(this).attr("checked") && form.hasClass("has_original")) {
                    form.toggleClass(options.predeleteCssClass);
                }
            });
            // callback
            options.onAfterInit(form);
        }