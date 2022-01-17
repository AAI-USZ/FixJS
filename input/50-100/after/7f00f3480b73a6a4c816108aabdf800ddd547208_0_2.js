function import_data(selection, import_date){

    $.ajax({



                type: "GET",

                url: account_prefix_path+"/contacts/imports/get_import_data",

                data: { "created_at": import_date, "filter": selection },

                success: function(html){



                    $('#import_contacts').html(html);

                }

    });

}