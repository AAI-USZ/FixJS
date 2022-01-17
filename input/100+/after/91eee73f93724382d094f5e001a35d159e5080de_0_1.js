function() {
        var self = this;

        var cat = this.$el.data('initial-cat');
        var category = Macadjan.categories.find(function(item) {return item.get('id') == cat;});
        var subCat = this.$el.data('initial-subcat');
        var subCategory = Macadjan.subCategories.find(function(item) {return item.get('id') == subCat;});
        var keywords = this.$el.data('initial-keywords');

        var categoryBlock = this.$('#id-category-block');
        var categoryHeader = this.$('#id-category-header');
        var categoryTitle = this.$('#id-category-title');
        var categoryDescription = this.$('#id-category-description');

        var filterName, filterTitle, filterDescription;
        if (subCategory) {
            filterName = subCategory.get('name');
            filterDescription = subCategory.get('description');
        } else if (category) {
            filterName = category.get('name');
            filterDescription = category.get('description');
        } else {
            filterName = 'Todos los temas';
            filterDescription = '';
        }
        if (keywords) {
            if (keywords.split(' ').length > 1) {
                filterLine = filterName.toLowerCase() + ' y las palabras ' + keywords;
            } else {
                filterLine = filterName.toLowerCase() + ' y la palabra ' + keywords;
            }
        } else {
            filterLine = filterName.toLowerCase();
        }
        categoryHeader.text(filterLine);
        categoryTitle.text(filterName);
        categoryDescription.text(filterDescription);

        $.get(
            this.$el.data('entity-list-url'),
            {
                features: (cat || '') + '|' + (subCat || '') + '|' + keywords,
                bbox: '',
            },
            function(data) {
                var listBlock = self.$('#list-block');
                var categoryBlock = self.$('#id-category-block');
                listBlock.html(data);
                var categoryBlockHeight = categoryBlock.height() + 30;  // 30 is the padding of the blocks
                listBlock.height(600 - categoryBlockHeight);
            }
        );
    }