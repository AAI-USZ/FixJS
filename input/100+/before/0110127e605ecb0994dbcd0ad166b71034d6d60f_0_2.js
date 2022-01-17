function(stat_name, callback) {
            var THIS = this,
                current_stat = THIS.stats[stat_name];

            if(!current_stat.error || current_stat.error < 3) {
                THIS.stats[stat_name].get_stat(function(args) {
                    current_stat = $.extend(current_stat, args);
                    if(!args.error) {
                        delete current_stat.error;

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
                        current_stat.error = current_stat.error ? current_stat.error++ : 1;
                    }
                });
            }

            if(typeof callback === 'function') {
                callback()
            }
        }