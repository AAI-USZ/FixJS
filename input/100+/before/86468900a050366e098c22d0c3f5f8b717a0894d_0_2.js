function()
{
    $.validator.addMethod(
        "isEqual",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            var pass1 = $('#fos_user_registration_form_plainPassword_first').val();
            var pass2 = $('#fos_user_registration_form_plainPassword_second').val();
            if(pass1 == "" || pass2 == "")
                return false;
            if(pass1 == pass2) return true;
            else return false;
        },
        "Por favor coloque un correo"
    );
    $.validator.addMethod(
        "validateEmail",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            if(value == '') return true;
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },
        "Por favor coloque un correo"
    );
    $.validator.addMethod(
        "validateEmailNoNull",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            if(value == '') return false;
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\ ".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA -Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(value);
        },
        "Por favor coloque un correo"
    );
    $.validator.addMethod(
        "isANumber",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            return (value - 0) == value && value.length > 0;
        },
        "Por favor coloque un numero"
    );
    $.validator.addMethod(
        "venezuelanDate",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        },
        "Por favor coloque una fecha en formato dd/mm/yyyy"
    );
    $.validator.addMethod(
        "userImageExtension",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            //return value.match(/^\d\d?\/\d\d?\/\d\d$/);
            if(value == '') return true;
            var val = value.split('.').pop();
            if(val != "jpg" && val != "gif" && val != "png")
                return false
            return true;
        },
        "Por favor coloque un archivo jpg|gif|png"
    );
    $.validator.addMethod(
        "cmFileExtension",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            //return value.match(/^\d\d?\/\d\d?\/\d\d$/);
            if(value == '') return false;
            var val = value.split('.').pop();
            //alert(val);
            if(val != "csv") return false; else return true;
        },
        "Por favor coloque un archivo .csv"
    );
    $.validator.addMethod(
        "dateRange",
        function(value, element) {
            // put your own logic here, this is just a (crappy) example
            //var valid = value.match(/^\d\d?\/\d\d?\/\d\d$/);
            var from = $('#inces_comedorbundle_contabilidadtype_from').val();
            var to   = $('#inces_comedorbundle_contabilidadtype_to').val();
            if((from == "" && to != "") || (from != "" && to == ""))
                return false;
            return value.match(/^\d\d?\/\d\d?\/\d\d\d\d$/);
        },
        "Por favor coloque una fecha en formato dd/mm/yyyy"
    );

    /* --------- Inicio de las validaciones ------- */
    $('.menu_form').validate({
        rules: {
            'inces_comedorbundle_menutype[seco]'     : { required       : true },
            'inces_comedorbundle_menutype[sopa]'     : { required       : true },
            'inces_comedorbundle_menutype[salado]'   : { required       : true },
            'inces_comedorbundle_menutype[jugo]'     : { required       : true },
            'inces_comedorbundle_menutype[ensalada]' : { required       : true },
            'inces_comedorbundle_menutype[postre]'   : { required       : true },
            'inces_comedorbundle_menutype[dia]'      : { venezuelanDate : true }
        },
        messages: {
            'inces_comedorbundle_menutype[seco]'     : { required       : 'Coloque el campo Seco' },
            'inces_comedorbundle_menutype[sopa]'     : { required       : 'Coloque el campo Sopa' },
            'inces_comedorbundle_menutype[salado]'   : { required       : 'Coloque el campo Salado' },
            'inces_comedorbundle_menutype[jugo]'     : { required       : 'Coloque el campo Jugo' },
            'inces_comedorbundle_menutype[ensalada]' : { required       : 'Coloque el campo Ensalada' },
            'inces_comedorbundle_menutype[postre]'   : { required       : 'Coloque el campo Postre' },
            'inces_comedorbundle_menutype[dia]'      : { venezuelanDate : 'Por favor coloque una fecha en formato dd/mm/yyyy' }
        }
    });
    $('.menu_today_form').validate({
        rules: {
            'inces_comedorbundle_menutodaytype[seco]'     : { required       : true },
            'inces_comedorbundle_menutodaytype[sopa]'     : { required       : true },
            'inces_comedorbundle_menutodaytype[salado]'   : { required       : true },
            'inces_comedorbundle_menutodaytype[jugo]'     : { required       : true },
            'inces_comedorbundle_menutodaytype[ensalada]' : { required       : true },
            'inces_comedorbundle_menutodaytype[postre]'   : { required       : true }
        },
        messages: {
            'inces_comedorbundle_menutodaytype[seco]'     : { required       : 'Coloque el campo Seco' },
            'inces_comedorbundle_menutodaytype[sopa]'     : { required       : 'Coloque el campo Sopa' },
            'inces_comedorbundle_menutodaytype[salado]'   : { required       : 'Coloque el campo Salado' },
            'inces_comedorbundle_menutodaytype[jugo]'     : { required       : 'Coloque el campo Jugo' },
            'inces_comedorbundle_menutodaytype[ensalada]' : { required       : 'Coloque el campo Ensalada' },
            'inces_comedorbundle_menutodaytype[postre]'   : { required       : 'Coloque el campo Postre' }
        }
    });
    $('.usuario_form').validate({
        rules: {
            'inces_comedorbundle_usuariotype[nombre]'   : { required           : true },
            'inces_comedorbundle_usuariotype[apellido]' : { required           : true },
            'inces_comedorbundle_usuariotype[cedula]'   : { isANumber          : true },
            'inces_comedorbundle_usuariotype[ncarnet]'  : { isANumber          : true },
            'inces_comedorbundle_usuariotype[correo]'   : { validateEmail      : true },
            'inces_comedorbundle_usuariotype[image]'    : { userImageExtension : true }
        },
        messages: {
            'inces_comedorbundle_usuariotype[nombre]'   : { required           : 'Coloque un Nombre' },
            'inces_comedorbundle_usuariotype[apellido]' : { required           : 'Coloque un Apellido' },
            'inces_comedorbundle_usuariotype[cedula]'   : { isANumber          : 'Coloque una Cédula válida' },
            'inces_comedorbundle_usuariotype[ncarnet]'  : { isANumber          : 'Coloque un Número de Carnet válido' },
            'inces_comedorbundle_usuariotype[correo]'   : { validateEmail      : 'Coloque un Correo válido' },
            'inces_comedorbundle_usuariotype[image]'    : { userImageExtension : 'La extension de la imagen debe ser gif|jpg|png' }
        }
    });
    $('.usuario_externo_form').validate({
        rules: {
            'inces_comedorbundle_usuarioexternotype[nombre]'   : { required           : true },
            'inces_comedorbundle_usuarioexternotype[apellido]' : { required           : true },
            'inces_comedorbundle_usuarioexternotype[cedula]'   : { isANumber          : true }
        },
        messages: {
            'inces_comedorbundle_usuarioexternotype[nombre]'   : { required           : 'Coloque un Nombre' },
            'inces_comedorbundle_usuarioexternotype[apellido]' : { required           : 'Coloque un Apellido' },
            'inces_comedorbundle_usuarioexternotype[cedula]'   : { isANumber          : 'Coloque una Cédula válida' }
        }
    });
    $('.user_admin_form').validate({
        rules: {
            'fos_user_registration_form[username]'              : { required              : true },
            'fos_user_registration_form[plainPassword][first]'  : { isEqual               : true },
            'fos_user_registration_form[plainPassword][second]' : { isEqual               : true },
            'fos_user_registration_form[nombre]'                : { required              : true },
            'fos_user_registration_form[apellido]'              : { required              : true },
            'fos_user_registration_form[cedula]'                : { isANumber             : true },
            'fos_user_registration_form[ncarnet]'               : { isANumber             : true },
            'fos_user_registration_form[email]'                 : { validateEmailNoNull   : true }
        },
        messages: {
            'fos_user_registration_form[username]'              : { required              : 'Coloque el Nombre de Usuario'},
            'fos_user_registration_form[plainPassword][first]'  : { isEqual               : 'Las contraseñas deben coincidir y no pueden ser vacías'},
            'fos_user_registration_form[plainPassword][second]' : { isEqual               : 'Las contraseñas deben coincidir y no pueden ser vacías'},
            'fos_user_registration_form[nombre]'                : { required              : 'Coloque un Nombre'},
            'fos_user_registration_form[apellido]'              : { required              : 'Coloque un Apellido'},
            'fos_user_registration_form[cedula]'                : { isANumber             : 'Coloque un valor válido'},
            'fos_user_registration_form[ncarnet]'               : { isANumber             : 'Coloque un valor válido'},
            'fos_user_registration_form[email]'                 : { validateEmailNoNull   : 'Coloque un correo válido'}
        }
    });
    $('.user_admin_profile_form').validate({
        rules: {
            'fos_user_profile_form[user][username]'        : { required              : true },
            'fos_user_profile_form[current]'               : { required              : true },
            'fos_user_profile_form[user][email]'           : { validateEmailNoNull   : true }
        },
        messages: {
            'fos_user_profile_form[user][username]'        : { required              : 'Colocar un Nombre de Usuario'},
            'fos_user_profile_form[current]'               : { required              : 'Colocar una Contraseña'},
            'fos_user_profile_form[user][email]'           : { validateEmailNoNull   : 'Colocar un correo válido'}
        }
    });
    $('.rol_form').validate({
        rules: {
            'inces_comedorbundle_roltype[nombre]'             : { required       : true },
            'inces_comedorbundle_roltype[monto]'              : { isANumber      : true },
            'inces_comedorbundle_roltype[horaComerStart]'     : { isANumber      : true },
            'inces_comedorbundle_roltype[horaComerStartAMPM]' : { required       : true },
            'inces_comedorbundle_roltype[horaComerEnd]'       : { isANumber      : true },
            'inces_comedorbundle_roltype[horaComerEndAMPM]'   : { required       : true }
        },
        messages: {
            'inces_comedorbundle_roltype[nombre]'             : { required       : 'Coloque un Nombre' },
            'inces_comedorbundle_roltype[monto]'              : { isANumber      : 'Coloque un valor válido' },
            'inces_comedorbundle_roltype[horaComerStart]'     : { isANumber      : 'Coloque un valor válido' },
            'inces_comedorbundle_roltype[horaComerStartAMPM]' : { required       : true },
            'inces_comedorbundle_roltype[horaComerEnd]'       : { isANumber      : 'Coloque un valor válido' },
            'inces_comedorbundle_roltype[horaComerEndAMPM]'   : { required       : true }
        }
    });
    $('.reporte_usuarios_form').validate({
        rules: {
            'inces_comedorbundle_contabilidadtype[cedula]'   : { required       : true },
            'inces_comedorbundle_contabilidadtype[from]'     : { dateRange      : true },
            'inces_comedorbundle_contabilidadtype[to]'       : { dateRange      : true }
        },
        messages: {
            'inces_comedorbundle_contabilidadtype[cedula]'   : { required       : 'Coloque el campo Cedula' },
            'inces_comedorbundle_contabilidadtype[from]'     : { dateRange      : 'Por favor verifique las fechas' },
            'inces_comedorbundle_contabilidadtype[to]'       : { dateRange      : 'Por favor verifique las fechas' }
        }
    });
    $('.reporte_ingresos_form').validate({
        rules: {
            //'inces_comedorbundle_contabilidadtype[rol]'      : { required       : true },
            'inces_comedorbundle_contabilidadtype[from]'     : { dateRange      : true },
            'inces_comedorbundle_contabilidadtype[to]'       : { dateRange      : true }
        },
        messages: {
            //'inces_comedorbundle_contabilidadtype[rol]'      : { required     : 'Coloque el campo Rol' },
            'inces_comedorbundle_contabilidadtype[from]'     : { dateRange    : 'Por favor verifique las fechas' },
            'inces_comedorbundle_contabilidadtype[to]'       : { dateRange    : 'Por favor verifique las fechas' }
        }
    });
    $('.carga_masiva_form').validate({
        rules: {
            'inces_comedorbundle_carga_masivatype[file]'     : { cmFileExtension : true }
        },
        messages: {
            'inces_comedorbundle_carga_masivatype[file]'     : { cmFileExtension : 'El archivo debe ser .csv'}
        }
    });

    /* -------- Fin de las validaciones --------- */

    /* -------- Propiedades generales para las fechas ------ */
    $("#inces_comedorbundle_menutype_dia" ).datepicker({
        timeFormat: 'hh:mm:ss',
        dateFormat: 'dd/mm/yy',
        showButtonPanel: true
    });
    $( "#inces_comedorbundle_contabilidadtype_from" ).datepicker({
        //defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        numberOfMonths: 3,
        onSelect: function( selectedDate ) {
            $( "#inces_comedorbundle_contabilidadtype_to" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#inces_comedorbundle_contabilidadtype_to" ).datepicker({
        //defaultDate: "+1w",
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        numberOfMonths: 3,
        onSelect: function( selectedDate ) {
            $( "#inces_comedorbundle_contabilidadtype_from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });

    /* ------ Fin Propiedades generales para las fechas ----- */

    function changeDate(date){
        var year = date.substring(6);
        var month = date.substring(3,5);
        var day = date.substring(0,2);
        return year + '-' + month + '-' + day;
    }
    $('.reporte_usuarios_link').on('click', function(e) {
        e.preventDefault();
        //$('.pprint').val("print");
        //alert("print");
        var form = $(this).closest('form');

        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);

            var url  = $(this).attr('href');
            var ced  = $('#inces_comedorbundle_contabilidadtype_cedula').val();
            var from = $('#inces_comedorbundle_contabilidadtype_from').val();
            var to   = $('#inces_comedorbundle_contabilidadtype_to').val();
            var urlFinal = url;

            if(ced != "")
                urlFinal = urlFinal + '/' + ced;
            if(from != ""){
                from = changeDate(from);
                urlFinal = urlFinal + '/' + from;
            }
            if(to != ""){
                to = changeDate(to);
                urlFinal = urlFinal + '/' + to;
            }

            //alert(urlFinal);
            $("#lightbox, #lightbox-loader").fadeOut(300);
            window.location.href = urlFinal;
        }
    });
    $('.reporte_ingresos_link').on('click', function(e) {
        e.preventDefault();
        //$('.pprint').val("print");
        //alert("print");
        var form = $(this).closest('form');

        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);

            var url  = $(this).attr('href');
            var rol  = $('#inces_comedorbundle_contabilidadtype_rol').val();
            var from = $('#inces_comedorbundle_contabilidadtype_from').val();
            var to   = $('#inces_comedorbundle_contabilidadtype_to').val();
            var urlFinal = url;

            if(from != ""){
                from = changeDate(from);
                urlFinal = urlFinal + '/' + from;
            }
            if(to != ""){
                to = changeDate(to);
                urlFinal = urlFinal + '/' + to;
            }
            if(rol != "")
                urlFinal = urlFinal + '/' + rol;

            //alert(urlFinal);
            $("#lightbox, #lightbox-loader").fadeOut(300);
            window.location.href = urlFinal;
        }
    });
    $('[type=submit]:not(.search_keywords, .delete_form_btn, .reporte_form_btn, .carga_masiva_form_btn, .login_form_btn)').on('click', function(e) {
        e.preventDefault();
        var form = $(this).closest('form');
        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);
            $("form:first").ajaxForm({
                //target: '#content',
                success: function(msg) {
                    //$('#content').click(msg);
                    //$(window).attr("location",msg);
                    $("#lightbox, #lightbox-loader").fadeOut(300);
                    window.location.href = msg;
                }
            }).submit();
        }
    });

    $('.login_form_btn').on('click', function(e) {
        e.preventDefault();
        //var url = $(this).attr("action");
        var url = $('.route').val();
        var form = $(this).closest('form');
        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);
            $("form").ajaxForm({
                //target: '#results',
                success: function(msg) {
                    //alert(msg);
                    if(msg.indexOf("ERROR") != -1)
                        $( "#results" ).html( msg );
                    else{
                        $("#lightbox, #lightbox-loader").fadeOut(300);
                        window.location.href = url;
                    }
                    //$('#content').click(msg);
                    //$(window).attr("location",msg);
                    //window.location.href = msg;
                }
            }).submit();
        }
    });

    $('.reporte_form_btn').on('click', function(e) {
        e.preventDefault();
        //alert("hola");
        //$('.pprint').val("");
        //var url = $('.reporte_form_btn').parents('form').attr('action');
        var form = $(this).closest('form');
        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);
            $("form").ajaxForm({
                target: '#results',
                success: function(msg) {
                    $("#lightbox, #lightbox-loader").fadeOut(300);
                    //$('#content').click(msg);
                    //$(window).attr("location",msg);
                    //window.location.href = msg;
                }
            }).submit();
        }
    });

    $('.carga_masiva_form_btn').on('click', function(e) {
        e.preventDefault();
        //alert("hoal");
        //var ur = $(this).parents('form').attr('action');
        var form = $(this).closest('form');
        if (form.valid()){
            $("#lightbox, #lightbox-loader").fadeIn(300);
            $("form").ajaxForm({
                target: '#messages',
                success: function(msg) {
                    $("#lightbox, #lightbox-loader").fadeOut(300);
                    //$('#content').click(msg);
                    //$(window).attr("location",msg);
                    //window.location.href = msg;
                }
            }).submit();
        }
    });

    $('.delete_form_btn').on('click', function(e) {
        e.preventDefault();
        //var url = $(this).attr("action");
        $("#lightbox, #lightbox-loader").fadeIn(300);
        $("form").ajaxForm({
            //target: '#content',
            success: function(msg) {
                //$('#content').click(msg);
                //$(window).attr("location",msg);
                $("#lightbox, #lightbox-loader").fadeOut(300);
                window.location.href = msg;
            }
        }).submit();
    });

    var delay = (function(){
        var timer = 0;
        return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
        };
    })();

    $('#search_keywords').keyup(function(e) {
        if(e.keyCode == 13) return false;
        var val = this.value + '*';
        if (val.length >= 3 || val == '*') {
            delay(function(){
                if (val.length >= 3 || val == '*') {
                    //alert(val);
                    //$('#loader').show();
                    $("#lightbox, #lightbox-loader").fadeIn(300);

                    $('#content').load(
                        $('#search_keywords').parents('form').attr('action') + "?page=1&query=" + encodeURI(val),
                        //$('#search_keywords').parents('form').attr('action'),
                        { query: val },
                        function() {
                            //$('#loader').hide();
                            $("#lightbox, #lightbox-loader").fadeOut(300);
                            //window.location.href = $('#search_keywords').parents('form').attr('action') + "?page=1&query=" + val;
                        }
                    );
                }
            }, 800 );
        }
    });

    $(".filter").click(function(event) {
        if(event.keyCode == 13) return false;
        event.preventDefault();
        $("#lightbox, #lightbox-loader").fadeIn(300);
        var field = $(this).attr('value');
        var attr  = $(this).attr('asc');
        var url   = $(this).attr('href');
        if (attr == '1')
            attr = '0';
        else
            attr = '1';
        $('#content').load(
            url,
            { field: field, attr: attr },
            $("#lightbox, #lightbox-loader").fadeOut(300)
        );
    });

    // a workaround for a flaw in the demo system (http://dev.jqueryui.com/ticket/4375), ignore!
    $( "#dialog:ui-dialog" ).dialog( "destroy" );

    $( "#dialog" ).dialog({
        autoOpen: false,
        resizable: false,
        height:250,
        width:500,
        modal: true,
        //title: 'Notificaciones',
        open: function(){
            jQuery('#closer').bind('click',function(){
                jQuery('#dialog').dialog('close');
            })
        },
        buttons: {
            Ok: function() {
                $( this ).dialog( "close" );
            }
        }
    });
    $( ".opener" ).on('click', function(event) {
        var url = $(this).attr("value");
        $.ajax({
            url: url,
            success: function(msg) {
                //alert(msg);
                $( "#dialog" ).html( msg );
                $( "#dialog" ).dialog( "open" );
            }
        });
        event.preventDefault();
        event.stopPropagation();
        //$( "#dialog" ).dialog( "open" );
        //return false;
    });
    /*
    var _url = $('div.pagination a').attr('href');
    var _query = $('#search_keywords').val();
    if(_url.indexOf("query") == -1 && _query != "")
        $('div.pagination a').attr('href', _url + '&query=' + _query);
        */

    /*
    $('div.pagination a').click(function(event) {
        //alert("hola");
        //event.preventDefault();
        var query = $('#search_keywords').val();
        var url = $('div.pagination a').attr('href');
        if(url.indexOf("query") == -1 && query != ""){
            //event.preventDefault();
            event.preventDefault();
            url = url + '&query=' + query;
            window.location.href = url;
        }
    });
    */

    // Fade In or Fade Out
    $("a#show-panel").click(function(){
        $("#lightbox, #lightbox-loader").fadeIn(300);
    })
    $("a#close-panel").click(function(){
        $("#lightbox, #lightbox-loader").fadeOut(300);
    })

    // Desabilitando input de fecha today
    //$(".menu_today_form #inces_comedorbundle_menutype_dia").prop("readonly", true);
    $(".menu_today_form #inces_comedorbundle_menutodaytype_dia").attr('readonly','readonly');

    $('tbody tr').not('.tsearch').click( function() {
        window.location = $(this).find('a').attr('href');
    }).hover( function() {
        $(this).toggleClass('hover');
    });
}