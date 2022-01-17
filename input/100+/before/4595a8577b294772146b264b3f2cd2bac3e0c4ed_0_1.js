function ($selector) {

    $selector.find('#btnNewGroup').bind('click', function () {

        $.ajaxGet({ url: addGroupUrl });

    });



    $selector.find('#btnNewUser').bind('click', function () {

        $.ajaxGet({ url: addUserUrl });

    });



    $selector.bind('addGroup', function (response) {

        if (response.HasError) {

            alert(response.Message);

        } else {

            $(mynotes.Constants.PopupView).modal('hide');

            $.ajaxGet({ url: groupListUrl });

        }

    });



    $selector.bind('addUser', function (response) {

        if (response.HasError) {

            alert(response.Message);

        } else {

            $(mynotes.Constants.PopupView).modal('hide');

            $.ajaxGet({ url: userListUrl });

        }

    });

}