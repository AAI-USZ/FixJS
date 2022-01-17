function(){
            var $this = $(this);
            if ($this.hasClass('noactive')) {
                // request in progress
                return false;
            }
            var data = processData($this);
            data.json = 1;

            $.ajax($.extend({
                url:$this.attr('href'),
                data: data,
                dataType:'json',
                beforeSend:function() {
                    $this.addClass('noactive');
                },
                complete:function() {
                    $this.removeClass('noactive');
                }
            }, ajax));
            return false;
        }