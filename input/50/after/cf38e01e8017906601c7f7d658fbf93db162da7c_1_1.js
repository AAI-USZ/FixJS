function () {
            view = new AddModal({collection : noteCategories, model : new Note({category_id: noteCategories.getCurrentCatId() }) } );
            view.render();
        }