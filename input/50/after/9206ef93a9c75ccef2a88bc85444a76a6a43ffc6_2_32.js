function(data) {

                    this.current_category_id = params[0];

                    this.setBlock('contacts-list', null, data && data.system_category ? [] : ['category-actions']);

                }