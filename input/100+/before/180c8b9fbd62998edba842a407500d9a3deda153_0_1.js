function(event) {
            event.preventDefault();
            var este = $(this);
            var dialogo = $("#modal_confirmar");
            if ($("#modal_confirmar").size() == 0 ){
                dialogo = $('<div id="modal_confirmar"></div>').addClass('modal fade');
                var header = $('<div><a class="close" data-dismiss="modal">×</a><h3>Confirme</h3></div>').addClass('modal-header');
                var cuerpo = $('<div><p></p></div>').addClass('modal-body');
                var footer = $('<div></div>').addClass('modal-footer');
                dialogo.append(header);
                dialogo.append(cuerpo);
                dialogo.append(footer);
                footer.append('<a class="btn" href="#modal_confirmar" data-toggle="modal">No</a>');
                footer.append('<a class="respuesta-si btn btn-success">Si</a>');
                $('.respuesta-si',dialogo).on('click',function(){
                    dialogo.modal('hide');
                    document.location.href = este.attr('href');
                });
            }
            $(".modal-body p" , dialogo).html(este.attr('title'));
            dialogo.modal();
        }