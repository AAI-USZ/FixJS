function (globalData) {

                for (var i in globalData.features) {
                    that.polygons[i].setProperties(globalData.features[i]);
                }
                that.colorize();
                btn.text('Сохранить');
            }