function () {
            var originalTableHeader = this.grid.$thead.detach();
            var originalTableFooter = this.grid.$tfoot.detach();
            var originalTableBody = this.grid.$tbody.detach();
            var containingDiv = $("<div>").addClass('scrollingContainer');
            if(this.containingDiv) {
                var oldContainer = this.containingDiv;
                this.grid.$table = oldContainer;
            }
            this.containingDiv = containingDiv;
            var classes = this.grid.$table.attr('class');
            var id = this.grid.$table.attr('id');
            containingDiv.attr({'class': classes, id: id});
            
            this.grid.$table.replaceWith(containingDiv);
            var tht = $("<table>").append(originalTableHeader);
            var tft = $("<table>").append(originalTableFooter);
            var tbt = $("<table>").append(originalTableBody);
            var scrollingDiv = $("<div>").addClass('scroller').append(tbt);
            originalTableHeader.find("tr").append($("<th>").addClass('scrollSize'));
            originalTableFooter.find("tr").append($("<th>").addClass('scrollSize'));
            containingDiv.append(tht);
            containingDiv.append(scrollingDiv);
            containingDiv.append(tft);
            this.grid.$table = tbt;
        }