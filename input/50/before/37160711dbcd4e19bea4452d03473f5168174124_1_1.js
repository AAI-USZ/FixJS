function(){
                        (params.displayMode == 'classic') ? params.displayMode = 'linker': params.displayMode = 'classic';
                        $('#source_tree').dynatree('destroy').empty();
                        createTree('#source_tree');
                    }