function(success, members) {
                            members = members[context.data.authprofile["sakai:group-id"]];
                            var managerCount = sakai.api.Groups.getManagerCount(context.data.authprofile, members);
                            var leaveAllowed = managerCount > 1 || !sakai.api.Groups.isCurrentUserAManager(context.data.authprofile["sakai:group-id"], sakai.data.me);
                            $(window).trigger("init.joinrequestbuttons.sakai", [
                                {
                                    "groupProfile": context.data.authprofile,
                                    "groupMembers": members,
                                    "leaveAllowed": leaveAllowed
                                },
                                context.data.authprofile["sakai:group-id"],
                                context.data.authprofile["sakai:group-joinable"],
                                managerCount,
                                "s3d-header-button",
                                function (renderedButtons) {
                                    // onShow
                                    $("#joinrequestbuttons_widget", $rootel).show();
                                }
                            ]);
                        }