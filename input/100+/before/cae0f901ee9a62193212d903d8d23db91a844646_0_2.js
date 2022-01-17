function(recs) {
            var that = this;
            
            var listContainer = that.view.find('#listscroller #scroller #contactlist');
            var listSummary = that.view.find('#listscroller #scroller #resultCount');
            
            listContainer.empty(); listSummary.empty();

            if(!recs || recs.length == 0) {
                listSummary.text('No ' + contactPluralLabel + ' Found');
            } else {
                listSummary.text('Found ' + recs.length + ' ' + contactPluralLabel);
            }
                
            recs.sort(function(x, y) {
                var a = x.LastName.toLowerCase(); var b = y.LastName.toLowerCase();
                return ((a == b) ? 0 : ((a > b) ? 1 : -1 ));
            });
            var chars = [];     
            
            $j.each(recs, 
                function () {
                    var id = htmlEncode(this.Id);
                    var rec = this;
                    if (chars.length == 0 || (this.LastName != null && chars.last() != this.LastName[0].toUpperCase())) {
                        chars.push(this.LastName[0].toUpperCase());
                        $j('<li></li>').addClass('listseparater').text(chars.last()).appendTo(listContainer);
                    }
                    
                    var listElem = $j('<li></li>').attr('id', 'contact_' + id);
                    if (id == that.selectedContactId) listElem.addClass('cellselected');
                    listElem.text((this.FirstName || '') + ' ')
                            .append($j('<strong></strong>').text(this.LastName || ''))
                            .appendTo(listContainer);
                });
        }