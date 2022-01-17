function (config) {

            this.expandComments = (config && config.expandComments) || false;

            this.template = Y.Lang.sub(Y.one('#post-row').getContent(), {

                IMG: baseURL + 'in/profile_pic/' + this.get('model').get('author_id')



            });



            this.get('model').after("change", this.render, this);

            this.get('model').on('destroy', function () {

                this.get('container').addClass('hide');

            }, this);

        }