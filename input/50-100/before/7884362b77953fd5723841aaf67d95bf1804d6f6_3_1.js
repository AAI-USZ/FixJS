function(template){
            var html = template.render(data);
            App.makeModal(html);
            bindDialog();
        }