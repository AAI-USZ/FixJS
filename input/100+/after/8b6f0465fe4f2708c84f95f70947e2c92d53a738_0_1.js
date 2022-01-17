function (data, textStatus, jqXHR) {
                if (jqXHR.status == 202) {
                    //alert(jqXHR.status);
                    var data = jQuery.parseJSON(jqXHR.responseText);
                    if (data['message']) {
                        alert(data['message']);
                    }
                    if (data['settings']) {
                        load_page(data['settings']);
                    }
                    else if (settings['origin'] == "table" && build_type(settings) == "POST")
                    {
                        // if origin of request is table, and it was not get, I will submit the parent form, so table can reload
                        $(caller_object).parents("form").submit();
                    }
                }
                else {
                    $(content_id).html(data);
                    $(content_id).find("textarea.tinymce").LadasTinyMce();
                    //console.log($(content_id).find("textarea.datafile_tinymce"));
                    // Todo nefunguje korektne kdyz nactu tinymce datafali i v sablone i tady, tedy zatim muzuz zobrazovat pouze spolu
                    //$(content_id).find("textarea.datafile_tinymce").LadasTinyMce(settings);
                }

                ladas_loading_hide();
            }