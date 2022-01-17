function(Y, cfg) {
    
    M.block_jmail.Y = Y;
    M.block_jmail.cfg = cfg;
    
    M.block_jmail.magicNumSubject = (cfg.globalinbox)? 550 : 400;
    
    // Panel for composing messages, this is the first we have to do for avoid problems with the tinymce editor
    // We must render first the panel
    
    Y.one('#newemailpanel').setStyle('display', 'block');
    var panel = new YAHOO.widget.Panel("newemailpanel", {
        draggable: true,
        modal: false,
        width: "800px",
        height: "600px",
        autofillheight: "body",
        visible: false,
        zindex:4,
        top: "50px",
        context: ['jmailui', 'tl', 'tl', null, [200, 0]]
    });
    
    panel.subscribe("hide", function (event) {
        M.block_jmail.newemailOpen = false;        
    });
    panel.render(document.body);
    M.block_jmail.app.composePanel = panel;
    
    //var fptpl = Y.one("#filepickertpl");    
    //M.block_jmail.filemanagertpl =  fptpl.get('innerHTML');
    //fptpl.remove();    
    
    // First of all, load labels (async request)
    M.block_jmail.loadLabels();
    
    // Load all the contacts users
    if (cfg.cansend) {
        M.block_jmail.loadContacts();
        Y.one("#selectall").on('click', function(e){
                Y.all("#contact_list_users input[type=checkbox]").set('checked', e.target.get('checked'));                
            });
        Y.all('#selbuttons input[type=button]').on('click', function(e) {
                Y.all("#contact_list_users input[type=checkbox]").each(function(node){
                        if (node.get('checked') == true) {
                            M.block_jmail.composeMessage('new');
                            var type = e.target.get('className').replace('sel','');
                            var userid = node.ancestor('div').ancestor('div').get('id').replace('user', '');
                            var fullname = node.ancestor('div').ancestor('div').one('.fullname').get('text');                            
                            M.block_jmail.addContact(userid, fullname, type);
                        }
                    });
            });
    }
    
    // Old Yui2 shortcuts 
    var Dom = YAHOO.util.Dom, Event = YAHOO.util.Event;
    
    // Sets the page height
    Y.one('#jmailui').setStyle('height', Y.one('document').get('winHeight')+'px');

    if (cfg.cansend) {
        var layoutUnits = [            
            { position: 'right', width: 300, maxWidth: 400, minWidth: 200, resize: true, scroll: true, collapse: true, body: 'jmailright', animate: true, gutter: '2px'},            
            { position: 'left', width: 180, resize: false, body: 'jmailleft', scroll: true, animate: true, gutter: '2px' },
            { position: 'center', body: 'jmailcenter' }
        ];
    } else {
        var layoutUnits = [                        
            { position: 'left', width: 200, resize: false, body: 'jmailleft', scroll: true, animate: true, gutter: '2px' },
            { position: 'center', body: 'jmailcenter' }
        ];
    }

    // Load the main layouts
    var layout = new YAHOO.widget.Layout('jmailui', {
        units: layoutUnits
    });
    
    if (cfg.cansend) {
        layout.on('resize', function() {            
            if (M.block_jmail.app.dataTable) {                                
                M.block_jmail.app.dataTable.set('width', this.getSizes().center.w - M.block_jmail.magicNumDataTableWidth + 'px');                
                M.block_jmail.app.dataTable.setColumnWidth(M.block_jmail.app.dataTable.getColumn('subject'), (this.getSizes().center.w - M.block_jmail.magicNumSubject));
                M.block_jmail.app.dataTable._syncColWidths();
                
            }
        }, layout, true);    
    }
    
    var layout2 = null;
    var layout3 = null;
    layout.on('render', function() {
        var el = layout.getUnitByPosition('center').get('wrap');
        layout2 = new YAHOO.widget.Layout(el, {
            parent: layout,
            units: [
                { position: 'top', body: 'mailarea', height: 300, gutter: '2px', resize: true },                
                { position: 'center', body: 'mailcontents', gutter: '2px', scroll: true}
            ]
        });
        
        layout2.on('resize', function() {
            if (M.block_jmail.app.dataTable) {                                
                M.block_jmail.app.dataTable.set('height', this.getSizes().top.h - M.block_jmail.magicNumTop + 'px');                                
                M.block_jmail.app.dataTable._syncColWidths();                
            }
        }, layout2, true);  
        layout2.render();
        
        if (cfg.cansend) {
            el = layout.getUnitByPosition('right').get('wrap');
            layout3 = new YAHOO.widget.Layout(el, {
                parent: layout,
                units: [
                    { position: 'top', body: 'contact_list_filter', height: 200, gutter: '2px', resize: true },                
                    { position: 'center', body: 'contact_list', gutter: '2px', scroll: true}
                ]
            });
            layout3.render();
        }
    });
    
    layout.render();    
    //layout.getUnitByPosition('right').collapse();
    
    Y.on('windowresize', function(e) {
            layout.set('height', Y.one('#jmailui').getStyle('width')); 
            layout.set('width', Y.one('#jmailui').getStyle('height')); 
            layout.resize();
        });
    
    M.block_jmail.app.layout = layout;
    M.block_jmail.app.layout2 = layout2;
    M.block_jmail.app.layout3 = layout3;
    
    // New and check mail buttons
    
    if (cfg.cansend) {
        var icon = document.createElement('span'); 
        icon.className = 'icon';
        var newmailButton = new YAHOO.widget.Button("newmail");
        newmailButton.appendChild(icon);
        Y.one("#newmail").on('click', function(e){
            M.block_jmail.composeMessage('new');
        });
    }
    
    var icon = document.createElement('span'); 
    icon.className = 'icon';
    var checkmailButton = new YAHOO.widget.Button("checkmail");
    checkmailButton.appendChild(icon);
    Y.one('#checkmail').on('click', function(e){
            M.block_jmail.checkMail('inbox');
        });

    
    // INBOX Toolbar    
    var icon = document.createElement('span'); 
    icon.className = 'icon';    
    var deleteButton = new YAHOO.widget.Button("deleteb");
    deleteButton.appendChild(icon);
    deleteButton.on("click", M.block_jmail.deleteMessage);
    
    var icon = document.createElement('span'); 
    icon.className = 'icon'; 
    var editButton = new YAHOO.widget.Button("editb");
    editButton.appendChild(icon);
    editButton.on("click", function() { M.block_jmail.composeMessage('edit', M.block_jmail.currentMessage); });
    
    if (cfg.approvemode && cfg.canapprovemessages) {
        var icon = document.createElement('span'); 
        icon.className = 'icon'; 
        var approveButton = new YAHOO.widget.Button("approveb");
        approveButton.appendChild(icon);
        approveButton.on("click", function() { M.block_jmail.approveMessage(); });
    }
    
    if (cfg.cansend) {
        var icon = document.createElement('span'); 
        icon.className = 'icon';
        var replyButton = new YAHOO.widget.Button("replyb");
        replyButton.appendChild(icon);
        replyButton.on("click", M.block_jmail.replyMessage);
        
        var icon = document.createElement('span'); 
        icon.className = 'icon';
        var replyAllButton = new YAHOO.widget.Button("replytoallb");
        replyAllButton.appendChild(icon);
        replyAllButton.on("click", M.block_jmail.replyAllMessage);
        
        var icon = document.createElement('span'); 
        icon.className = 'icon';
        var forwardButton = new YAHOO.widget.Button("forwardb");
        forwardButton.appendChild(icon);
        forwardButton.on("click", M.block_jmail.forwardMessage);
    }
    
    var icon = document.createElement('span'); 
    icon.className = 'icon';
    var moveButton = new YAHOO.widget.Button("moveb", {type: "menu", menu: "labelsmenu"});
    moveButton.appendChild(icon);
    moveButton.getMenu().subscribe("click", M.block_jmail.moveMessage);
    M.block_jmail.app.moveButton = moveButton;
    
    var icon = document.createElement('span'); 
    icon.className = 'icon';
    var moreButton = new YAHOO.widget.Button("moreb", {type: "menu", menu: "moremenu"});
    moreButton.appendChild(icon);
    moreButton.getMenu().subscribe("click", M.block_jmail.moreOptions);
    M.block_jmail.app.moreButton = moreButton;
    
    var icon = document.createElement('span'); 
    icon.className = 'icon';
    var printButton = new YAHOO.widget.Button("printb");
    printButton.appendChild(icon);
    printButton.on("click", M.block_jmail.printMessage);

    // Group and role filter buttons
    if (cfg.cansend) {
        
        if (Y.one('#rolesselectorb')) {
            var rolesselectorB = new YAHOO.widget.Button("rolesselectorb", {type: "menu", menu: "rolesselector"});
            rolesselectorB.getMenu().subscribe("click", function(p_sType, p_aArgs) {            
                    var item = p_aArgs[1];
                    rolesselectorB.set("label", item.cfg.getProperty("text"));
                    M.block_jmail.filterUser.role = item.value;
                    M.block_jmail.loadContacts();                
                });
            M.block_jmail.app.rolesselectorB = rolesselectorB;
        }
        
    
        if (Y.one('#groupselectorb')) {   
            var groupselectorB = new YAHOO.widget.Button("groupselectorb", {type: "menu", menu: "groupselector"});
        
            groupselectorB.getMenu().subscribe("click", function(p_sType, p_aArgs) {            
                var item = p_aArgs[1];
                groupselectorB.set("label", item.cfg.getProperty("text"));
                M.block_jmail.filterUser.group = item.value;
                M.block_jmail.loadContacts();
            });
            M.block_jmail.app.groupselectorB = groupselectorB;
        }
    }
    
    if (Y.one('#mailboxesb')) {        
        var mailboxesB = new YAHOO.widget.Button("mailboxesb", {type: "menu", menu: "mailboxesmenu"});
        mailboxesB.getMenu().subscribe("click", function(p_sType, p_aArgs) {            
                var item = p_aArgs[1];
                mailboxesB.set("label", item.cfg.getProperty("text"));                
                document.location.href = M.block_jmail.cfg.wwwroot+"/blocks/jmail/mailbox.php?id="+item.value;
            });
        M.block_jmail.app.mailboxesB = mailboxesB;
    }

    // Mail list table
    
    var url = 'block_jmail_ajax.php?id='+cfg.courseid+'&action=get_message_headers&sesskey='+cfg.sesskey;
    
    M.block_jmail.generateRequest = null;
    
    var initDataTable = function(h, w) {
        
        var unreadFormatter = function(elCell, oRecord, oColumn, oData){
            if (oRecord.getData('read')+'' == '0') {
                oData = '<strong>'+oData+'</strong>';
            }
            if (oColumn.field == 'subject') {
                if (oRecord.getData('approved')+'' == '0') {
                    oData += ' (<span class="approvalpending">'+M.str.block_jmail.approvalpending+'</span>)';
                }
            }
            elCell.innerHTML = oData;
        }
        
        //Create the Column Definitions
        if (cfg.globalinbox) {            
            var myColumnDefs = [            
                {key:"from", 'label' : M.str.block_jmail.from, sortable:true, width: 160, formatter:  unreadFormatter},
                {key:"courseshortname", 'label' : M.str.block_jmail.mailbox, sortable: false, width: 120, formatter:  unreadFormatter},
                {key:"subject", 'label' : M.str.block_jmail.subject, sortable:true, width: (w - M.block_jmail.magicNumSubject), formatter:  unreadFormatter },
                {key:"date", 'label' : M.str.block_jmail.date,sortable:true, width: 160, formatter:  unreadFormatter }
            ];            
        } else {
            var myColumnDefs = [            
                {key:"from", 'label' : M.str.block_jmail.from, sortable:true, width: 160, formatter:  unreadFormatter},
                {key:"subject", 'label' : M.str.block_jmail.subject, sortable:true, width: (w - M.block_jmail.magicNumSubject), formatter:  unreadFormatter },
                {key:"date", 'label' : M.str.block_jmail.date,sortable:true, width: 160, formatter:  unreadFormatter }
            ];
        }
        
        
        // DataSource instance
        var myDataSource = new YAHOO.util.DataSource(url);
        myDataSource.responseType = YAHOO.util.DataSource.TYPE_JSON;
        myDataSource.responseSchema = {
            resultsList: "messages",
            fields: ["id","from","subject","date","read","approved","courseid","courseshortname"],
            // Access to values in the server response
            metaFields: {
                totalRecords: "total",
                startIndex: "start"
            }
        };
        
        // Customize request sent to server to be able to set total # of records
        M.block_jmail.generateRequest = function(oState, oSelf) {
            // Get states or use defaults
            oState = oState || { pagination: null, sortedBy: null };
            var sort = (oState.sortedBy) ? oState.sortedBy.key : M.block_jmail.filterMessage.sort;
            var dir = (oState.sortedBy && oState.sortedBy.dir === YAHOO.widget.DataTable.CLASS_ASC) ? "ASC" : M.block_jmail.filterMessage.direction;
            var startIndex = (oState.pagination) ? oState.pagination.recordOffset : M.block_jmail.filterMessage.start;
            var results = (oState.pagination) ? oState.pagination.rowsPerPage : cfg.pagesize;
   
            // Build custom request
            return  "&sort=" + sort +
                    "&direction=" + dir +
                    "&start=" + startIndex +
                    "&label=" + M.block_jmail.filterMessage.label +                    
                    "&searchtext=" + M.block_jmail.filterMessage.searchtext
                    ;
        };        


        // DataTable configuration
        var myConfigs = {
            generateRequest: M.block_jmail.generateRequest,
            initialRequest: M.block_jmail.generateRequest(), // Initial request for first page of data
            dynamicData: true, // Enables dynamic server-driven data
            paginator: new YAHOO.widget.Paginator({ rowsPerPage: cfg.pagesize}), // Enables pagination
            scrollable: true,
            height: h + 'px', width: w + 'px'
        };

        M.block_jmail.app.dataTable = new YAHOO.widget.DataTable("maillist", myColumnDefs, myDataSource, myConfigs);
        M.block_jmail.app.dataTable.set('MSG_EMPTY', M.str.block_jmail.nomessagesfound);
        
        // Subscribe to events for row selection
        M.block_jmail.app.dataTable.subscribe("rowMouseoverEvent", M.block_jmail.app.dataTable.onEventHighlightRow);
        M.block_jmail.app.dataTable.subscribe("rowMouseoutEvent", M.block_jmail.app.dataTable.onEventUnhighlightRow);
        M.block_jmail.app.dataTable.subscribe("rowClickEvent", M.block_jmail.app.dataTable.onEventSelectRow);
        M.block_jmail.app.dataTable.subscribe("rowSelectEvent", function() {
            
            Y.one('#mailcontents').setContent('<div class = "loading_big"></div>');

            // First row for displaying the first mail
            var data = this.getRecordSet().getRecord(this.getSelectedRows()[0])._oData;  

            // Ajax call for mark it as read
            M.block_jmail.markRead(data, 1);
            
            M.block_jmail.loadMessage(data.id, data.courseid);
            // All rows selected
            //console.log(this.getSelectedRows());
            
        }, M.block_jmail.app.dataTable, true);
        
        M.block_jmail.app.dataTable.doBeforeLoadData = function(oRequest, oResponse, oPayload) {
            oPayload.totalRecords = oResponse.meta.totalRecords;
            oPayload.pagination.recordOffset = oResponse.meta.startIndex;
            return oPayload;
        };
        
        M.block_jmail.app.dataTable.subscribe("postRenderEvent", function(){
            var Y = M.block_jmail.Y;        
            Y.all("#maillist .yui-pg-first").set('text', M.str.block_jmail.first);
            Y.all("#maillist .yui-pg-last").set('text', M.str.block_jmail.last);
            Y.all("#maillist .yui-pg-next").set('text', M.str.block_jmail.next);
            Y.all("#maillist .yui-pg-previous").set('text', M.str.block_jmail.previous);
        }, M.block_jmail.app.dataTable, true);
        
        M.block_jmail.app.dataTable.subscribe("tbodyKeyEvent", function(event, target){
            var cfg = M.block_jmail.cfg;            
            var keyCode = event.event.keyCode;
            
            if (keyCode == 46) {                
                M.block_jmail.deleteMessage();
            }
            else if (keyCode == 82 && cfg.cansend) {                
                M.block_jmail.replyMessage();
            }
            else if (keyCode == 70 && cfg.cansend) {                
                M.block_jmail.forwardMessage();
            }
            else if (keyCode == 80) {
                M.block_jmail.printMessage();
            }
            else if (keyCode == 65 && cfg.canapprovemessages) {
                M.block_jmail.approveMessage();
            }
        });
        
        M.block_jmail.app.dataSource = myDataSource;
    };

    initDataTable(layout2.getSizes().top.h - M.block_jmail.magicNumTop, layout2.getSizes().top.w - M.block_jmail.magicNumDataTableWidth);

    
    // Alphabet filter    
    if (cfg.cansend) {
        
        Y.all('#firstnamefilter .alphabet').on('click', function(e){
                Y.all('#firstnamefilter a').setStyle('font-weight', 'normal');
                e.target.setStyle('font-weight', 'bold');            
                M.block_jmail.filterUser.firstname = e.target.get('text');
                M.block_jmail.loadContacts();
                // Stop the event's default behavior
                e.preventDefault();
            });
        Y.all('#lastnamefilter .alphabet').on('click', function(e){
                Y.all('#lastnamefilter a').setStyle('font-weight', 'normal');
                e.target.setStyle('font-weight', 'bold');            
                M.block_jmail.filterUser.lastname = e.target.get('text');
                M.block_jmail.loadContacts();
                // Stop the event's default behavior
                e.preventDefault();
            });
        Y.all('#firstnamefilter .alphabetreset').on('click', function(e){
                Y.all('#firstnamefilter a').setStyle('font-weight', 'normal');
                e.target.setStyle('font-weight', 'bold');
                M.block_jmail.filterUser.firstname = '';
                M.block_jmail.loadContacts();
                // Stop the event's default behavior
                e.preventDefault();
            });
        Y.all('#lastnamefilter .alphabetreset').on('click', function(e){
                Y.all('#lastnamefilter a').setStyle('font-weight', 'normal');
                e.target.setStyle('font-weight', 'bold');
                M.block_jmail.filterUser.lastname = '';
                M.block_jmail.loadContacts();
                // Stop the event's default behavior
                e.preventDefault();
            });
    }
    
    // Labels
    var addlabel = Y.one('#addlabel');
    if (addlabel) {
        addlabel.on('click', function(e){
            M.block_jmail.processMenuButtons();
            Y.one('#newlabelpanel').setStyle('display', 'block');
            M.block_jmail.addLabel();
            e.preventDefault();
        });
    }
    
    // Build the labels action menu
    // TODO - Add rename options
    
    var labelsMenu = new YAHOO.widget.Menu("basicmenu");
    labelsMenu.addItems([{ text: "&nbsp;&nbsp;"+M.str.block_jmail.deletem, onclick: { fn: M.block_jmail.deleteLabel } }]);
    labelsMenu.render("menulabel");
    M.block_jmail.app.labelsMenu = labelsMenu;
    
    
    // Actions for fixed labels inbox, draft, bin
    
    Y.one('#label_list ul').all('a').on('click', function(e){        
        M.block_jmail.checkMail(e.target.get('id'));
        e.preventDefault();
    });
    
    // Preferences
    var preferencesPanel = new Y.Panel({
            srcNode      : '#preferencespanel',
            headerContent: M.str.block_jmail.preferences,
            width        : 400,
            zIndex       : 5,
            centered     : true,
            modal        : true,
            visible      : false,
            render       : true,
            plugins      : [Y.Plugin.Drag]
        });
    preferencesPanel.addButton({
        value  : M.str.moodle.ok,
        section: Y.WidgetStdMod.FOOTER,
        action : function (e) {
            var cfg = M.block_jmail.cfg;
            var Y = M.block_jmail.Y;
            var preferences = {
                receivecopies: (Y.one('#subscription').get('value'))? 1 : 0
            };
            preferences = Y.JSON.stringify(preferences);
            var url = 'block_jmail_ajax.php?id='+cfg.courseid+'&action=save_preferences&sesskey='+cfg.sesskey+'&preferences='+preferences;
            M.block_jmail.Y.io(url);
            this.hide();
            e.preventDefault();            
        }
    });
    preferencesPanel.addButton({
        value  : M.str.moodle.cancel,
        section: Y.WidgetStdMod.FOOTER,
        action : function (e) {
            this.hide();
            e.preventDefault();            
        }
    });
    
    var prefs = Y.one('#preferences');
    if (prefs) {
        prefs.on('click', function(e){
            var cfg = M.block_jmail.cfg;
            var Y = M.block_jmail.Y;
            
            M.block_jmail.processMenuButtons();
            
            var url = 'block_jmail_ajax.php?id='+cfg.courseid+'&action=get_preferences&sesskey='+cfg.sesskey;        
            var request = Y.io(url, {sync: true});        
            var preferences = Y.JSON.parse(request.responseText);
            if (preferences.receivecopies == '1') {
                Y.one('#subscription').set('value', 'receivecopies');
            } else {
                Y.one('#subscription').set('value', '');
            }
            Y.one('#preferencespanel').setStyle('display', 'block');
            preferencesPanel.show();
            e.preventDefault();
        });
    }
    
    // Search
    
    Y.one('#input_search').on('keyup', function(e){
        M.block_jmail.searchText = Y.Lang.trim(this.get('value'));
        if (M.block_jmail.searchText.length >= 3) {
            clearTimeout(M.block_jmail.searchTimeout);
            setTimeout(function() { M.block_jmail.checkMail('search', M.block_jmail.searchText) }, 600);
        } else if (M.block_jmail.searchText.length == 0) {
            M.block_jmail.checkMail('inbox');
        }
     });

    // Compose email fields    
    // Autocomplete
    
    var cfg = {
        resultHighlighter: 'phraseMatch',
        minQueryLength: 2,
        resultTextLocator: 'fullname',        
        source: 'block_jmail_ajax.php?id='+cfg.courseid+'&action=get_contacts_search&sesskey='+cfg.sesskey+'&search={query}'
    };
    
    cfg.on = {
            select: function(e) {
                M.block_jmail.addContact(e.details[0].result.raw.id, e.details[0].result.raw.fullname, 'to');
            }};
    Y.one('#composetoac').plug(Y.Plugin.AutoComplete, cfg);
    
    cfg.on = {
            select: function(e) {
                M.block_jmail.addContact(e.details[0].result.raw.id, e.details[0].result.raw.fullname, 'cc');
            }};
    Y.one('#composeccac').plug(Y.Plugin.AutoComplete, cfg);
    
    cfg.on = {
            select: function(e) {
                M.block_jmail.addContact(e.details[0].result.raw.id, e.details[0].result.raw.fullname,'bcc');
            }};
    Y.one('#composebccac').plug(Y.Plugin.AutoComplete, cfg);
    
    // Save and send messages buttons
    
    new YAHOO.widget.Button("savebutton");
    Y.one('#savebutton').on('click', function(e){
        M.block_jmail.saveMessage('save_message');
    });
    
    new YAHOO.widget.Button("sendbutton");
    Y.one('#sendbutton').on('click', function(e){
        M.block_jmail.saveMessage('send_message');
    });

    // Toolbar
    M.block_jmail.hideToolbar();   
    
}