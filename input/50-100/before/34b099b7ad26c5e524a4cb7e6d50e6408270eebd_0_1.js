function () {
                    var args = Array.prototype.slice.call(arguments);
                    args.splice(0, 1);
                    $original.trigger('errorful.editable');
                    settings.validate_error.apply($original, args);
                }