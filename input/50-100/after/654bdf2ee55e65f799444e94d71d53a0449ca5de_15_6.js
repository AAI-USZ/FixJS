function (option) {
                        var project = app.authenticatedUser.projects.get(option.value);
                        $selectedHtml.append('<span class="selected-project"><img src="' + project.get('Avatar').Files.ThumbnailMedium.RelativeUri + '" alt="" />' + option.text + '</span> ');
                    }