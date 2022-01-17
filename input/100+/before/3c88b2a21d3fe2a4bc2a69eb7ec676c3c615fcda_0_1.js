function(){    
        // Auto relogin if timed out.
        if (window.location.pathname.match(/\/courses\/login\//)){
            var autofill = $('input:-webkit-autofill');
            if (autofill.length > 0){
                // <span class="error">Your session has timed out.  Please login
                // again.</span>
                var error_msg = $('span[class="error"]').first();
                if (error_msg.text().search("Please login again.") > 0){
                    $("form:first[method='post']").submit();
                }
            }
        }

        // Psuedodirectlinkify all document URLs
        // Prepend a clone of the current week to the top
        if (window.location.pathname == "/courses/course/view.php"){        
            // Find all onclick elements in anchor links of such elements and
            // remove them. Append &inpopup=true to all of them.
            //
            $(".activity.resource > a").each(function(a){
                // Remove the onclick
                this.removeAttribute("onclick");
                // Psuedo-Direct link to the page. At least it's a 
                // transparent redirect now.
                var newurl = this.href.concat("&inpopup=true");
                this.setAttribute("href", newurl);
            });

            var seperator = $(".section.separator").first().clone();
            var current_week = $(".current").first().clone();
            $(".weeks tbody").prepend(current_week);
            current_week.after(seperator);
        }
        
        // Psuedodirectlinkify all document URLs in resource listing
        if (window.location.pathname.match(/\/courses\/mod\/resource\//)){        
            // Find all onclick elements in anchor links of such elements and
            // remove them. Append &inpopup=true to all of them.

            $(".generaltable .c1 a").each(function(a){
                // Remove the onclick
                this.removeAttribute("onclick");
                // Psuedo-Direct link to the page. At least it's a 
                // transparent redirect now.
                var newurl = this.href.concat("&inpopup=true");
                this.setAttribute("href", newurl);
            });
        }

        // Add quick course links for easier clicking after logging in instead
        // of scrolling down or moving down the mouse.
        if (window.location.pathname == "/courses/"){        
            var lcol = $('#left-column');                        

            var quick_list = $('<ul>', {'class':'list'});

            $('.name > a').each(function(a,b){
                var short_name = b.text.split(' (')[0];
                var new_link = $(b).clone();
                new_link.text(short_name);
                new_link_item = new_link.wrap('<li>').parent();
                quick_list.append(new_link_item);
            })

            quick_list.append("<p>Why click down there when you can click up here? :)</p>");

            quick_list = quick_list.wrap($('<div>', {'class':'content'})).parent();
            quick_list = quick_list.wrap($('<div>', {'class':'sideblock'})).parent();
            quick_list.prepend($('<div>', {'class': 'header', 'text': 'QuickClick Menu'}));
            quick_list = quick_list.wrap($('<div>', {"class":"quickclick"})).parent();
            $(quick_list).prependTo(lcol);            
            
        }
    }