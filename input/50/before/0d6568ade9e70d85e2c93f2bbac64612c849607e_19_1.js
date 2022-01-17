function () {
                    // check working set UI list content
                    $listItems = testWindow.$("#open-files-container > ul").children();
                    return $listItems.length > 0;
                }