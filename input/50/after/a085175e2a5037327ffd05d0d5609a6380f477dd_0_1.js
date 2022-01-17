function () {
                        that.$input.parents('.control-group').attr('class', 'control-group')
                        .end().val('');
                        that.$input.next().text('');
                        clearTimeout(time);
                    }