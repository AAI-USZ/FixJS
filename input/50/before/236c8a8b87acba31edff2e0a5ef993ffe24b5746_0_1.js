function($input) {
                updatePicturePreview("/media/images/ajax-loader.gif");
                $options = {};
                $options.filename = $input.val().split(/[\/\\]/).pop();
                return $options;
            }