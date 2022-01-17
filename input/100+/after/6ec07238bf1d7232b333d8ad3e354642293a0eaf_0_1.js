function(){
            console.log('rendering row');
            this.$el.empty().append(

                $('<td></td>', {
                    html: '<a href="#" class="webStatsLink">' + this.model.get('quantity') + '</a>',
                    style: 'text-align: center'
                })

                , $('<td></td>', {
                    html: '<a href="#">' + this.model.get('name') + '</a>',

                })

                , $('<td></td>', {
                    html: '$' + this.model.get('listPrice'),
                    style: 'text-align: center'
                })

                , $('<td></td>', {
                    html: '$' + this.model.get('whisperPrice'),
                    style: 'text-align: center'
                })

                , $('<td></td>', {
                    html: this.model.get('matches'),
                    style: 'text-align: center'
                })
            )

            if(this.model.get('active') > 0) {
                this.$el.append('<td style="text-align: center"><a href="#" class="offerToggle"><img src="/bundles/j2exchange/images/icons/color/tick.png" alt="enabled"></a></td>');
            } else {
                this.$el.append('<td style="text-align: center"><a href="#" class="offerToggle"><img src="/bundles/j2exchange/images/icons/color/cross.png" alt="disabled"></a></td>');
            }

            return this;
        }