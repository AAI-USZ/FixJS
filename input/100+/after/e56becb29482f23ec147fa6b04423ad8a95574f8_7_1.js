function() {

    var nTable = $('#notification_table').dataTable({
        "bAutoWidth": false,
        //"aaSorting": [[6, 'desc']],
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
            "sWidth": "10%"
        },{
            "sWidth": "40%"
        }, {
            "sWidth": "10%"
        }, {
            "sWidth": "15%"
        }, {
            "sWidth": "20%"
        }, {
            "sWidth": "5%",
            "iDataSort": 6
        }, {
            "bVisible": false
        }],
        "sDom": '<"H"l<"form_wrapper">fr>t<"remove-notes"><"F"ip>'
    });

    var btn_remove_notes = $('<button>Ta bort markerade</button>').button().click(function(){
        $('#form_remove_notes').submit( function(){
            
            $('#form_remove_notes').find('input:checked').each( function() {
                $("#row-" + this.id).fadeOut(300, function() { 
                    $(this).remove();
                    $('#tab-counter-notes').html( "(" + String ($('#notification_table tr').length - 1) + ")");
                });
            });

            

        });
    }).appendTo('.remove-notes');

    var btn_select_all = $('<button>Klicka alla</button>').button().click(function(){
        var checkBoxes = $('#form_remove_notes input[type = checkbox]');
        checkBoxes.prop("checked", !checkBoxes.prop("checked")).button( "refresh" );
    }).appendTo('.remove-notes');

    //$('.remove-notes').buttonset();
    $('#switcher').themeswitcher();
}