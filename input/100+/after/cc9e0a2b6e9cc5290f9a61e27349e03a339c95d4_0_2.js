function () {

            if (postman.collections.areLoaded === false) {

                postman.collections.getAllCollections();

            }



            $('#formModalAddToCollection').modal({

                keyboard:true,

                backdrop:"static"

            });

            $('#formModalAddToColllection').modal('show');



            $('#newRequestName').val("");

            $('#newRequestDescription').val("");

            return false;

        }