function(h, w) {
        
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
    }