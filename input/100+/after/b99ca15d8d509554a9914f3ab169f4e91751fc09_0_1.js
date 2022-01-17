function(name) {

                var rclassname = new RegExp('\\b' + name + '\\b', 'g');

                $.each(this, function() {

                    !$(this).hasClassName(name) && (this.className += ' ' + name);

                })

                return this;

            }