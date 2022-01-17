function get_mangled(name, newMangle) {
                if (!options.mangle) return name;
                if (!options.toplevel && !scope.parent) return name; // don't mangle toplevel
                if (options.except && member(name, options.except))
                        return name;
                if (options.no_functions && HOP(scope.names, name) &&
                    (scope.names[name] == 'defun' || scope.names[name] == 'lambda'))
                        return name;
                return scope.get_mangled(name, newMangle);
        }