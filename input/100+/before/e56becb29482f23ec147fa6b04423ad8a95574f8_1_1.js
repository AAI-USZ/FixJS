function() {

    formatjQueryUI();

    // Kommentarknappen för artiklen som visar formuläret
    $('.btn-comment-article').click( function (event) {
        event.preventDefault();

        var button = $(this),
            form = $('#' + button.data('form')).parent(),
            container = $('#' + button.data('container'));

        // Reset
        resetEntries();
        form.find('.toggle-rel-threads').css( 'visibility', 'hidden' );
        
        form.find('input[name=parent_id]').val( "" );
        form.prependTo(container);
        button.css('visibility','hidden');

        return false;
    });


    //Ajaxifiera formulären
    $("body").on("submit", "form.form-add-entry", function(event) {
        event.preventDefault();

        var form = $(this),
            url = form.attr('action'),
            data = form.serialize(),
            button = form.find('input[type=submit]'),
            loader = $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />'),
            cont = $('#'+form.data('container') );

        form.find('input, textarea').attr('disabled', 'disabled');
        button.parent().append( loader );

        $.ajax({
            type: "POST",
            url: url,
            data: data,
            dataType: "html",
            success: function(data, textStatus, jqXHR) {
                if ( jqXHR.status === 278 ) {
                    window.location.href = jqXHR.getResponseHeader("Location");
                }
                else {
                    cont.html(data);
                    formatjQueryUI();
                    $.jGrowl('close');
                }
            }
        });

        return false;
    });

    // Visa kommentarer
    $('.js-show-comments').click(function(event) {
        event.preventDefault();
        
        var button = $(this),
            loader = $('&nbsp;<img src="/static/img/ajax-loader.gif" class="gif-submit-loader" alt="Wakawakawakawakawaka..." />');

        button.parent().after( loader );
        button.addClass('ui-state-highlight');

        var btn = $(this),
            url = btn.data('url'),
            cont = $('#'+btn.data('container') );
         
        cont.load(url, function(){
            loader.remove();
            button.removeClass('ui-state-highlight');
            formatjQueryUI();
        });

        return false;
    });

    // Select categories
    $(".categories").selectable({
        stop: function() {
            var tags = "";
            $(".ui-selected", this).each(function() {
                var tag = this.innerHTML;
                tags = tags + " " + tag;

            });
            $("#id_tags").val(tags.trim());
        }
    }).on('mousedown', '*', function(e) {
        // fix http://bugs.jqueryui.com/ticket/7858
        if (e.ctrlKey) {
            e.metaKey = e.ctrlKey;
        }
    });

    $('#table_articles').dataTable({
        "bServerSide": true,
        "bJQueryUI": true,
        "iDisplayLength": 30,
        "aaSorting": [[4, 'desc']],
        "bAutoWidth": false,
        "oLanguage": {
            "sLengthMenu": "Visar _MENU_ artiklar per sida",
            "sZeroRecords": "Hittade ingeting =(",
            "sInfo": "Visar _START_ till _END_ av _TOTAL_ artiklar",
            "sInfoEmpty": "Visar 0 till 0 av 0 artiklar",
            "sInfoFiltered": "(filtrerat från _MAX_ antal artiklar)",
            "sSearch": "Sök bland artikeltitlar"
        },
        "sAjaxSource": window.location.pathname + "json/",
        "aoColumns": [{
            "mDataProp": "title",
            "bSortable": false
        }, {
            "mDataProp": "created",
            "iDataSort": 4,
            "bSearchable": false
        }, {
            "mDataProp": "tags",
            "bSortable": false,
            "bSearchable": false
        }, {
            "mDataProp": "allow_comments",
            "bSearchable": false,
            "bSortable": false
        }, {
            "mDataProp": "id",
            "bSortable": true,
            "bSearchable": false,
            "bVisible": false
        }],
        "fnDrawCallback": function() {
            // Render tags
            // render_tags() in core/static/js/script.js
            render_tags();
        }
    });

    $('#notification_table').dataTable({
        "bAutoWidth": false,
        "aaSorting": [[5, 'desc']],
        "bJQueryUI": true,
        "oLanguage": {
            "sLengthMenu": "Visar _MENU_ notifieringar per sida",
            "sZeroRecords": "Inga notifieringar",
            "sInfo": "Visar _START_ till _END_ av _TOTAL_ notifieringar",
            "sInfoEmpty": "Visar 0 till 0 av 0 notifieringar",
            "sInfoFiltered": "(filtrerat från _MAX_ antal notifieringar)",
            "sSearch": "Filter"
        },
        "iDisplayLength": 30,
        "aoColumns": [{
            "sWidth": "50%"
        }, {
            "sWidth": "10%"
        }, {
            "sWidth": "15%"
        }, {
            "sWidth": "20%"
        }, {
            "sWidth": "5%",
            "iDataSort": 5
        }, {
            "bVisible": false
        }],
        "sDom": '<"H"l<"form_wrapper">fr>t<"F"ip>'
    });

    $("#tabs").tabs();

}