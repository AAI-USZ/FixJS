function () {
            var notebook_id = IPython.notebook.get_notebook_id();
            var url = $('body').data('baseProjectUrl') + notebook_id + '/copy';
            window.open(url,'_newtab');
        }