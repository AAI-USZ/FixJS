function () {
                            gotErrorReadingContents = true;
                            recreatePlaceholder();
                            deferred.reject();
                        }