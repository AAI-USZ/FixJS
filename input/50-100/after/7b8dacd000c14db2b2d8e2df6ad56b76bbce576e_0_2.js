function () {
                        that.$input.parents('.control-group').attr('class', 'control-group')
                        .end().val('');
                        that.$input.next().text('');

                        var tab = that.$tab.find('.active a').attr('href').substing(1);
                        console.log(that.$tr.find(''));

                        clearTimeout(time);
                    }