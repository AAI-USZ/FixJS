function(){
            var $this = $(this);
            if ($this.hasClass('noactive')) {
                // request in progress
                return false;
            }

            var data = {json: 1}; //responses as json
            var formData = $this.serializeArray();

            for (var i in formData) {
                data[formData[i].name] = formData[i].value;
            }

            $.ajax({
                url: $this.attr('action'),
                type: 'post',
                data: data,
                dataType:'json',
                beforeSend:function() {
                    $this.addClass('noactive');
                },
                success:ajaxCallback,
                error:function() {
                    Messages.addWarning('Connection is fail');
                },
                complete:function() {
                    $this.removeClass('noactive');
                }
            });
            return false;
        }