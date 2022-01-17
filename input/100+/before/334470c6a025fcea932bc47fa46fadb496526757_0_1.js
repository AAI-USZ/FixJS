function (event) {
            var files = event.originalEvent.dataTransfer.files;
            for (var i = 0, f; f = files[i]; i++) {
                var reader = new FileReader();
                reader.readAsText(f);
                var fname = f.name.split('.'); 
                var nbname = fname.slice(0,-1).join('.');
                var nbformat = fname.slice(-1)[0];
                if (nbformat === 'ipynb') {nbformat = 'json';};
                if (nbformat === 'py' || nbformat === 'json') {
                    var item = that.new_notebook_item(0);
                    that.add_name_input(nbname, item);
                    item.data('nbformat', nbformat);
                    // Store the notebook item in the reader so we can use it later
                    // to know which item it belongs to.
                    $(reader).data('item', item);
                    reader.onload = function (event) {
                        var nbitem = $(event.target).data('item');
                        that.add_notebook_data(event.target.result, nbitem);
                        that.add_upload_button(nbitem);
                    };
                };
            }
            return false;
        }