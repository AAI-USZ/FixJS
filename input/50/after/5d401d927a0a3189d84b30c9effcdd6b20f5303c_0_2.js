function(dir) {
                        if (scope.active_directive(dir))
                                return [ "block" ];
                        scope.directives.push(dir);
                }