function(){

    $('#load_dialog').position({

        of: $('#ordertable tbody'),

        at: 'center center',

        my: 'center center'

    });

    $('#load_dialog')

        .hide()



    $('.paginate').each(function(index, value) {



        var total = $('#pagination_total_records').val();

        var per_page = $('#pagination_records_per_page').val();

        var init_page = $('#pagination_initial_page').val();



        $(value).smartpaginator({

            totalrecords: total,

            recordsperpage: per_page,

            initval: init_page,

            onchange: function(newpage) {



                // Copy and modify global settings

                $("#load_dialog").overlay().load();

                var request = $.extend(true, {}, ajaxSettings);

                request.data.page = newpage;



                // Make request!

                $.ajax(request);

            }

        });

    });



    $('#filter').show();



    // Make all order lines clickable and lead to specific project views

    /*$('tr.order_clickable').on({

        click: function() {

            event.preventDefault();

            var strId = this.id.substr(8);



            window.location = "?m=ordermgmt&order_id=" + strId;

        }

    });*/

    $('#order_filter').change(function() {

        window.location = '?m=ordermgmt&filter=' + $('#order_filter option:selected').val();

    });



    // Text ajax call to see if we can get the expected object to work

    var ajaxSettings = {

        type: 'POST',

        data: {

            'dosql': 'do_ajaxrequest',

            'filter': $('#pagination_filter').val()

        },

        url: '?m=ordermgmt&suppressHeaders=true',

        success: function(data) {

            // Expecting to recieve HTML from server using TBS templates

            $('#ordertable tbody').html(data);

            $("#load_dialog").overlay().close();



            // Register events

            $('tr.order_clickable').on({

                click: function() {

                    event.preventDefault();

                    var strId = this.id.substr(8);



                    window.location = "?m=ordermgmt&order_id=" + strId;

                }

            });

        },

        error: function(data) {

            $("#load_dialog").overlay().close();

        }

    };

}