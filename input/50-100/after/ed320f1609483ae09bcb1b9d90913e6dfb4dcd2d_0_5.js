function()
        {
            var btn = $(this);
            btn.text('......');
            $.post('/region/saveData', $('#data_save_form form').serialize(), function(globalData)
            {

                for (var i in globalData.features)
                {
                    that.polygons[i].setProperties(globalData.features[i]);
                }
                that.colorize();
                btn.text('Сохранить');
            }, 'json');
            $('#data_save_form').modal('hide');
            return false;
        }