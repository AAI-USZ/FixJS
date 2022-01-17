function () {
                    var dropWarningEl;
                    if (mouseDropWarning) {
                        dropWarningEl = mouseDropWarning[0];
                    }
                    avatar = $(options.avatarCreator(item[0], styles.avatar, dropWarningEl));
                    avatar.prop("id", fluid.reorderer.createAvatarId(thatReorderer.container.id));
                    return avatar;
                }