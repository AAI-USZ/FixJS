function(){
            var $this = $(this);
            if ($this.hasClass('noactive')) {
                // request in progress
                return false;
            }
            var data = processData($this);
            data.json = 1;

            $.ajax({
                url:$this.attr('href'),
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