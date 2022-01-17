function(){
                        (params.displayMode == 'classic') ? params.displayMode = 'linker': params.displayMode = 'classic';
                        $('#source_tree').dynatree('destroy');
                        $('#source_tree').empty();
                        createTree('#source_tree');
                    }