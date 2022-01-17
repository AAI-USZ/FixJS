function (data) {
            if (visualitzacio === consulta_parametre_visualitzacio('visualitzacio')) {
                $('.pagina' + pagina_str).replaceWith(data);
                inicialitza_js_pagines();
                $(document).trigger('pinta_pagina_seguent', pagina);
                if (callback) { callback(); 
                }
            }
            else {
                console.log("View discarted!");
            }
            var id = $('.pagina' + pagina + ' video').attr('id')
            _V_(id, {"controls": true, "autoplay": false, "preload": "auto"}, function(){
              // Player (this) is initialized and ready.
            });            
        }).error(function(){genericAjaxError($('.pagina ' + pagina_str));}