function () {
            view = new AddModal({collection : noteCategories, model : new Note({category_id: categories.getCurrentCatId() }) } );
            view.render();
        }