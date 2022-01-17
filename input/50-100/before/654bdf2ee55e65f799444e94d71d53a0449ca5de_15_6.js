function (option) {
                        var project = app.authenticatedUser.projects.get(option.value);
                        $selectedHtml.append('<span class="selected-project"><img src="' + project.get('Avatar').Files.thumbnail.RelativeUri + '" alt="" />' + option.text + '</span> ');
                    }