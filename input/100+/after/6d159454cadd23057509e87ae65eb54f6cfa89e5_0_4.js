f
       /* enable popup dialogs */
       $("#help-dialog").dialog({autoOpen:false,hide:'explode',modal:true});
       $("#add-dialog").dialog({
            autoOpen:false,hide:'explode',modal:true,
            buttons : {
                ok : function() {
                    id_to_add = $(this).find("select").val();
                    $(this).dialog("close");
                },
                cancel : function() {
                    id_to_add = ""
                    $(this).dialog("close");
                }
            },
            close : function() {
                if (id_to_add != "") {
                    add_step_two();
                }
            }
        });
        $("#remove-dialog").dialog({
            autoOpen:false,hide:'explode',modal:true,
            buttons : {
                ok : function() {
                    $(this).dialog("close");
                },
                cancel : function() {
                    button_to_remove_form = "";
                     $(this).dialog("close");
                }
            },
            close : function() {
                if (button_to_remove_form != "") {
                    $(button_to_remove_form).click();
                }
            }
        });


       /* enable tabs */
       $(".tabs").tabs({
           show : function(event,ui) {               
               if ($(ui.tab).attr("class")!="dynamic-formset-initialized") {
                   $(ui.tab).addClass("dynamic-formset-initialized");
                   var tab_selector = $(ui.tab).attr("href");
                   $(tab_selector).find(".accordion").each(function() {
                       var prefix = $(this).attr("class").split(' ')[1];
                       /* the subform+prefix class is added after the multiopenaccordion method below */
                       /* (it's not in the actual template) */
                       var subform_selector = ".subform."+prefix;
                       $(subform_selector).formset({
                           prefix : prefix.split("-formset")[0],
                           added : function(row) {
                               // custom fn to call when user presses "add" for a particular row
                               add_step_zero(row);
                               //add_step_one(row);
                           },
                           // this _needs_ to be completely unique
                           formCssClass : "dynamic-"+prefix
                       });
                   });
               }
           }
       });
       $(".tabs ul li a").keydown(function(event) {
           var keyCode = event.keyCode || event.which;
           if (keyCode == 9) {
               currentTab = $(event.target);
               currentTabSet = $(currentTab).parents("div.tabs:first");
               /* make the tab key shift focus the the next tab */
               var nTabs = $(currentTabSet).tabs("length");
               var selected = $(currentTabSet).tabs("option","selected");
               /* (the modulus operator ensures the tabs wrap around) */
               $(currentTabSet).tabs("option","selected",(selected+1)%nTabs);               
           }
       });

       $('.tabs').bind('tabsshow', function(event, ui) {
           var tabPane = ui.panel;
           if ($(tabPane).attr("class").indexOf("resized-and-repositioned")==-1) {
               resizeFields(tabPane);
               repositionFields(tabPane);
               $(tabPane).addClass("resized-and-repositioned");
           }
       });

       /* explicitly resize & reposition the first tab
        * (since it won't fire the show event above
        */
       var currentTabPane = $(".tabs:first").find('.ui-tabs-panel:not(.ui-tabs-hide)');
       if ($(currentTabPane).attr("class").indexOf("resized-and-repositioned")==-1) {
           resizeFields(currentTabPane);
           repositionFields(currentTabPane);
           $(currentTabPane).addClass("resized-and-repositioned");
       }

       /* enable collapsible fieldsets */
       $(".coolfieldset").coolfieldset({speed:"fast"});

       /* enable multi-open accordions */
       $( ".accordion" ).multiOpenAccordion({
           active : "All",
           tabShown : function(event,ui) {
               var accordionHeader = ui['tab'];
               var accordionPane = ui['content'];              

               if ($(accordionHeader).attr("class").indexOf("resized-and-repositioned")==-1) {
                   resizeFields(accordionPane);
                   repositionFields(accordionPane);
                   $(accordionHeader).addClass("resized-and-repositioned");
               }             
           }

       });
       


       /* have to do this in two steps b/c the accordion JQuery method above cannot handle any content inbetween accordion panes */
       /* but I need a container for dynamic formsets to be bound to */
       /* so _after_ multiopenaccordion() is called, I stick a div into each pane and bind the formset() method to it */
       $(".accordion").find(".accordion-header").each(function() {
           var prefix = $(this).closest(".accordion").attr("class").split(' ')[1];
           var div = "<div class='subform " + prefix + "'></div>";
           $(this).next().andSelf().wrapAll(div);
       });

       /* resize some textinputs */
       // TODO: DOUBLE-CHECK THIS SELECTOR WORKS IN ALL CASES
       $('input[type=text].readonly').each(function(){
           // I could make this dynamic by using the keyup() function instead of each()
           // but, really, I only care about this for property names which are readOnly anyway
           var chars = $(this).val().length;
           $(this).attr("size",chars);
       });

       /* add functionality to help-buttons (icons masquerading as buttons) */
       $(".help-button").hover (
            function() {$(this).children(".ui-icon-info").addClass('hover-help-icon');},
            function() {$(this).children(".ui-icon-info").removeClass('hover-help-icon');}
       );
       $(".help-button").mouseover(function() {
            $(this).css('cursor', 'pointer');
       });
       $(".help-button").click(function() {
           /* since metadata works with sub-applications, there may be periods in the ids */
           /* I escape them so that javascript doesn't interepret them as class selectors */
           var id = "#" + $(this).attr("id").replace(/(:|\.)/g,'\\$1');
           var x = $(this).offset().left - $(document).scrollLeft();
           var y = $(this).offset().top - $(document).scrollTop();
           var $description = $(id + " > .help-description");
           var title = $description.attr("title");
           var text = $description.html();
           $("#help-dialog").html(text);
           $("#help-dialog").dialog("option",{title: title, position: [x,y], height: 200, width: 400}).dialog("open");
           return false;
       });

        /* enable enumeration widgets */
        /* (these are multiwidgets: a choice and a textfield) */
        /* (the latter is only shown when the former is set to "OTHER") */
        $(".enumeration-value").each(function() {
            enumerationValue = $(this);
            //enumerationOther = enumerationValue.next(".enumeration-other");
            enumerationOther = enumerationValue.siblings(".enumeration-other:first");

            if (enumerationValue.attr("multiple")=="multiple") {
                multipleValues = enumerationValue.val();
                // TODO: CHECK THE INDEXOF FN IN IE                
                if (! multipleValues || multipleValues.indexOf("OTHER")==-1) {
                    enumerationOther.hide();
                }
                else {
                    enumerationOther.show();
                }
                
                /* if NONE is selected, then all other choices should be de-selected */
                if ( multipleValues && multipleValues.indexOf("NONE") != -1) {
                    enumerationValue.val("NONE")
                    enumerationOther.hide();
                }
            }
            else {
                if (enumerationValue.val()=="OTHER") {
                    enumerationOther.show();
                }
                else {
                    enumerationOther.hide();
                }
            }
            
            // position the "other" textbox relative to the "value" select
            enumerationOther.before("<br/>");
            // THIS HAS BEEN MOVED TO THE REPOSITIONFIELDS FN
            // WHICH GETS CALLED WHEN TABS & ACCORDIONS ARE FIRST SHOWN
            // THERE'S NO NEED TO CALL IT HERE'
//            $(enumerationOther).offset({
//                "left" : $(enumerationValue).offset().left
//            });

        });        
        $(".enumeration-value").change(function(event) {
            enumerationValue = $(event.target);
            //enumerationOther = enumerationValue.next(".enumeration-other");
            enumerationOther = enumerationValue.siblings(".enumeration-other:first");
            if (enumerationValue.attr("multiple")=="multiple") {
                multipleValues = enumerationValue.val();
                // TODO: CHECK THE INDEXOF FN IN IE
                //if (! multipleValues || multipleValues.indexOf("OTHER")==-1) {
                if (multipleValues.indexOf("OTHER")==-1) {
                    enumerationOther.hide();
                }
                else {
                    enumerationOther.show();
                }
                
                /* if NONE is selected, then all other choices should be de-selected */
                if ( multipleValues && multipleValues.indexOf("NONE") != -1) {
                    enumerationValue.val("NONE")
                    enumerationOther.hide();
                }


            }
            else {
                if (enumerationValue.val()=="OTHER") {
                    enumerationOther.show();
                }
                else {
                    enumerationOther.hide();
                }
            }
            
            // HOWEVER, I USE THE SAME LOGIC HERE
            // B/C THE ENUMERATIONS IN QUESTION MAY NOT HAVE BEEN VISIBLE
            // WHEN REPOSITION FIELDS WAS ORIGINALLY CALLED
            $(enumerationOther).filter(":visible").offset({
                "left" : $(enumerationValue).offset().left
            });
        });
        

        /* custom code to disable a widget (used when field is customized to 'readonly') */
        /* turns out that disabling it directly in Django causes the value to be set to None,
         * which means, the incorrect value is saved */
        $(".disabled").each(function() {            
            $(this).attr('disabled','true');

        });

        /* init an 'enabler' - a field that controls other fields or forms */
        $(".enabler:not(.enumeration-other)").each(function() {
            // the onchange method is bound to the toggleStuff function
            $(this).trigger("change");
        });

        /* enable calendar widgets */
        $(".datepicker").datepicker(
            {changeYear : true, showButtonPanel : true, showOn : 'button', buttonImage : '/static/django_cim_forms/img/calendar.gif'}
        );
        $(".ui-datepicker-trigger").mouseover(function() {
            $(this).css('cursor', 'pointer');
        });
        $(".ui-datepicker-trigger").attr("title","click to select date");
        $(".ui-datepicker-trigger").css("vertical-align","middle");

        /* enable _fancy_ buttons */
        $(".button").button();
        $(".subform-toolbar button").mouseover(function() {
            $(this).css('cursor', 'pointer');
        });
        $(".subform-toolbar button.expand" ).button({
             icons : {primary: "ui-icon-circle-triangle-s"},
             text : false,
        }).click(function(event) {
        // TODO: THIS IS NO LONGER WORKING B/C THERE IS CONTENT BETWEEN ACCORDIONS
            var formset = $(event.target).closest("fieldset");
            var accordion = $(formset).find(".accordion:first");
            $(accordion).multiOpenAccordion("option","active","All");
        });
        $(".subform-toolbar button.collapse" ).button({
            icons : {primary: "ui-icon-circle-triangle-n"},
            text: false,
        }).click(function(event) {
        // TODO: THIS IS NO LONGER WORKING B/C THERE IS CONTENT BETWEEN ACCORDIONS
            var formset = $(event.target).closest("fieldset");
            var accordion = $(formset).find(".accordion:first");
            $(accordion).multiOpenAccordion("option","active","None");
        });
        $("button.remove").button({
            icons: {primary: "ui-icon-circle-minus"},
            text: false,
        });
        $("button.remove").bind("click", function(e) {
            /* prevent the delete button from _actually_ opening the accordian tab */
            e.stopPropagation();
        });
        $("button.remove").click(function(event) {

            
            var fieldset = $(event.target).closest("fieldset");
            var subform = $(event.target).closest(".subform");

            model_to_remove_from = $(fieldset).find("span.current_model:first").text();
            field_to_remove = $(fieldset).find("span.current_field:first").text();

            button_to_remove_form = $(subform).find(".delete-row");

            var content = "<div style='text-align: center; margin-left: auto; margin-right: auto;'>Do you really wish to remove this instance of " + field_to_remove + "?<p><em>(It will not be deleted, only removed from this " + model_to_remove_from + ")</em></p></div>";
            $("#remove-dialog").html(content);
            $("#remove-dialog").dialog("open");

            //$(button_to_remove_form).click();

        });
        $(".subform-toolbar button.add").button({
            icons: {primary: "ui-icon-circle-plus"},
            text: false,
        }).click(function(event) {
            
            fieldset = $(event.target).closest("fieldset");

            // there are two situations where I can be adding/replacing content
            // either a subForm or a subFormSet
            if ($(event.target).hasClass("FORM")) {
                form_to_add = $(fieldset);

            }
            else {
                // form_to_add is set in add_step_one
            }

            guid_to_add_to = $(fieldset).find("span.current_guid:first").text();
            model_to_add_to = $(fieldset).find("span.current_model:first").text();
            app_to_add_to = $(fieldset).find("span.current_app:first").text();
            field_to_add_to = $(fieldset).find("span.current_field:first").text();

            var add_button = $(fieldset).find(".add-row:first");
            $(add_button).click();

        });
    });
