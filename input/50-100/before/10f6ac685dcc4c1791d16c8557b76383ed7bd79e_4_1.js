function() {
            if (sakai.config.enableCategories) {
                sakai.api.Util.TemplateRenderer($("#explore_categories_template"), {}, $("#explore_categories"));
            }
        }