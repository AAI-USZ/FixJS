function (params) {

            if(!params || !params[0]) {

                return;

            }



            this.showLoading();

            var p = this.parseParams(params.slice(1), 'contacts/category/'+params[0]);

            p.query = '/category/' + params[0];

            this.loadGrid(p, '/contacts/category/' + params[0] + '/', false, {

                beforeLoad: function(data) {

                    this.current_category_id = params[0];

                    this.setBlock('contacts-list', null, data && data.system_category ? [] : ['category-actions']);

                },

                afterLoad: function (data) {

                    $('#list-category li[rel="category'+params[0]+'"]').children('span.count').html(data.count);

                }

            });

        }