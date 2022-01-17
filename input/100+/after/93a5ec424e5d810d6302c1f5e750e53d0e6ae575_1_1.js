function(itemslot) {
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

            $('.title', $newItem).append('<button class="btn equip-new-item btn-primary btn-mini pull-right"><i class="icon-chevron-left icon-white"></i> Equip</button>');

            curItem.on('change', function() { this.doItemCompare(itemslot); }, this);
            newItem.on('change', function() { this.doItemCompare(itemslot); }, this);

            newItem.on('change', function() { this.validateNewItemEquippable(itemslot); }, this);

            $('ul.slot-list', this.el).append($tab);
            $('div.slot-list', this.el).append($tabpane);
            
            this.validateNewItemEquippable(itemslot);
        }