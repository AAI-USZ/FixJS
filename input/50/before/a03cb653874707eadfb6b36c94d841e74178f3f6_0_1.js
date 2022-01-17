function(catName) {

        var tmpl = $('#category-item').html(),
            cat = Mustache.to_html(tmpl, {category_name:catName});

        this.element.append(cat);

    }