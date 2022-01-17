function () {
                        path = $j(this).attr('src');
                        virtualScripts.push($j.tapestry.utils.rebuildURL(path));
                    }