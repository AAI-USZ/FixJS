function() {

        /* Initialize bootstrap elements */
        /* This one delegates the function so
         * they still work after ajax calls */
        $('body').tooltip({
            selector: '[rel=tooltip]'
        });
        $('body').popover({
            selector: '[rel=popover]',
            placement:'top'
        });
        $('.carousel').carousel({
            interval: 10000
        });
        /* END Initialize elements */

        /* Add some css classes dinamically */
        // Adds bootstrap classes to the comment submit button
        if ($('#ws-comment-submit').length>0)
            $('#ws-comment-submit').addClass('btn btn-primary btn-large');
        // Adds bootstrap classes to tables
        if ($('table').length>0)
            $('table').addClass('table table-condensed table-striped table-bordered');
        if ($('table#wp-calendar').length>0)
            $('table#wp-calendar').removeClass('table-bordered');

        if ($('div.navbar-inner div.container').length>0) {
            $('div.navbar-inner div.container').show();
        }

        // Adds required classes for hierarchical navigation with wp_navmenu
        if ($('li.ws-dropdown').length>0) {
            $('li.ws-dropdown').addClass('dropdown');
            $('ul.ws-nav li.ws-dropdown>a').addClass('dropdown-toggle').attr('data-toggle', 'dropdown').append(' <b class="caret"></b>');
            $('.ws-dropdown ul').addClass('dropdown-menu');
        }

    }