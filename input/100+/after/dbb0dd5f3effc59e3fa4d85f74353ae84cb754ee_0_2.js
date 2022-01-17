function load_markers_lines( mm, mmaf) {
			    select1_str = "Lines";
                markers_loading = true;
                $('step5').hide();
                var url=php_self + "?function=step4lines&pi=" + phenotpe_items_str + '&yrs=' + years_str + '&exps=' + experiments_str + '&mm=' + mm + '&mmaf=' + mmaf;
                document.title='Loading Markers...';
                //changes are right here
                var tmp = new Ajax.Updater($('step5'),url,
                    {onCreate: function() { Element.show('spinner'); },
                    onComplete: function() {
                         $('step5').show();
                        if (traits_loading === false) {
                            document.title = title;
                        }
                        markers_loading = false;
                        markers_loaded = true;
                        load_title();
                    }}
                );
            }