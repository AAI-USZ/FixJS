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
        if (subCategory) {
            categoryHeader.text(subCategory.get('name'));
            categoryTitle.text(subCategory.get('name'));
            categoryDescription.text(subCategory.get('description'));
        } else if (category) {
            categoryHeader.text(category.get('name'));
            categoryTitle.text(category.get('name'));
            categoryDescription.text(category.get('description'));
        } else {
            categoryHeader.text('todos los temas');
            categoryTitle.text('Todos los temas');
            categoryDescription.text('');
        }

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