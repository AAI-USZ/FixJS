function (Y) {
        // this waits till much too late. Can we trigger earlier?
        M.block_ajax_marking.tabview = new Y.TabView({
                                                         srcNode : '#treetabs'
                                                     });

        // Must render first so treeviews have container divs ready
        M.block_ajax_marking.tabview.render();

        // Courses tab
        var coursetabconfig = {
            'label' : 'Courses',
            id : 'coursestab',

            'content' : '<div id="coursessheader" class="treetabheader">'+
                                    '<div id="coursesrefresh" class="refreshbutton"></div>'+
                                    '<div id="coursesstatus" class="statusdiv">'+
                                        M.str.block_ajax_marking.totaltomark+
                                        ' <span id="coursescount" class="countspan"></span>'+
                                    '</div>'+
                                    '<div class="block_ajax_marking_spacer"></div>'+
                                 '</div>'+
                                 '<div id="coursestree" class="ygtv-highlight markingtree"></div>'};
        var coursestab = new Y.Tab(coursetabconfig);
        M.block_ajax_marking.tabview.add(coursestab);

        coursestab.displaywidget = new M.block_ajax_marking.courses_tree();
        // reference so we can tell the tree to auto-refresh
        M.block_ajax_marking.coursestab_tree = coursestab.displaywidget;
        coursestab.displaywidget.render();
        coursestab.displaywidget.subscribe('clickEvent', M.block_ajax_marking.treenodeonclick);
        coursestab.displaywidget.tab = coursestab; // reference to allow links back to tab from tree
        coursestab.displaywidget.countdiv = document.getElementById('coursescount'); // reference to allow links back to tab from tree

        coursestab.refreshbutton = new YAHOO.widget.Button({
            label : '<img src="'+M.cfg.wwwroot+'/blocks/ajax_marking/pix/refresh-arrow.png" class="refreshicon"' +
                        ' alt="'+M.str.block_ajax_marking.refresh+'" />',
            id : 'coursesrefresh_button',
            title : M.str.block_ajax_marking.refresh,
            onclick : {fn : function () {
                YAHOO.util.Dom.setStyle('block_ajax_marking_error',
                                        'display',
                                        'none');
                coursestab.displaywidget.initialise();
            }},
            container : 'coursesrefresh'});

        // Cohorts tab
        var cohortstabconfig = {
            'label' : 'Cohorts',
            id : 'cohortstab',
            'content' : '<div id="cohortsheader" class="treetabheader">'+
                            '<div id="cohortsrefresh" class="refreshbutton"></div>'+
                            '<div id="cohortsstatus" class="statusdiv">'+
                                M.str.block_ajax_marking.totaltomark+
                                ' <span id="cohortscount" class="countspan"></span>'+
                            '</div>'+
                            '<div class="block_ajax_marking_spacer"></div>'+
                        '</div>'+
                        '<div id="cohortstree" class="ygtv-highlight markingtree"></div>'};
        var cohortstab = new Y.Tab(cohortstabconfig);
        M.block_ajax_marking.tabview.add(cohortstab);
        cohortstab.displaywidget = new M.block_ajax_marking.cohorts_tree();
        M.block_ajax_marking.cohortstab_tree = cohortstab.displaywidget;
        // Reference to allow links back to tab from tree.
        cohortstab.displaywidget.tab = cohortstab;
        cohortstab.displaywidget.render();
        cohortstab.displaywidget.subscribe('clickEvent', M.block_ajax_marking.treenodeonclick);

        // reference to allow links back to tab from tree
        cohortstab.displaywidget.countdiv = document.getElementById('cohortscount');

        cohortstab.refreshbutton = new YAHOO.widget.Button({
           label : '<img src="'+M.cfg.wwwroot+
                    '/blocks/ajax_marking/pix/refresh-arrow.png" class="refreshicon" ' +
                        'alt="'+M.str.block_ajax_marking.refresh+'" />',
           id : 'cohortsrefresh_button',
           title : M.str.block_ajax_marking.refresh,
           onclick : {fn : function () {
               YAHOO.util.Dom.setStyle('block_ajax_marking_error',
                                       'display',
                                       'none');
               cohortstab.displaywidget.initialise();
           }},
           container : 'cohortsrefresh'});

        // Config tab
        var configtabconfig = {
            'label' : '<img src="'+M.cfg.wwwroot+'/blocks/ajax_marking/pix/cog.png" alt="cogs" id="configtabicon" />',
             id : 'configtab',
            'content' : '<div id="configheader" class="treetabheader">'+
                            '<div id="configrefresh" class="refreshbutton"></div>'+
                            '<div id="configstatus" class="statusdiv"></div>'+
                            '<div class="block_ajax_marking_spacer"></div>'+
                        '</div>'+
                        '<div id="configtree" class="ygtv-highlight markingtree"></div>'};
        var configtab = new Y.Tab(configtabconfig);
        M.block_ajax_marking.tabview.add(configtab);
        configtab.displaywidget = new M.block_ajax_marking.config_tree();
        M.block_ajax_marking.configtab_tree = configtab.displaywidget;
        configtab.displaywidget.tab = configtab; // reference to allow links back to tab from tree

        configtab.displaywidget.render();
        configtab.displaywidget.subscribe('clickEvent',
                                          M.block_ajax_marking.config_treenodeonclick);
        // We want the dropdown for the current node to hide when an expand action happens (if it's
        // open)
        configtab.displaywidget.subscribe('expand', M.block_ajax_marking.hide_open_menu);

        configtab.refreshbutton = new YAHOO.widget.Button({
               label : '<img src="'+M.cfg.wwwroot+'/blocks/ajax_marking/pix/refresh-arrow.png" ' +
                             'class="refreshicon" alt="'+M.str.block_ajax_marking.refresh+'" />',
               id : 'configrefresh_button',
               onclick : {fn : function () {
                   YAHOO.util.Dom.setStyle('block_ajax_marking_error',
                                           'display',
                                           'none');
                   configtab.displaywidget.initialise();
               }},
               container : 'configrefresh'});

        // Make the context menu for the courses tree
        // Attach a listener to the root div which will activate the menu
        // menu needs to be repositioned next to the clicked node
        // menu
        //
        // Menu needs to be made of
        // - show/hide toggle
        // - show/hide group nodes
        // - submenu to show/hide specific groups
        coursestab.contextmenu = new M.block_ajax_marking.context_menu_base(
            "maincontextmenu",
            {
                trigger : "coursestree",
                keepopen : true,
                lazyload : false,
                zindex: 1001
            }
        );
        // Initial render makes sure we have something to add and takeaway items from
        coursestab.contextmenu.render(document.body);
        // Make sure the menu is updated to be current with the node it matches
        coursestab.contextmenu.subscribe("triggerContextMenu",
                                         coursestab.contextmenu.load_settings);
        coursestab.contextmenu.subscribe("beforeHide", function() {
                                          coursestab.contextmenu.clickednode.unhighlight();
                                          coursestab.contextmenu.clickednode = null;});

        // Set event that makes a new tree if it's needed when the tabs change
        M.block_ajax_marking.tabview.after('selectionChange', function () {

            // get current tab and keep a reference to it
            var currenttab = M.block_ajax_marking.get_current_tab();

            // If settings have changed on another tab, we must refresh so that things reflect
            // the new settings.
            if (currenttab.displaywidget.needs_refresh()) {
                currenttab.displaywidget.initialise();
                currenttab.displaywidget.set_needs_refresh(false);
            }

            if (typeof(currenttab.alreadyinitialised) === 'undefined') {
                currenttab.displaywidget.initialise();
                currenttab.alreadyinitialised = true;
            } else {
                currenttab.displaywidget.update_total_count();
            }
        });

        // TODO use cookies/session to store the one the user wants between sessions
        M.block_ajax_marking.tabview.selectChild(0); // this will initialise the courses tree

        // Unhide that tabs block - preventing flicker

        Y.one('#treetabs').setStyle('display', 'block');
       // Y.one('#totalmessage').setStyle('display', 'block');

    }