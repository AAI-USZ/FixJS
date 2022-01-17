function () {
                // If we've successfully determined a "build number" via .git metadata, add it to dialog
                var bracketsSHA = BuildInfoUtils.getBracketsSHA(),
                    bracketsAppSHA = BuildInfoUtils.getBracketsAppSHA(),
                    versionLabel = "";
                if (bracketsSHA) {
                    versionLabel += " (" + bracketsSHA.substr(0, 7) + ")";
                }
                if (bracketsAppSHA) {
                    versionLabel += " (shell " + bracketsAppSHA.substr(0, 7) + ")";
                }
                $("#about-build-number").text(versionLabel);
                
                Dialogs.showModalDialog(Dialogs.DIALOG_ID_ABOUT);
            }