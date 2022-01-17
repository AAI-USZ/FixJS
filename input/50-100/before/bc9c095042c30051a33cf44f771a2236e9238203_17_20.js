function(success, data){
                    var dataPresent = false;
                    if (data.results && data.results[0]) {
                        dataPresent = true;
                    }
                    $("#topnavigation_messages_container").addClass("selected");
                    var $messageContainer = $("#topnavigation_user_messages_container .s3d-dropdown-menu");
                    $openPopover = $messageContainer;
                    $messageContainer.html(sakai.api.Util.TemplateRenderer("topnavigation_messages_dropdown_template", {data: data, sakai: sakai, dataPresent: dataPresent}));
                    $messageContainer.show();
                }