function() {

    var table_users = $('#user_list').dataTable({
        "bServerSide": true,
        "bJQueryUI": true,
        "aaSorting": [[2, 'desc']],
        "bAutoWidth": false,
        "sDom": '<"H"l <"table_loading"> fr>t<"F"ip>',
        "oLanguage": {
            "sLengthMenu": "Visar _MENU_ användare per sida",
            "sZeroRecords": "Hittade ingeting =(",
            "sInfo": "Visar _START_ till _END_ av _TOTAL_ användare",
            "sInfoEmpty": "Visar 0 till 0 av 0 användare",
            "sInfoFiltered": "(filtrerat från _MAX_ antal användare)",
            "sSearch": "Sök bland användarnamn och plats"
        },
        "sAjaxSource": window.location.pathname + "json/",
        "aoColumns": [{
            "mDataProp": "photo",
            "bSortable": false,
            "bSearchable": false
        }, {
            "mDataProp": "username"
        }, {
            "mDataProp": "last_login",
            "bSearchable": false
        }, {
            "mDataProp": "date_joined",
            "bSearchable": false
        }, {
            "mDataProp": "gender",
            "bSortable": false
        }, {
            "mDataProp": "location"
        }, {
            "mDataProp": "age",
            "bSearchable": false
        }],
        "fnDrawCallback": function() {
            $('.table_loading').html("");
        },
        "fnPreDrawCallback": function() {
            $('.table_loading').html("Laddar...");
        }
    });

    $('th:[role=columnheader]:eq(4)').each(function(i) {
        this.innerHTML = '<select name="gender" id="id_gender"><option value="">Alla</option><option value="O">Odefinerat</option><option value="M">Man</option><option value="K">Kvinna</option><option value="T">Transperson</option></select>';
        $('select', this).change(function() {
            //alert('lol');
            table_users.fnFilter($(this).val(), 4);
        });
    });

    $('#switcher').themeswitcher();
    
}