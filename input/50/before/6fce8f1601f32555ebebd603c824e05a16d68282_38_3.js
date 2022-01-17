function showBuildFailedBadge(state) {
                var badgeInfo = {
                    text: state.failedBuildsCount.toString(),
                    color: [255, 0, 0, 200]
                };
                setBadge(badgeInfo);
            }