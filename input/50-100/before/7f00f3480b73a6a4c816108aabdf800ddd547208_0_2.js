function import_data(selection, import_date){

    $.ajax({



                type: "GET",

                url: "/contacts/imports/get_import_data",

                data: { "created_at": import_date, "filter": selection },

                success: function(html){



                    $('#import_contacts').html(html);

                }

    });

}