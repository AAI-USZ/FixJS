function () {

    var me = {

        ui: {

            addDocumentButton: null,

            headerTimeDisplay: null,

            textEditor: null,

            documentTabs: null

        },

        documentManagement: {

            defaultDocument: '',

            currentDocument: '',

            addDocument: null,

            loadDocuments: null,

            documentStore: null,

            lastSavedContent: ''

        },

        events: {

            addDocumentHandler: null,

            removeDocumentHandler: null,

            onTabSelect: null,

            onTabLostFocus: null,

            saveTimerTick: null

        },

        rendering: {

            renderDocumentButtons: null,

            renderContent: null,

            renderTimeHeader: null

        },

        init: null

    };



    /**********************************************************************************

    ***** DOCUMENT MANAGEMENT *********************************************************

    **********************************************************************************/



    me.documentManagement.documentStore = [];

    me.documentManagement.defaultDocument = 'Default';

    me.documentManagement.currentDocument = me.documentManagement.defaultDocument;

    me.documentManagement.addDocument = function (vDoc) {

        me.documentManagement.documentStore.push(vDoc);

        me.documentManagement.currentDocument = vDoc.docId;

        // save the document store

        localStorage.setItem(

            "quigley.data",

            JSON.stringify(me.documentStore)

        );

    };

    me.documentManagement.loadDocuments = function () {

        var docs = JSON.parse(localStorage.getItem("quigley.data") || "[]");

        if (docs.length > 0) {

            me.documentManagement.documentStore = docs;

        }

        else {

            me.documentManagement.documentStore = [{

                docId: me.defaultDocument,

                displayName: me.defaultDocument,

                created: new Date()

            }];

            // on the first load, save quigley.data for the future:

            localStorage.setItem("quigley.data", JSON.stringify(me.documentStore));

        }

        me.rendering.renderContent();

    };





    /**********************************************************************************

    ***** RENDERING ITEMS TO SCREEN  **************************************************

    **********************************************************************************/



    me.rendering.renderDocumentButtons = function () {

        me.ui.currentTabs.html("");

        var docs = me.documentManagement.documentStore;

        var i = 0;

        for (i = 0; i < docs.length; i++) {

            var span_class = (docs[i].docId == me.documentManagement.currentDocument) ? "docSpan selectedDoc" : "docSpan";

            me.ui.currentTabs.append(

                $('<input>')

                    .attr('class', span_class)

                    .attr('id', docs[i].docId)

                    .val(docs[i].displayName)

                    .click(me.events.onTabSelect)

                    .blur(me.events.onTabLostFocus)

            );

        }

    };



    me.rendering.renderContent = function () {

        var docs = me.documentManagement.documentStore;

        var i = 0;

        for (i = 0; i < docs.length; i++) {

            if (docs[i].docId == me.documentManagement.currentDocument) {

                var oldValue = localStorage.getItem(me.documentManagement.currentDocument)

                if (oldValue != null) {

                    me.ui.textEditor.editors[0].setContent(oldValue);

                }

            }

        }

    };



    me.rendering.renderTimeHeader = function () {

        me.ui.logView.html("Today: " + new Date());

    };



    /**********************************************************************************

    ***** EVENT HANDLERS **************************************************************

    **********************************************************************************/



    me.events.onTabLostFocus = function () {

        var tmpId = $(this)[0].id;

        var newDocName = $(this).val();

        $.each(me.documentManagement.documentStore, function (ind, val) {

            if (val.docId == tmpId) {

                val.displayName = newDocName;

                localStorage.setItem("quigley.data", JSON.stringify(me.documentManagement.documentStore));

            }

        });

    };



    me.events.onTabSelect = function () {

        $(".docSpan").attr("class", "docSpan");

        $(this).addClass("selectedDoc")

        me.documentManagement.currentDocument = $(this)[0].id;

        me.rendering.renderContent();

    };



    me.events.addDocumentHandler = function () {

        var newDocName = 'Document' + me.documentManagement.documentStore.length;

        me.documentManagement.addDocument({

            docId: newDocName,

            displayName: newDocName,

            created: new Date()

        });

        me.rendering.renderDocumentButtons();

    };



    me.events.removeDocumentHandler = function () {

        var curr = me.documentManagement.currentDocument;

        var store = me.documentManagement.documentStore;

        if (store.length > 1) {

            var i;

            for (i = store.length - 1; i > 0; i--) {

                if (store[i].docId == curr) {

                    localStorage.removeItem(curr);

                    var tmpStore = [];

                    $.each(store, function (idx, doc) {

                        if (doc.docId != curr) tmpStore.push(doc);

                    });

                    me.documentManagement.currentDocument = store[i - 1].docId;

                    me.documentManagement.documentStore = tmpStore;

                    me.rendering.renderDocumentButtons();

                    me.rendering.renderContent();

                    break;

                }

            }

        }

        else {

            alert("You must have at least one document or what's the point?");

        }

        //var currentDoc = me.documentManagement.currentDocument;

        // make sure more than one document exists

        // find the current document

        // remove it from documentStore

        // remove from isolated storage 

        // re-render document buttons

    }



    me.events.saveTimerTick = function () {

        me.rendering.renderTimeHeader();

        var content = me.ui.textEditor.editors[0].save();

        if (content != me.documentManagement.lastSavedContent) {

            localStorage.setItem(me.documentManagement.currentDocument, content);

            me.documentManagement.lastSavedContent = content;

        }

    };





    me.ui.currentTabs = null;



    /**********************************************************************************

    ***** INITIALIZE QUIGLEY **********************************************************

    **********************************************************************************/



    me.init = function (targetEditor, addButton, removeButton, currentTabs, logViewDiv) {



        targetEditor.init({

            mode: "textareas",

            theme: "advanced",

            // Theme options

            theme_advanced_buttons1: "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",

            theme_advanced_buttons2: "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",

            //theme_advanced_buttons3: "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",

            //theme_advanced_buttons4: "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",

            theme_advanced_toolbar_location: "top",

            theme_advanced_toolbar_align: "left",

            theme_advanced_statusbar_location: "bottom",

            theme_advanced_resizing: true,



            // Skin options

            skin: "o2k7",

            skin_variant: "silver",

            init_instance_callback: function () {

                me.ui.textEditor = targetEditor;

                me.ui.logView = logViewDiv;

                me.ui.currentTabs = currentTabs;



                me.documentManagement.loadDocuments();

                me.rendering.renderDocumentButtons();

                addButton.click(me.events.addDocumentHandler);

                removeButton.click(me.events.removeDocumentHandler);

                window.setInterval(me.events.saveTimerTick, 1000);

            }

        });



    }

    return {

        init: me.init

    };

}