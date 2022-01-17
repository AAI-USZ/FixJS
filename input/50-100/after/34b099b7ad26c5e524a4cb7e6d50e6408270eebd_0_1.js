function (err) {
                    var args = Array.prototype.slice.call(arguments);
                    args.splice(0, 1);
                    $original.trigger('errorful.editable');
                    if (typeof(settings.validate_error) === 'function') {
                        settings.validate_error.apply($original, args);
                    } else {
                        console.error('Error validating: ' + err);
                    }
                }