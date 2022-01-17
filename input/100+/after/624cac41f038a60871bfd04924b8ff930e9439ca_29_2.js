function(group) {
                group.sakai = sakai;
                $(document).trigger('init.tooltip.sakai', {
                    tooltipHTML: sakai.api.Util.TemplateRenderer($joingroup_hover_template, group),
                    tooltipAutoClose: true,
                    tooltipArrow: "top",
                    tooltipTop: $item.offset().top + $item.height(),
                    tooltipLeft: $item.offset().left + $item.width() + 3,
                    onShow: function () {
                        $(window).trigger("init.joinrequestbuttons.sakai", [
                            {
                                "groupProfile": group.groupProfile,
                                "groupMembers": group.groupMembers,
                                "leaveAllowed": leaveAllowed
                            },
                            groupid,
                            group.joinability,
                            group.managerCount,
                            false,
                            function (renderedButtons) {
                                // onShow
                                $("#joingroup_joinrequestbuttons").html(
                                    renderedButtons.html());
                            },
                            function (success, id) {
                                // requestCallback
                                if (success) {
                                    // reset joinrequest data
                                    group.joinrequests = false;
                                }
                            },
                            function (success, id) {
                                // joinCallback
                                if (success) {
                                    // re-render tooltip
                                    resetTooltip(groupid, $item);
                                    $("#searchgroups_memberimage_" + groupid).show();
                                    $("#searchgroups_memberimage_" + groupid).parent().removeClass("s3d-actions-addtolibrary");
                                    adjustParticipantCount(groupid, 1);
                                }
                            },
                            function (success, id) {
                                // leaveCallback
                                if (success) {
                                    // re-render tooltip
                                    resetTooltip(groupid, $item);
                                    $("#searchgroups_memberimage_" + groupid).hide();
                                    $("#searchgroups_memberimage_" + groupid).parent().addClass("s3d-actions-addtolibrary");
                                    adjustParticipantCount(groupid, -1);
                                }
                            },
                            group.joinrequests
                        ]);
                    }
                });
            }