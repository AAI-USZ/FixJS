function (jqXHR, textStatus, errorThrown) {
                ladas_loading_hide();

                if (jqXHR.status == 301 || jqXHR.status == 303) {
                    // v ie nefunguje, pouzivam misto toho status 202
                    var data = jQuery.parseJSON(jqXHR.responseText);
                    if (data['message']) {
                        alert(data['message']);
                    }
                    if (data['settings']) {
                        load_page(data['settings']);
                    }
                    // if origin of request is table, and it was not get, I will submit the parent form, so table can reload
                    if (settings['origin'] == "table" && build_type(settings) == "POST") {


                        $(caller_object).parents("form").submit();
                    }
                }
                else if (jqXHR.status == 401) {
                    alert("Nemáte oprávnění na tuto akci!");
                }
                else {
                    alert("Request failed: " + textStatus + " status: " + jqXHR.status + " response" + jqXHR);

                }
            }