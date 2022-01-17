function(level, notice, requestType) {
            var noticesParsed = $.parseJSON(notice),
                options = {
                    type: level, 
                    slideSpeed: 200,
                    alwaysClosable: true
                },
                generate_list = function(notices){
                    var notices_list = '<ul class='+requestType+'>',
                        i, length = notices.length;
                    
                    for( i=0; i < length; i += 1) {
                        notices_list += '<li>' + notices[i] + '</li>';
                    }
                    notices_list += '</ul>';

                    return notices_list;
                };

            if (level === 'success') {
                notices.clearPreviousFailures(requestType);
            }

            if ((level === "error") || (level === "warning")) {
                options["sticky"] = true;
                options["fadeSpeed"] = 600;
            } else if( level === "message" ) {
                options["sticky"] = true;
                options["fadeSpeed"] = 600;        	
        	} else {
                options["sticky"] = false;
                options["fadeSpeed"] = 600;
            }

            if( noticesParsed['validation_errors'] !== undefined ){
                var validation_html = generate_list(noticesParsed['validation_errors']);
                validation_html = '<span>' + i18n.validation_errors + '</span>' + validation_html;
                $.jnotify(validation_html, options);
                $('.jnotify-message ul').css({'list-style': 'disc',
                              'margin-left': '30px'});    
            } 
            if( noticesParsed['notices'] && noticesParsed['notices'].length !== 0 ){
                $.jnotify(generate_list(noticesParsed['notices']), options);
            }
        }