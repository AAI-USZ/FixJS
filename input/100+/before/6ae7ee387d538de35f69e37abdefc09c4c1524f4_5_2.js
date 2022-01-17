function() {
            var top = 130;
            if (sakai.config.enableBranding){
                top = top + $('.branding_widget').height();
            }
            $inserterbarWidget.css({
                'left': $('.s3d-page-header,.s3d-page-noheader').position().left + $('.s3d-page-header').width() - $inserterbarWidget.width() - 12,
                'top': top
            });
            addBinding();
            renderWidgets();
        }