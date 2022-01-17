function () {
                        that.$input.parents('.control-group').attr('class', 'control-group')
                        .end().val('');
                        that.$helper.text('');
                        clearTimeout(time);
                    }