function (i, element) {
                    var this_token = $("<li><p>"+$('<a/>').text(element.name).html()+"</p> </li>")
                        .addClass(settings.classes.token)
                        .insertBefore(input_token);

                    $("<span>x</span>")
                        .addClass(settings.classes.tokenDelete)
                        .appendTo(this_token)
                        .click(function () {
                            delete_token($(this).parent());
                            return false;
                        });

                    $.data(this_token.get(0), "tokeninput", {"id": element.id, "name": element.name});

                    // Clear input box and make sure it keeps focus
                    input_box
                        .val("")
                        .focus();

                    // Don't show the help dropdown, they've got the idea
                    hide_dropdown();

                    // Save this token id
                    var id_string = element.id + ","
                    hidden_input.val(hidden_input.val() + id_string);
                }