function(data){
            util.addClass(this.tipNodes.error, this.hideClass);
            util.addClass(this.tipNodes.noResult, this.hideClass);
            //var root = this.getNode('ui-table');
            var root = this.rootNode;
            //var root = this.getNode(this.root);

            if(data.dataTable.rows.length === 0){
                //this.show(false);
                //this.applyInterface('error');
                //util.removeClass(this.tipNodes.noResult, this.hideClass);
                this.showNoResult();
                return ;
            }
            data = data.dataTable;
            var table = root.getElementsByTagName('table')[0],
                thead = table.getElementsByTagName('thead')[0],
                tbody = table.getElementsByTagName('tbody')[0],
                tpl = '';

            if(thead) table.removeChild(thead);
            if(tbody) table.removeChild(tbody);

            var div = document.createElement('div');
            div.innerHTML = '<table><thead>' + util.parseTpl(this.tableTpl.head, data) + '</thead></table>';
            thead = div.getElementsByTagName('thead')[0];
            table.appendChild(thead);

            div.innerHTML = '<table><tbody>' + util.parseTpl(this.tableTpl.body, data) + '</tbody></table>';
            tbody = div.getElementsByTagName('tbody')[0];
            table.appendChild(tbody);

            //util.removeClass(root, this.hideClass);
            this.show(true);

            this.registerEvents();
        }