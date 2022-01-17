function(data){
            util.addClass(this.tipNodes.error, this.hideClass);
            util.addClass(this.tipNodes.noResult, this.hideClass);
            //var root = this.getNode('ui-table');
            var root = this.rootNode;

            if(data.dataTable.rows.length === 0){
                this.show(false);
                this.applyInterface('error');
                util.removeClass(this.tipNodes.noResult, this.hideClass);
                return ;
            }
            data = data.dataTable;
            var table = root.getElementsByTagName('table')[0],
                tbody = table.getElementsByTagName('tbody')[0],
                tpl = '';

            if(tbody) table.removeChild(tbody);

            //if(util.isEmptyObject(data)){
            //    util.addClass(root, this.hideClass);
            //}else{
                var div = document.createElement('div');
                div.innerHTML = '<table><tbody>'+util.parseTpl(this.tableTpl, data)+'</tbody></table>';
                tbody = div.getElementsByTagName('tbody')[0];
                table.appendChild(tbody);
                this.registerEvents();
                //util.removeClass(root, this.hideClass);
                this.show(true);

            //}
        }