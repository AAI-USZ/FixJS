function (e, response) {

        if (response.HasError) {

            alert(response.Message);

        } else {

            $(mynotes.Constants.PopupView).modal('hide');

            $.ajaxGet({ url: groupListUrl });

        }

    }