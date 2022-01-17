function() {
        var item = Speaks.find({},
        {
            sort: {
                elapsedTime: 1
            },
            limit: 1,
            skip: (this.nextItemIndex)
        }).fetch();

        // step in the pos of brick
        this.nextItemIndex++;
        // judege if it is the last brick
        if (this.nextItemIndex >= Speaks.find().count()) {
            this.nextItemIndex %= (Speaks.find().count() || 1);
            this.isLastLine = true;
        } else {
            this.isLastLine = false;
        }

        console.log('[getBricks]', this.nextItemIndex, item.content, this.isLastLine);
        return {
            frame: Meteor.ui.render(function() {
                return Template.speakhall({
                    speaks: item
                });
            }),
            html: Template.speakhall({
                speaks: item
            }),
            style: this.styleMap[item[0].style]
        };

    }