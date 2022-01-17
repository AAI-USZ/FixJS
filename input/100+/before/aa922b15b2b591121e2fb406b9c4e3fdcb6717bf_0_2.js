function (data, status, xhr) {
        var len = data.length;
        this.clear_list();

        if(len == 0)
        {
            $(this.new_notebook_item(0))
                .append(
                    $('<div style="margin:auto;text-align:center;color:grey"/>')
                    .text('Notebook list empty.')
                    )
        }

        for (var i=0; i<len; i++) {
            var notebook_id = data[i].notebook_id;
            var nbname = data[i].name;
            var kernel = data[i].kernel_id;
            var item = this.new_notebook_item(i);
            this.add_link(notebook_id, nbname, item);
            if (!IPython.read_only){
                // hide delete buttons when readonly
                if(kernel == null){
                    this.add_delete_button(item);
                } else {
                    this.add_shutdown_button(item,kernel);
                }
            }
        };
    }