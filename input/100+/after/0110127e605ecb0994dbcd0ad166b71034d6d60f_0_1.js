function(args) {
                    current_stat = $.extend(current_stat, args);
                    if(!args.error) {
                        delete current_stat.nb_error;

                        winkstart.publish('statistics.get_nav', {name: stat_name}, function(stat_html) {
                            if('container' in current_stat) {
                                current_stat.update_container(stat_html);
                            }
                            else {
                                if(current_stat.active) {
                                    $('.icon', stat_html).addClass('blue');
                                    $('.bubble', stat_html).removeClass('inactive');
                                }
                                else {
                                    $('.icon', stat_html).removeClass('blue');
                                    $('.bubble', stat_html).addClass('inactive');
                                }
                                $('.bubble', stat_html).html(current_stat.number);
                                $('.bubble', stat_html).removeClass('green orange red').addClass(current_stat.color);
                            }
                        });
                    }
                    else {
                        if('nb_error' in current_stat && typeof current_stat.nb_error === 'number') {
                            current_stat.nb_error++;
                        }
                        else {
                            current_stat.nb_error = 1;
                        }
                    }
                }