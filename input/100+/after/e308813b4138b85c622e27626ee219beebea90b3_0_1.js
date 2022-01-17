function() {

    $.jGrowl.defaults.position = 'bottom-right';

    var dataTablePT = {
        "sProcessing":   "Processando...",
        "sLengthMenu":   "Mostrar _MENU_ registros",
        "sZeroRecords":  "Não foram encontrados resultados",
        "sInfo":         "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty":    "Mostrando de 0 até 0 de 0 registros",
        "sInfoFiltered": "(filtrado de _MAX_ registros no total)",
        "sInfoPostFix":  "",
        "sSearch":       "Buscar:",
        "sUrl":          "",
        "oPaginate": {
            "sFirst":    "Primeiro",
            "sPrevious": "Anterior",
            "sNext":     "Seguinte",
            "sLast":     "Último"
        }
    }

    function reEnableJqueryContent()
    {
        $('.tipN').tipsy({gravity: 'n',fade: true, html:true});
        $('.tipS').tipsy({gravity: 's',fade: true, html:true});
        $('.tipW').tipsy({gravity: 'w',fade: true, html:true});
        $('.tipE').tipsy({gravity: 'e',fade: true, html:true});
    }

    //===== Validação Login =====//
    $('form#login').validate({
        rules: {
            username: {
                required: true,
                email:    true
            },
            password: "required"
        }
    });

    //===== Validação Cadastro =====//
    $('form#recover').validate({
        rules: {
            username: {
                required: true,
                email:    true
            },
            password: "required",
            password_2: {
                required: true,
                equalTo: '#password'
            }
        }
    });

    $('#minhas_inscricoes').dataTable({
        "bJQueryUI": false,
        "bAutoWidth": false,
        "sPaginationType": "full_numbers",
        "sDom": '<"H"fl>t<"F"ip>',
        "sAjaxSource" : base_url + 'inscricoes/minhas_inscricoes',
        "aoColumns": [
            { "mDataProp": "id" },
            { "mDataProp": "etapa" },
            { "mDataProp": "campeonato" },
            { "mDataProp": "status" },
            { "mDataProp": "acoes" }
        ],
        "oLanguage": dataTablePT,
        "aoColumnDefs": [
            { "sClass": "center", "aTargets": [ 0, 3, 4 ] },
            { "sWidth": "5%", "aTargets": [ 0, 4 ] },
            { "sWidth": "10%", "aTargets": [ 3 ] }
        ],
        "aaSorting" : [
            [ 0 , "desc" ]
        ],
        fnDrawCallback: function(){
            reEnableJqueryContent();
        }
    });

    // ========= Atualizar Inscrição  ========= //
    amplify.request.define('inscricaoUpdate', 'ajax', {
        url: base_url + 'admin/inscricoes/update',
        dateType: 'json',
        type: 'POST'
    });

    $('a.updateBtn').click(function(event) {
        var dados = {
            inscricao_id: $(this).data('inscricao-id'),
            update_type:  $(this).data('update-type') == 'aprovar' ? 1 : 0
        }

        // faz a chamada ajax
        amplify.request({
            resourceId: 'inscricaoUpdate',
            data: dados,
            success: function(data, textStatus, XMLHttpRequest)
            {
                if(data.valid)
                {
                    if(dados.update_type == 1)
                    {
                        $('#inscricaoStatus').html('<strong>Status: </strong><span class="label label-success">Aprovada</span>');
                        $.jGrowl(data.msg, { header: 'Atualização Concluída' });
                    }
                    else
                    {
                        $('#inscricaoStatus').html('<strong>Status: </strong><span class="label label-important">Rejeitada</span>');
                        $.jGrowl(data.msg, { header: 'Atualização Concluída' });
                    }

                }
                else
                {
                    $.jGrowl(data.msg, { header: 'Ops!' });
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown)
            {
                $.jGrowl('Ocorreu um erro durante a atualização.', { header: 'Ops!' });
            }
        });

        return false;
    });
    // ========= Atualizar Inscrição  ========= //

    var loading_modal = $('<div id="loading_dialog"></div>')
        .html('<p><img src=' + base_url + 'aquincum/images/elements/loaders/10s.gif' + '> Sua requisição está sendo processada.</p>')
        .dialog({
            height: 85,
            title: 'Aguarde...',
            closeOnEscape: false,
            autoOpen: false,
            modal: true
        });

    // TODO: Seperar JQUERY
    var resposta_form = $('#inscricao_resposta_form').validate({
        rules: {
            inscricao_resposta: "required"
        },
        submitHandler: function( form ) {
            var dados = $(form).serialize();

            loading_modal.dialog('open');

            $.ajax({
                type: "POST",
                url:  base_url + 'inscricoes/responder',
                data: dados,
                success: function(data, textStatus, XMLHttpRequest) {
                    loading_modal.dialog('close');
                    $.jGrowl(data.msg, { header: 'Nova Resposta!' });

                    if(data.valid)
                    {
                        var dataAtual = new XDate();
                        if($('div#inscricao_mensagens ul.messagesTwo').length == 0) {
                            $('div#inscricao_mensagens').append('<div class="widget"><div class="whead"><h6>Respostas</h6>' +
                                '<div class="clear"></div></div><ul class="messagesTwo"></ul></div>'
                            );
                        }

                        $('ul.messagesTwo').append('<li class="by_me"><a href="#"><img width="37" height="37" src="' + base_url + 'aquincum/images/icons/color/user.png' +
                            '"></a><div class="messageArea"><div class="infoRow"><span class="name"><strong>' +
                            $('input#inscricaoUSER').val() + '</strong>  postou:</span><span class="time">' +
                            dataAtual.toString("dd/MM/yyyy 'às' HH:mm:ss") + '</span><span class="clear"></span></div>' +
                            $('input#inscricao_resposta').val() + '</div></li>');

                        $('ul.messagesTwo li.by_me:last').hide();
                        $('ul.messagesTwo li.by_me:last').slideDown('slow');
                        resposta_form.resetForm();
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    loading_modal.dialog('close');
                    resposta_form.resetForm();
                }
            });

            return false;
        }
    });


    /**
     * AJAX request para excluir uma inscrição
     */
    amplify.request.define('inscricaoDelete', 'ajax', {
        url: base_url + 'inscricoes/excluir',
        dateType: 'json',
        type: 'POST'
    });

    var excluir_inscricao_modal = $('<div id="excluir_inscricao_modal"></div>')
        .html('Deseja realmente excluir esta inscrição?')
        .dialog({
            height: 140,
            title: 'Confirmar exclusão',
            closeOnEscape: false,
            autoOpen: false,
            modal: true,
            buttons: {
                'Sim': function() {
                    $(this).dialog('close');
                    var dados = {
                        inscricao_id: $('a#inscricaoExcluir').data('inscricao-id')
                    }
                    amplify.request({
                        resourceId: 'inscricaoDelete',
                        data: dados,
                        success: function(data, textStatus, XMLHttpRequest) {
                            if(data.valid) {
                                $.jGrowl(data.msg, {
                                    life: 1000,
                                    header: 'Inscrição Excluída!',
                                    beforeClose: function() {
                                        document.location.href = base_url;
                                    }
                                });
                            }
                            else {
                                $.jGrowl(data.msg, { header: 'Ops!' });
                            }
                        }
                    });
                },
                'Não': function()
                {
                    $(this).dialog('close');
                }
            }
        });

    $('a#inscricaoExcluir').click(function(event){
        event.preventDefault();
        excluir_inscricao_modal.dialog('open');
    });
    /** FIIIIIIIIIIIIM */


    // ================= NOVA INSCRICAO INICIO ========================//
    $('form#nova_inscricao_form').validate({
        rules: {
            inscricao_etapa: "required",
            inscricao_categoria: "required",
            inscricao_comprovante: "required"
        },
        ignore: false
    });

    amplify.request.define('informacaoEtapa', 'ajax', {
        url: base_url + 'etapas/informacaoEtapa',
        dateType: 'json',
        type: 'POST'
    });

    var previous_etapa = -1;
    $('div#informacao_etapa_container').hide();
    $('select#inscricao_etapa').bind("change", function() {
        if(previous_etapa != $(this).val())
        {
            previous_etapa = $(this).val();

            $('div#informacao_etapa_container').fadeOut();
            amplify.request({
                resourceId: 'informacaoEtapa',
                data: {
                    etapa_id: $(this).val()
                },
                success: function(data, textStatus, XMLHttpRequest) {
                    if(data.valid)
                    {
                        $('div#informacao_etapa').html('<ul class="liInfo">' +
                            '<li>Localidade: ' + data.localidade + '</li>' +
                            '<li>Data de Início: </li>' +
                            '<li>Data de Encerramento: </li>' +
                            '<li>Prazo de Inscrição: </li>' +
                            '</ul>'
                        );

                        $('div#informacao_etapa_container').fadeIn();
                    }
                }
            });
        }
    });
    // ================= NOVA INSCRICAO FINAL ========================//

}