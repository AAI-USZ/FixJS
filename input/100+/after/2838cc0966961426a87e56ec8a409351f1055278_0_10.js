f
    function preprocessTree(t) {
        /* Make sure the root is the exact node: `<div></div>`
           The assumption is that the only case where the roots don't initially match for the editor
           is when the innerHTML is something like `<div>..text...text..</div>`. */
        var tmp;
        if (null !== t.text) {
            tmp = new EditorTree(t);
            tmp.text = t.text;
            t.text = null;
            t.children = [tmp];
        }
    }

	return dojo.declare("RichTextEditor", [_Widget, _TemplatedMixin, _Contained], {
	    // widget template
		templateString: template,
		
        //postCreate: function(){
		startup: function(){
			this._loadTemplate(require.toUrl('cowebx/dojo/RichTextEditor/TextEditor.css'));
			rangy.init(); // Sometimes rangy does not get initialized automatically, so this
                          // ensures it is always does get initialized.
		    this.buildEditor();
        	dojo.fadeIn({node:this.editorNode,duration:1000}).play();
		},
		
		buildEditor: function(){
			//1. Process args
			window.foo			= this;
            if(!this.collabID || this.collabID==undefined)
                console.error("RichTextEditor: unique collabID required.");
            this.id 			= this.collabID;
	        this.go 			= true;

	        //2. Build stuff
	        dojo.create('textarea', {style:'width:100%;height:100%;' }, this.divContainerBody);
			nicEditors.nicEditors.allTextAreas();    
            this._textarea 		= dojo.query('.nicEdit-main')[0];
            this._toolbar 		= dojo.query('.nicEdit-panel')[0];
			this._buildToolbar();                
			this._footer		= this._buildFooter();
	        this._attendeeList 	= new AttendeeList({domNode:this.innerList, id:'_attendeeList'});
            this._shareButton 	= new ShareButton({
                'domNode':this.infoDiv,
                'listenTo':this._textarea,
                'id':'shareButton',
				'displayButton':false
            });
            this.divChecker = domConstruct.create("div");
            this.oldDiv = domConstruct.create("div");
            this.newDiv = domConstruct.create("div");
            this.differ = new diff_match_patch();
            
            //3. parameters
            this.syncs          = [];
            this.oldSnapshot 	= this.snapshot();
            this.newSnapshot 	= null;
            this.t 				= null;
            this.value 			= '';
            this.valueNoRangy   = '';
            this.interval		= 100;
			this.title          = 'Untitled Document';
            this.firstSpan      = null;
            this.secondSpan     = null;
            this._skipRestore   = false;

            //3b new tree parameters.
            this.syncQueue      = [];
            this.domTree        = null;
            this.domTree_map    = null;

            //4. Style / connect
			this._style();
            this.connect();
   
			//5. kick things off
            if(this.go == true)
               this.listenInit();
		},
		
		aquireUrlParams: function(param){
			param = param.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
			var pattern = "[\\?&]"+param+"=([^&#]*)";
			var regex = new RegExp( pattern );
			var results = regex.exec( window.location.href );
			if( results == null )
				return null;
			else
				return results[1];
		},
		
		onCollabReady : function(){
	        this.collab.pauseSync();
	        this.resize();
	    },

	    listenInit : function(){
	        this.collab.pauseSync();
	        this.t = setTimeout(dojo.hitch(this, 'iterate'), this.interval);
	    },

        // Most of the syncing code that follows comes from the CoTree demo.

        onRemoteAddNode : function(data) {
            var value = data.value;
            var newNode = EditorTree.applyIns(value.x, this.domTree_map[value.parentId], data.position, value.newId);
            this.domTree_map[value.newId] = newNode;
        },
        onRemoteDeleteNode : function(data) {
            // The sync event tells us to delete a node from its parent.
            var toDelete = this.domTree_map[data.value.id].children[data.position];
            EditorTree.applyDel(toDelete);
            delete this.domTree_map[toDelete.id];
        },
        onRemoteMoveNode : function(data) {
            // Unfortunately, we can't use applyMov because the coweb API must use an insert/delete pair.
            var node = this.domTree_map[data.value.id];
            var p = node.parent;
            if ("insert" == data.type) {
                if (p.children)
                    p.children.splice(data.position, 0, node);
                else
                    p.children = [node];
            } else if ("delete" == data.type) {
                // Remove node from parent's children array.
                p.children.splice(data.position, 1);
                if (0 == p.children.length)
                    p.children = null;
            }
        },
        onRemoteUpdateNode : function(data) {
            var node = this.domTree_map[data.value.id];
            console.log(data);
            EditorTree.applyUpd(node, data.value.val);
        },

        onTreeUpdate : function(obj) {
            this.syncQueue.push(obj);
        },

        applySyncs : function() {
            array.forEach(this.syncQueue, dojo.hitch(this, function(obj) {
                console.log(obj);
                if(obj.type == 'insert' && obj.value['force']) {
                    this.onRemoteAddNode(obj);
                } else if(obj.type == 'delete' && obj.value['force']) {
                    this.onRemoteDeleteNode(obj);
                } else if(obj.type == 'insert') {
                    this.onRemoteMoveNode(obj);
                } else if(obj.type == 'delete') {
                    this.onRemoteMoveNode(obj);
                } else if(obj.type == 'update') {
                    this.onRemoteUpdateNode(obj);
                }
            }));
            this._textarea.innerHTML = this.toHTML();
            this.syncQueue = [];
        },

        doTreeDiff : function(oldTree, newHTML) {
            var newTree, diffs;
            this.newDiv.innerHTML = newHTML;
            newTree = EditorTree.createTreeFromElement(this.newDiv);
            preprocessTree(oldTree);
            preprocessTree(newTree);

            // Get diffs, then send syncs.
            var s=oldTree.toHTML()+"\n"+newTree.toHTML();
            diffs = EditorTree.treeDiff(oldTree, newTree);
            if (oldTree.toHTML() !=newTree.toHTML()) {
                console.error("diff broke");
                console.log(s);
                console.log(oldTree.toHTML());
                console.log(newTree.toHTML());
            }
            /* In rare certain cases, EditorTree.createTreeFromElement and toHTML
               return a different string than newHTML. The visual output *should* be
               the same, but just to be sure, match this._textarea.innerHTML to whatever
               is returned by toHTML. Documented cases appear below.
             
               1. "&nbsp" is converted to a single space character by toHTML.

               TODO It would be better if we could avoid this step somehow (ex: make
               createTreeFromElement always be the same as the input).
             */
            var html = this.toHTML();
            if (html != newHTML)
                this._textarea.innerHTML = html;
            return diffs;
        },

        generateDomTreeMap : function() {
            this.domTree_map = {};
            var map = this.domTree_map;
            map[null]  = null;
            this.domTree.levelOrder(function(at) {
                console.log(at.id);
                map[at.id] = at;
            });
        },

	    iterate : function() { 
            if (null === this.domTree) { // First client, so construct dom tree here.
                this.newDiv.innerHTML = "";
                this.newDiv.innerHTML = this._textarea.innerHTML;
                this.domTree = EditorTree.createTreeFromElement(this.newDiv);
                this.generateDomTreeMap();
            }
	        this.iterateSend();
	        this.iterateRecv();
	    },

        /* This function transforms the editor HTML into HTML that all major browsers support.
           This is important because iterateRecv will set _textarea.innerHTML, and doing so with
           invalid HTML will lead to a divergence between two client's editor HTML content (i.e.
           the data becomes out of sync).

           This function exists in hopes that one day a perfect implementation will exist. Right now,
           the implementation assumes that if setting innerHTML works without modification on this
           client, it will work on all clients. However, this is likely not 100 percent correct. */
        normalizeHTML : function() {
            var sel = rangy.saveSelection();
            this.divChecker.innerHTML = "";
            this.divChecker.innerHTML = this._textarea.innerHTML;
            this._textarea.innerHTML = this.divChecker.innerHTML;
            if (sel)
                rangy.restoreSelection(sel);
        },

        iterateSend : function() {
            var syncs = null;
            this.newSnapshot = this.snapshot();
            if (null !== this.oldSnapshot && null !== this.newSnapshot) {
                if (this.oldSnapshot != this.newSnapshot) {
                    this.normalizeHTML();
                    this.newSnapshot = this.snapshot();
                    if (this.oldSnapshot != this.newSnapshot) {
                        syncs = this.syncs.concat(this.doTreeDiff(this.domTree, this.newSnapshot));
                        array.forEach(syncs, function(at) { console.log(at.ty); });
                    }
                }
                var collab = this.collab;
                if (syncs) {
                    array.forEach(syncs, function(dd) {
                        var args = dd.args;
                        var obj;
                        // TODO refactor this...make the edit script give us exactly what we want to send.
                        switch (dd.ty) {
                            case "insert": // {x=new node data, y=parent, k=position, newId=new id}
                                obj = {};
                                obj.parentId = args.y.id;
                                obj.x = args.x.data();
                                obj.newId = args.newId;
                                obj.force = true;
                                collab.sendSync("change." + args.y.id, obj, "insert", args.k);
                                break;
                            case "delete": // {x=node to delete, k=position of x in x.parent.children}
                                obj = {force:true, id:args.x.parent.id};
                                collab.sendSync("change." + args.x.parent.id, obj, "delete", args.k);
                                break;
                            case "update": // {x=node to update, val=node to copy from}
                                obj = {val:args.val.data(), id:args.x.id};
                                collab.sendSync("change." + args.x.id, obj, "update", 0);
                                break;
                            case "move": // {x=node to move, y=new parent, k=new position, oldK=old position}
                                obj = {id:args.x.id, newParent:args.y.id};
                                console.log("move",obj,args.x.data);
                                collab.sendSync("change." + args.x.parent.id, obj, "delete", args.oldK);
                                collab.sendSync("change." + args.y.id, obj, "insert", args.k);
                                break;
                        }
                    });
                }
            }
        },

        iterateRecv : function() {
            // Get local typing syncs.
            this.syncs = [];
            var currentSnap = this.snapshot();
            if (this.newSnapshot != currentSnap)
                this.syncs = this.doTreeDiff(this.domTree, currentSnap);

            this.collab.resumeSync();
            this.collab.pauseSync();
            if (this.syncQueue.length > 0)
                this.applySyncs();
            this.oldSnapshot = this.snapshot();
            this.t = setTimeout(dojo.hitch(this, 'iterate'), this.interval);
        },

	    onRemoteChange : function(obj){
	        this.syncQueue.push(obj);
	    },

	    onUserChange : function(params) {
	        //Break if empty object
	        if(!params.users[0])
	            return;
	        if(params.type == "join"){
	            //Locally create a new listItem for the user
	            this._attendeeList.onLocalUserJoin(params.users);
	        }else if(params.type == "leave"){
	            //Locally delete listItem for the user
	            this._attendeeList.onUserLeave(params.users);
	        }
	    },

        removeRangySpans : function() {
            /* The Rangy span will be one of search# or search#a (or neither). */
            var val = this.value;
            var search1 = '<span style="line-height: 0; display: none;" id="1sel';
            var search1a = '<span id="1sel';
            var search2 = '<span style="line-height: 0; display: none;" id="2sel';
            var search2a = '<span id="2sel';
            var start, end;
            /* I think WebKit inserts a weird character inside the span. */
            var markerLength = (dojo.isWebKit) ? 78 : 77;

            this.firstSpan = null;
            this.secondSpan = null;
            // Non-collapsed selection?
            var start = val.indexOf(search1);
            if (-1 == start)
                start = val.indexOf(search1a);
            if (-1 != start) {
                end = val.indexOf(search2);
                if (-1 == end)
                    end = val.indexOf(search2a);
                if (-1 == end)
                    return;

                // Guaranteed both spans exist.
                if (start > end) {
                    var tmp = end;
                    end = start;
                    start = tmp;
                }
                this.firstSpan = {
                    pos : start,
                    text : val.substring(start, start + markerLength),
                    skip : false
                };
                this.secondSpan = {
                    pos : end - markerLength,
                    text : val.substring(end, end + markerLength),
                    skip : false
                };
                // Order is important below!
                this.value = this.value.substring(0, end) + this.value.substring(end + markerLength);
                this.value = this.value.substring(0, start) + this.value.substring(start + markerLength);
            } else {
                // Collapsed selection.
                end = val.indexOf(search2);
                if (-1 == end)
                    end = val.indexOf(search2a);
                if (-1 == end) {
                    return; 
                }
                // Guaranteed only second span exists.
                this.secondSpan = {
                    pos : end,
                    text : val.substring(end, end + markerLength),
                    skip : false
                };
                this.value = this.value.substring(0, end) + this.value.substring(end + markerLength);
            }

        },

        restoreRangySpan : function(data) {
            if (!data || data.skip)
                return;
            this.value = this.value.substring(0, data.pos) + data.text + this.value.substring(data.pos);
        },

	    clearSelection: function(){
			this._skipRestore = true;
            var sel, range;
		    if (window.getSelection) {
		        sel = window.getSelection();
		        if (sel.rangeCount) {
		            range = sel.getRangeAt(0);
		            sel.collapse(range.startContainer, range.startOffset);
		        }
		    } else if ( (sel = document.selection) && sel.type == "Text") {
		        range = sel.createRange();
		        range.collapse(true);
		        range.select();
		    }
	    },
	    
        willHTMLChange : function(html) {
            this.divChecker.innerHTML = "";
            this.divChecker.innerHTML = html;
            if (this.divChecker.innerHTML != html)
                return true; // True if DOM changed the html (i.e. it was malformed).
            else
                return false;
        },

	    snapshot : function(){
	        return this._getValue();
	    },
	    
	    connect : function(){
	        this.collab = coweb.initCollab({id : this.id});  
	        this.collab.subscribeReady(this,'onCollabReady');
            this.collab.subscribeSync('change.*', this, 'onTreeUpdate');
			this.collab.subscribeSync('editorTitle', this, '_onRemoteTitle');
	        this.collab.subscribeStateRequest(this, 'onStateRequest');
	    	this.collab.subscribeStateResponse(this, 'onStateResponse');
	        dojo.connect(this._textarea, 'onfocus', this, '_onFocus');
	        dojo.connect(this._textarea, 'onblur', this, '_onBlur');
	        dojo.connect(this.url,'onclick',this,function(e){ this.selectElementContents(e.target) });
            dojo.connect(this.url,'onblur',this,function(e){ e.target.innerHTML = window.location; });
	        dojo.connect(window, 'resize', this, 'resize');
	        // dojo.connect(dojo.byId('saveButton'),'onclick',this,function(e){
	        //     dojo.publish("shareClick", [{}]);
	        // });
	        attendance.subscribeChange(this, 'onUserChange');
            QWE = this;
	    },

	    onStateRequest : function(token){
            /* Need to make domTree non-circular in order to send it. Just remove all parent
               references and other clients can re construct that information later. */
            var map = this.domTree_map;
            this.domTree.levelOrder(function(at) {
                if (at.parent)
                    at.parent = at.parent.id;
            });
	        var state = {
	            snapshot: this.newSnapshot,
                domTree : this.domTree,
	            attendees: this._attendeeList.attendees,
				title: this.title
	        };
	        this.collab.sendStateResponse(state,token);
            this.domTree.levelOrder(function(at) {
                at.parent = map[at.parent];
            });
	    },

        reconstructTree : function(rawObj) {
            var at, rawAt, q, tree, tmp, map;
            map = {};
            tree = new EditorTree(null);
            q = [{at:tree, rawAt:rawObj}];
            while (q.length > 0) {
                at = q[0].at;
                rawAt = q.shift().rawAt;
                at.id = rawAt.id;
                at.copyFrom(rawAt);
                map[at.id] = at;
                if (rawAt.children)
                    at.children = [];
                array.forEach(rawAt.children, function(child) {
                    var ntree = new EditorTree(at);
                    at.children.push(ntree);
                    q.push({at:ntree, rawAt:child});
                });
            }
            this.domTree_map = map;
            return tree;
        },

	    onStateResponse : function(obj){
			this._textarea.innerHTML = '';
            this.domTree = this.reconstructTree(obj.domTree);
	        this._textarea.innerHTML = this.toHTML();
            // TODO check incompatible client  by doing a divChecker validation.
	        this.newSnapshot = this._textarea.innerHTML;
			this.title = obj.title;
			this._title.value = this.title;
	        for(var i in obj.attendees){
	            var o = {
	                value: {
	                    'site':i,
	                    'name':obj.attendees[i]['name'],
	                    'color':obj.attendees[i]['color']
	                }
	            };
	            this._attendeeList.onRemoteUserJoin(o);
	        }
	    },

        toHTML : function() {
            /* We don't want the outermost <div>. The assumption is that domTree
               always has the outer <div> elements. */
            var HTML = this.domTree.toHTML();
            return HTML.substring(5, HTML.length - 6);
        },
 
	    _getValue : function() {
	        return this._textarea.innerHTML;
	    },
	
		getValue : function() {
	        return this._textarea.innerHTML;
	    },

	    _onFocus : function(event) {
	        this._focused = true;
	    },

	    _onBlur : function(event) {
	        this._focused = false;
	    },

	    selectElementContents: function(el){
            var range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        },
         
	    resize: function(){
			dojo.style(this.editorNode,'height',document.body.offsetHeight+'px');
	        dojo.style(this.editorTable,'height',this.editorTable.parentNode.offsetHeight+'px');
	        dojo.style(this.innerList,'height',(this.editorTable.parentNode.offsetHeight-this.infoDiv.offsetHeight)+'px');
	        dojo.style(this.divContainer,'height',this.editorTable.parentNode.offsetHeight+'px');
			dojo.style(this.divContainerBody,'height',(this.editorTable.parentNode.offsetHeight-61)+'px');
	    },

	    _loadTemplate : function(url) {
	        var e = document.createElement("link");
	        e.href = url;
	        e.type = "text/css";
	        e.rel = "stylesheet";
	        e.media = "screen";
	        document.getElementsByTagName("head")[0].appendChild(e);
	    },
	    
	    _style: function(){
	        //dojo.attr(this._textarea, 'innerHTML', 'To begin, just start click and start <strong>typing</strong>...');
	        //this._loadTemplate('../lib/cowebx/dojo/RichTextEditor/TextEditor.css');
	        dojo.addClass(this._textarea.parentNode, 'textareaContainer');
			dojo.addClass(this._textarea, 'textarea'); 
			
            dojo.style(this._toolbar.parentNode.parentNode,'width','100%');
            dojo.style(this._toolbar.parentNode.parentNode,'height','37px'); 
			dojo.style(this._toolbar.parentNode.parentNode,'border','0px');  

            dojo.style(this._toolbar.parentNode,'height','37px');
			dojo.style(this._toolbar.parentNode,'border','0px'); 
			dojo.style(this._toolbar.parentNode,'borderBottom', '1px solid #BBBBBB')   
			
            dojo.style(this._toolbar,'height','37px');
            dojo.style(this._toolbar, 'width','100%');
            dojo.style(this._toolbar, 'margin','0px');
			dojo.style(this._toolbar, 'borderRight', '0px')
			dojo.style(this._toolbar, 'padding-left','10px'); 
           	
			var rulerContainer = dojo.create('div',{'class':'rulerContainer',id:'rulerContainer'},this._toolbar.parentNode,'after');
			var i = dojo.create('img', {src:require.toUrl('cowebx/dojo/RichTextEditor/images/ruler.png'), 'class':'ruler'}, rulerContainer, 'first');
			
            
            dojo.attr(this.url,'innerHTML',window.location);
	    },
	
		_buildFooter: function(){
	        var footerNode = dojo.create('div',{'class':'footer gradient'},this.divContainer,'last');

	        //1. Title box & image
	        var title = dojo.create('input',{'class':'title',value:'Untitled Document',type:'text'},footerNode,'first');
	        var edit = dojo.create('img',{src:require.toUrl('cowebx/dojo/RichTextEditor/images/pencil.png'),'class':'editIcon'},title,'after');

	        //2. Connect
	        dojo.connect(title, 'onclick', this, function(e){
	            dojo.style(e.target, 'background', 'white');
	        });
	        dojo.connect(title, 'onblur', this, function(e){
	            this.title = (e.target.value.length > 0) ? e.target.value : this.title;
	            e.target.value = this.title;
	            dojo.style(e.target, 'background', '');
	            this.collab.sendSync('editorTitle', {'title':e.target.value}, null);   
	        });
	        dojo.connect(title, 'onkeypress', this, function(e){
	            if(e.keyCode == 13)
	                e.target.blur();
	        });
	        this._title = title;

	        return footerNode;
		}, 
		
		_buildToolbar: function(){
			dojo.place(this._toolbar.parentNode.parentNode, this.divContainer,'first');
			for(var i=0; i<this._toolbar.childNodes.length; i++){    
				dojo.addClass(this._toolbar.childNodes[i], 'toolbarButton');
				dojo.style(this._toolbar.childNodes[i].firstChild, 'width', '100%');   
				dojo.style(this._toolbar.childNodes[i].firstChild, 'height', '100%');
				dojo.style(this._toolbar.childNodes[i].firstChild.firstChild, 'width', '100%');   
				dojo.style(this._toolbar.childNodes[i].firstChild.firstChild, 'height', '100%');
				dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'width', '100%');   
				dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'height', '100%');
				dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'backgroundPosition', 'center');   
               	switch(i){
	            	case 1:                                              
	                    dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/bold.png')+')');
						break;
					case 2:
					    dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/italic.png')+')');     
						break;
					case 3:   
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/underline.png')+')');
						break; 
					case 8:   
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/ordered.png')+')');
						break;
					case 9:   
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/unOrdered.png')+')');
						break;   
					case 10:   
						dojo.attr(this._toolbar.childNodes[i].firstChild.firstChild,'style',	dojo.attr(this._toolbar.childNodes[i].firstChild.firstChild,'style')+'padding: 0px !Important;');
						dojo.attr(this._toolbar.childNodes[i],'style',dojo.attr(this._toolbar.childNodes[i],'style')+'width: 91px !Important;');
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/fontSize.png')+')');
						break;
					case 11:   
						dojo.attr(this._toolbar.childNodes[i].firstChild.firstChild,'style',	dojo.attr(this._toolbar.childNodes[i].firstChild.firstChild,'style')+'padding: 0px !Important;');
						dojo.attr(this._toolbar.childNodes[i],'style',dojo.attr(this._toolbar.childNodes[i],'style')+'width: 91px !Important;');
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/fontFace.png')+')');
						break;
					case 15:
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/image.png')+')');
						break;
					case 19:
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/textColor.png')+')');
						break; 
					case 20:   
						dojo.style(this._toolbar.childNodes[i].firstChild.firstChild.firstChild, 'background', 'url('+require.toUrl('cowebx/dojo/RichTextEditor/images/hiliteColor.png')+')');
						break;      
				
				}
				       
                //TEMPORARY: HIDE UNUSED BUTTONS
                var arr = [4,5,6,7,12,13,14,16,17,18];
				for(var n in arr){
					dojo.style(this._toolbar.childNodes[arr[n]], 'display', 'none');
				}
            }
			dojo.create('div',{'class':'toolbarDiv'},this._toolbar.childNodes[8],'before'); 
			dojo.create('div',{'class':'toolbarDiv'},this._toolbar.childNodes[19],'before');  
			dojo.create('div',{'class':'toolbarDiv'},this._toolbar,'first');
			var redo = dojo.create('div',{'class':'toolbarButtonCustom',style:'background-image:url('+require.toUrl('cowebx/dojo/RichTextEditor/images/redo.png')+');'},this._toolbar,'first');
			var undo = dojo.create('div',{'class':'toolbarButtonCustom',style:'background-image:url('+require.toUrl('cowebx/dojo/RichTextEditor/images/undo.png')+');'},this._toolbar,'first');
			dojo.connect(redo, 'onclick', this, function(){ document.execCommand('redo',"",""); });
			dojo.connect(undo, 'onclick', this, function(){ document.execCommand('undo',"",""); });
			dojo.create('div',{'class':'toolbarDiv'},this._toolbar,'first');
			var save = dojo.create('div',{'class':'toolbarButtonCustom',style:'background-image:url('+require.toUrl('cowebx/dojo/RichTextEditor/images/save.png')+');'},this._toolbar,'first');
			dojo.connect(save, 'onclick', this, 'onSaveClick');
			this._buildConfirmDialog();		         
		},
		
		onSaveClick: function() {
	         dojo.publish("shareClick", [{}]);
	    },
		
		_buildConfirmDialog: function(){
	        secondDlg = new Dialog({
	            title: "Are you sure?",
	            style: "width: 300px;font:12px arial;",
	            id: 'tDialog'
	        });
	        var h = dojo.create('div',{'style':'margin-left:auto;margin-right:auto;width:80px;margin-bottom:5px'},secondDlg.domNode,'last');
	        var yes = new ToggleButton({
	            label: '<span style="font-family:Arial;font-size:10px;">Yes</span>',
	            showLabel: true,
	            id: 'yesButton'
	        });
	        var no = new ToggleButton({
	            label: '<span style="font-family:Arial;font-size:10px;">No</span>',
	            showLabel: true,
	            id: 'noButton'
	        });
	        dojo.place(yes.domNode, h, 'last');
	        dojo.place(no.domNode, h, 'last');
	        return secondDlg
	    },
		
		_onRemoteTitle: function(obj){
	        this.title = obj.value.title;
	        this._title.value = this.title;
	    },
	    
	    cleanup : function() {
	        if(this.t != null){
	            clearTimeout(this.t);
	            this. t = null;
	        }
	    }
	});
});
