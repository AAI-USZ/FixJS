function(catName) {

        var tmpl = $('#category-item').html(),
            params = {category_name:catName},
            cat = Mustache.to_html(tmpl, params);

        this.element.append(cat);

    }