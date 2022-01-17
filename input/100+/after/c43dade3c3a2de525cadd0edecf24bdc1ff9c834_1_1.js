function(callback, v) {
            var record = this.getRecord(), dataTable = this.getDataTable(), sortedBy = dataTable.get('sortedBy'), paginator = dataTable.get('paginator');

            var onSuccess = function(data) {
                dataTable.getDataSource().flushCache();
                if (sortedBy.key == 'priority') {
                    dataTable.onPaginatorChangeRequest(paginator.getState({'page':paginator.getCurrentPage()}));
                }
            }

            jQuery.ez('ezjscnode::updatepriority', {
                ContentNodeID: record.getData('parent_node_id'),
                ContentObjectID: record.getData('contentobject_id'),
                PriorityID: [record.getData('node_id')],
                Priority: [v]
            }, onSuccess);
            callback(true, v);
        }