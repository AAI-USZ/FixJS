function (request, response) {
            $("#ajax_loader_addPerson").show();
            $("#hidden_personId").val("0");
            $("#addPerson_securityRole").prop('disabled', false);
            var postData = { term: request.term };

            var jqxhr = $.post("/Ajax/PersonAutoComplete", $.postify(postData), function (data) {
                $("#ajax_loader_addPerson").hide();
                response(data);
            }).error(function (jqXHR, textStatus, errorThrown) {
                $("#ajax_loader_addPerson").hide();
                alert(jqXHR.responseText);
            });
        }