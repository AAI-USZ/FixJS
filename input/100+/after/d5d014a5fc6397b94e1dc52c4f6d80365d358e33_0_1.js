function() {
        var buttonsDiv = this.Y.one('#forumng-buttons');
        var selectAll = this.Y.Node.create('<input type="button"/>');
        selectAll.set('value', M.str.moodle.selectall);
        buttonsDiv.appendChild(document.createTextNode(' '));
        buttonsDiv.appendChild(selectAll);
        var deselectAll = this.Y.Node.create('<input type="button"/>');
        deselectAll.set('value', M.str.moodle.deselectall);
        buttonsDiv.appendChild(document.createTextNode(' '));
        buttonsDiv.appendChild(deselectAll);

        var unsubscribe;
        var inputs = this.Y.one('#forumng-subscription-list').all('input');
        var all = [];
        for (var i=0; i<inputs.size(); i++) {
            var input = inputs.item(i);
            if (input.get('name').indexOf('user')==0) {
                all.push(input);
            }
            if (input.get('name') == 'unsubscribe') {
                unsubscribe = input;
            }
        }

        var update = function() {
            var allSelected=true, noneSelected=true;
            for (var i=0; i<all.length; i++) {
                if (all[i].get('checked')) {
                    noneSelected = false;
                } else {
                    allSelected = false;
                }
            }
            selectAll.set('disabled', allSelected);
            deselectAll.set('disabled', noneSelected);
            unsubscribe.set('disabled', noneSelected);
        };
        update();

        for (var i=0; i<all.length; i++) {
            all[i].on('click', update, this);
        };

        selectAll.on('click', function() {
            for (var i=0; i<all.length; i++) {
                all[i].set('checked', true);
            }
            update();
        }, this);

        deselectAll.on('click', function() {
            for (var i=0; i<all.length; i++) {
                all[i].set('checked', false);
            }
            update();
        }, this);
    }