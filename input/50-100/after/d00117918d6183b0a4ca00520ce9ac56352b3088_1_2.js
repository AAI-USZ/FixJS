function(data) {
                    successMsg = "<p class='success-icon'>" + data.message + "</p>";
                    failedMsg = "<p class='failed-icon'>" + data.message + "</p>";

                    // remove the loading animation
                    $(".simplebox-loader").remove();

                    if(data.status === "success") {
                        userMsgContainer.append(successMsg);
                    } else {
                        userMsgContainer.append(failedMsg);
                    }
                }