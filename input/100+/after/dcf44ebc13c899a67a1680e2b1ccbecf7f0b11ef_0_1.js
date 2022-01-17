function() {
        _.each(this.itemslots, function(itemslot) {
            var tid          = this.cid + "_" + itemslot;
            
            var $currentItem = $('<div class="current-item span6" />'),
                $newItem     = $('<div class="new-item span6" />'),
                $tabpane     = $('<div class="tab-pane" />')
                                    .attr('id', tid)
                                    .data('itemslot', itemslot)
                                    .append($currentItem)
                                    .append($newItem),
                $tabA        = $('<a />')
                                    .on('click', _.bind(function(e) {
                                        this.activeitemslot = itemslot;
                                        this.doItemCompare(itemslot);
                                        $tabA.tab('show');         
                                        e.preventDefault();
                                    }, this))
                                    .attr('href', "#" + tid)
                                    .html(itemslot),
                $tab         = $('<li />')
                                    .data('itemslot', itemslot)
                                    .append($tabA);

            var curItem = this.model.getItemForSlot(itemslot, this.model.gearbag);
            var newItem = this.model.getItemForSlot(itemslot, this.model.new_gearbag);
           
            (new ItemView({'el': $currentItem, 'model': curItem, 'title': 'Current Item'})).render();
            (new ItemView({'el': $newItem,     'model': newItem, 'title': 'New Item', 'isNewItem': true})).render();

            curItem.on('change', function() { this.doItemCompare(itemslot); }, this);
            newItem.on('change', function() { this.doItemCompare(itemslot); }, this);
            
            $('ul.slot-list', this.el).append($tab);
            $('div.slot-list', this.el).append($tabpane);
        }, this);

        $('ul.slot-list > li:first', this.el).addClass('active');
        $('div.slot-list > div:first', this.el).addClass('active');

        _.each(resulttypes, function(resulttype) {
            var title = 'EHP ' + (resulttype == 'base' ? '' : resulttype);
            $(this.itemcompare_result_row_template({'key': resulttype, 'title': title, 'type': 'ehp'})).appendTo($('#item-compare-ehp table.results tbody', this.el));
        }, this);
        
        _.each(resulttypes, function(resulttype) {
            var title = 'VITeq ' + (resulttype == 'base' ? '' : resulttype);
            $(this.itemcompare_result_row_template({'key': resulttype, 'title': title, 'type': 'viteq'})).appendTo($('#item-compare-viteq table.results tbody', this.el));
        }, this);
        

        this.activeitemslot = $('ul.slot-list > li:first', this.el).data('itemslot');
        this.doItemCompare();
        this.model.on('change', _.bind(function() { this.doItemCompare(); }, this));
    }