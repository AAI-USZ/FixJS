function _init(tabNum){
    if(tabNum === undefined) tabNum = 5;
    var tab = {'page':'','ajout':'','suppr':'','modif':'','dialogId':'','needReload':''};
    $(".tabs").tabs({'selected':tabNum});
    updateTAb();
    refreshTabClick();
    $(".tableau").tablesorter();
    reloadContent();
    CTRL_UpdateSubmitClick(tab.ajout);
    function reloadContent(){
//        $.ajax({type:'POST',
//                url:'getApps.php',
//                dataType:'json',
//                success: function(data){
//                   console.log(data);
//                }
//        
//        });
        if(tab.page == "appareil.php") {$(".subtabs").tabs();refreshTabClick();}
        $(".datepicker").datepicker();
        $(".ui-tabs-panel:visible .tableau").tablesorter();
        $("button, a.button").button();
        $(".combobox").combobox();
        $(".radio").buttonset();
        $('input#search').quicksearch('.ui-tabs-panel:visible table tbody tr');
        $(".dialog").dialog('destroy');
        $(".dialog").dialog({
            autoOpen: false,
            width: 'auto',
            modal: true,
            close: function(event, ui) {
                if(tab.dialogId != '#CTRL') $(tab.dialogId+' form.formulaire').get(0).reset();
            }
        });
       
        $("#dialog-confirm").dialog({
            autoOpen: false,
	    width: 'auto',
	    modal: true
	});
        
        $('.btAjout').click(function(){
            updateSubmitClick(tab.ajout);
            $(tab.dialogId+' form h1').html('AJOUT ' + $('ul .ui-state-active a').html());
            $(tab.dialogId).dialog('open');
        });
        
        $('img.modif').click(function(){
            if($('.dialog').dialog('isOpen')) return false;
            else{
                updateSubmitClick(tab.modif);
                var par = $(this).parent().parent();
                // Remplir les champs en fonction 
                $(tab.dialogId+' .formulaire input').each(function(){
                    $(this).val(getChildText(par,$(this).attr('id')));
                });
                $(tab.dialogId+' form h1').html('MODIFICATION ' + $('ul .ui-state-active a').html());
                $(tab.dialogId).dialog('open');
            }
        });
        
        $('img.modifCtrl').click(function(){
            updateSubmitClick(tab.modif,'#CTRL .submit');
            $(".tabs").tabs({'selected':5});
            updateTAb();
            $('#tabCtrl').html("<h1 style='margin-left:10%;'>Chargement ...</h1>");
            var id = getChildText($(this).parent().parent(),'id');
            $('#tabCtrl').load('ctrlModif.php',{'ID':id},function(){reloadContent();refreshCtrlTable();CTRL_UpdateSubmitClick(tab.modif);console.log('tab.modif: '+tab.modif);});
        });

        // REGROUPE INSTRUCTIONS CTRL POUR OPTIMISATION
        if(tab.page == "ctrl.php"){
	    
	    if($('#CTRL').hasClass('modifCtrl')){
		prerempli = ($('#technicien option:selected').text() == "")? true:false;
//		if(prerempli){
//		    console.log("test");
//		    $('select#technicien').change(function(){alert("lkj")});
//		}
	    }

        
            $(".pdfEdit").click(function(e){
                e.preventDefault();
                $.get('generatePdf.php?id=13');
            });
            // CTRL ajout Paramètre
            
            // Fonction appellé du callback ajax
            function fillSelelctParCtr(){
                var ParNbChecked = 0;
                $('#CTRL select#Par option').remove();
                $('#dialogParCtr input:checkbox:checked').each(function(){
                    ParNbChecked = ParNbChecked + 1;
			$('#CTRL select#Par').append("<option>"+ $(this).parent().next().text() +"</option>");
			$(this).parent().next().css('color','#EB8F00');
                });
                $('#CTRL select#Par').next().val(ParNbChecked+" selection"+((ParNbChecked>1)? "s":""));
            }
            
            $('#dialogParCtr button.submit').click(function(){
                
                if($('#CTRL').hasClass('ajoutCtrl')){
                    console.log('ajout');
                    $.ajax({type:'POST',
                            url:'getListMM.php',
                            dataType:'json',
                            data:{'ids':$('#dialogParCtr input:checkbox:checked').map(function(){return $(this).val()}).get().join(',')},
                            success: function(data){
                                // Boucle sur les checkboxes des MM et pour chaque cb vérifie si son id a été renvoyé, si oui alors la cocher
                                var MMnbChecked = 0;
                                console.log(data);
                                $('#dialogMMCtr input:checkbox').each(function(){
    //                                $(this).attr('checked',false);
                                    var idMM = $(this).val();
                                    for (var i in data){
                                        if(data[i]==idMM){
                                            $(this).attr('checked',true);
                                        }
                                    }
                                });
                                // Vide et rerempli les lists déroulantes
                                fillSelelctParCtr();
                                
                                $('#CTRL select#MM option').remove();
                                $('#dialogMMCtr input:checkbox:checked').each(function(){
				    MMnbChecked = MMnbChecked + 1;
				    $('#CTRL select#MM').append("<option>"+ $(this).parent().next().text() +"</option>");
				    $(this).parent().next().css('color','#EB8F00');
                                });
                                $('#CTRL select#MM').next().val(MMnbChecked+" selection"+((MMnbChecked>1)? "s":""));
                            }
                    });
                }else{
                    console.log('modif');
                    fillSelelctParCtr();
                }
                
                $('#dialogParCtr').dialog('close');
            });
            
            // CTRL ajout Moyen de mesure
            $('#dialogMMCtr button.submit').click(function(){
                $('#CTRL select#MM option').remove();
                var MMnbChecked = 0;
                $('#dialogMMCtr input:checkbox:checked').each(function(){
                    MMnbChecked = MMnbChecked + 1;
		    $('#CTRL select#MM').append("<option>"+ $(this).parent().next().text() +"</option>");
		    $(this).parent().next().css('color','#EB8F00');
                });
                $('#CTRL select#MM').next().val(MMnbChecked+" selection"+((MMnbChecked>1)? "s":""));
                $('#dialogMMCtr').dialog('close');
            });
            // Affichage ajout Ctrl
	    $('#CTRL table tr:not(.menu)').hide();
	    $('#CTRL .menu.type .radio input:radio').change(function(){
		var affichClass=$(this).val();
		console.log(affichClass);
		$('#CTRL tr:not(.'+affichClass+')').hide();
		$('#CTRL tr.'+affichClass).show();
		$('#CTRL tr.static').show();
	    });
	    $('#CTRL .menu.lieu .radio input:radio').change(function(){
		var affichClass=$(this).val();
		// Si le bt radio verification est coché:
		if ($("input:radio[value='CV']").next().attr('aria-pressed')){
		    if (affichClass == 'S')
			$('#CTRL tr.site').show();
		    else
			$('#CTRL tr.site').hide();
		}

	    });

	    $('#CTRL tr.menu.lieu .radio input:radio').change(function(){
		var lieu=($(this).attr('id'));
		switch (lieu){
		    case 'site':
			var num = $('#CTRL input#num').attr('defaut');
			$('#CTRL input#num').val(num);
			// Tester si on peut préselectionner le client
			$.ajax({
				type: 'GET',
				url: "testCliSite.php",
				data: {date:$('#CTRL #date').val()},
				dataType: 'json',
				cache: false,
				timeout: 7000,
				success: function(data) {
				    $("#CTRL select#cli option[value='" + data.cli + "']").attr("selected","selected");
				    $("#CTRL select#cli").next().val($('#CTRL select#cli option:selected').text());
				}
			});
			break;
		    case 'atelier':
			$('#CTRL input#num').val('');
			break;
		}
	    });
	        
            $('#CtrlClear').click(function(){
                $('.ui-tabs-panel:visible').html("<h1 style='margin-left:10%;'>Chargement ...</h1>");
                $('.ui-tabs-panel:visible').load(tab.page,function(){reloadContent();CTRL_UpdateSubmitClick(tab.ajout);});
            });
	        
	    $('#ajoutParCtr').click(function(){
		$('#dialogParCtr').dialog('open');
		$('#dialogParCtr').dialog({'title':'Paramètres vérifiés:'});
	    });
	    $('#ajoutMMCtr').click(function(){
		$('#dialogMMCtr').dialog('open');
		$('#dialogMMCtr').dialog({'title':'Moyens de mesure employés:'});
	    });
	    // Colorer les CB checked dans les dialogs
	    $('.dialog input:checkbox:checked').each(function(){
		$(this).parent().next().css('color','#EB8F00');
	    });
	    $("li.search").hide();
	        
	        
        } // FIN INSTRUCTIONS CTRL
        if(tab.page == 'option.php'){
	    $.ajax({
		type: 'GET',
		url: "checkHisto.php",
		dataType: 'json',
		success: function(data) {
		    if(data.empty == false){
			blinking(true);
		    }
		}
	    });
	    $('#sync').click(function(){
		SYNC();
	    });
	}
        $('img.suppr').click(function(){
            if($('.dialog').dialog('isOpen')) return false;
            else{
                var par = $(this).parent().parent();
                $("#dialog-confirm #confirmMess").html("Voulez-vous vraiment supprimer "+par.children(':nth-child(2)').text()+"?");
                $("#dialog-confirm").dialog("option","title","Suppression!");
                $("#dialog-confirm").dialog(
                    "option",
                    "buttons",{
			"Supprimer":function(){
			    submitForm('id='+getChildText(par,'id'),tab.suppr);
			    $("#dialog-confirm").dialog('close');
			},
			"Annuler":function(){
			    $("#dialog-confirm").dialog('close');
			}
		    }
                );
                $("#dialog-confirm").dialog('open');
            }
        });
        $('.parModifMM').click(function(){
            var nom = $(this).parent().parent().children(":nth-child(2)").text();
            $('#dialogParMM').dialog({'title':'Moyens de mesure par défaut pour le paramètre: '+nom});
            $('#dialogParMM').dialog('open');
            var idPar = $(this).parent().parent().children().first().text();
            updateSubmitClick('parModifMM.php','#dialogParMM button.submit', "'idPar="+idPar+"&ids=' + $('#dialogParMM input:checkbox:checked').map(function(){return $(this).val()}).get().join(',')");
            // tout décocher avant
            $('#dialogParMM input:checkbox').each(function(){
                $(this).attr('checked',false);
            });
            $(this).parent().parent().children(':nth-child(3)').children('select').children('option').each(function(){
                console.log(this);
                var idMM = $(this).val();
                $('#dialogParMM input:checkbox').each(function(){
                    if($(this).val() == idMM) {
                        $(this).attr('checked',true);
                        $(this).parent().next().css('color','#EB8F00');
                    }
                });
            });
        });
        
	$('.dialog input:checkbox').change(function(){
	    if($(this).attr('checked')=='checked')
		$(this).parent().next().css('color','#EB8F00');
	    else 
		$(this).parent().next().css('color','black');
	});
        // appel du generatePdf.php
        $("a.pdfEdit").click(function(e){
            e.preventDefault();
            lien = $(this).attr('href');
            $("#dialog-confirm #confirmMess").html("Voulez vous intégrer l'en-tête en fond du PDF?");
            $("#dialog-confirm").dialog("option","title","PDF avec en-tête?");
            $("#dialog-confirm").dialog("option","buttons",
                                                            {"Oui":function(){
                                                                window.open(lien+"&bg=1");
                                                                $("#dialog-confirm").dialog('close');
                                                            },"Non":function(){
                                                                window.open(lien+"&bg=0");
                                                                $("#dialog-confirm").dialog('close');
                                                            }});
            $("#dialog-confirm").dialog('open');
        })

	// BOUTTONS GLISSANTS ////////////////////////////////////////////////////////////
	placerBtAjout();                                                               ///
										       ///
//	$('button.btAjout').stop().animate({'marginRight':'0'},1000);                  ///
	$('button.btAjout').hover(function(){                                          ///
	    $(this).stop().animate({'marginRight':($(this).width()-45)+'px'},200);     ///
	},function(){                                                                  ///
	    $(this).stop().animate({'marginRight':'0'},200);                           ///
	});                                                                            ///
	//////////////////////////////////////////////////////////////////////////////////
    }
    // FIN RELOAD CONTENT
    
    function updateSubmitClick(php, cssButton, formData){
        if(cssButton === undefined) cssButton = tab.dialogId+' button.submit';
        if(formData === undefined) formData = "$(tab.dialogId+' form.formulaire').first().serialize()";
        $(cssButton).unbind('click');
        $(cssButton).click(function(e){
            e.preventDefault();
            // if(validateForm()){
            dataSend = eval(formData);
            submitForm(dataSend, php);
            $('.dialog').dialog('close');
            // }else{$('#Formulaire #response').removeClass().addClass('error').html('Remplissez le formulaire comme demand\351!').fadeIn('fast');}
        });
    }
    function CTRL_UpdateSubmitClick(action){
         updateSubmitClick(
            action,
            tab.dialogId+' button.submit',
            "$(tab.dialogId+' form.formulaire').first().serialize() + '&PAR=' + $('#dialogParCtr input:checkbox:checked').map(function(){return $(this).val()}).get().join(',') + '&MM=' + $('#dialogMMCtr input:checkbox:checked').map(function(){return $(this).val()}).get().join(',');"
         );
    }
    
    function updateTAb(){
        tab.page = $('.ui-tabs-panel:visible').last().attr('page');
        tab.ajout = $('.ui-tabs-panel:visible').last().attr('ajout');
        tab.suppr = $('.ui-tabs-panel:visible').last().attr('suppr');
        tab.modif = $('.ui-tabs-panel:visible').last().attr('modif');
        tab.dialogId = $('.ui-tabs-panel:visible').last().attr('dialogId');
        tab.needReload = $('.ui-tabs-panel:visible').last().attr('needReload');
    }
    function refreshTabClick(){
//        $('ul.ui-tabs-nav a').unbind();
//        $('.tabs').tabs();
        // CLICK SUR TAB ////////////////////////////////////////////////////////////////////////////
        $('ul.ui-tabs-nav a').click(function(){
            updateTAb();
            // Vérifier si la tab necessite d'etre rechargé
            if(tab.needReload == "true"){
                $('.ui-tabs-panel:visible').html("<h1 style='margin-left:10%;'>Chargement ...</h1>");
                $('.ui-tabs-panel:visible').load(tab.page,function(){reloadContent();});
            }
            if(tab.page == 'ctrl.php'){
                $("li.search").hide();
    //            CTRL_UpdateSubmitClick(tab.ajout);
                // Delai car tout element de la tab deviennent visible après le click
                var wait = setTimeout(refreshCtrlTable,10);
            }else $("li.search").show();
            $('input#search').val('');
            $('input#search').quicksearch('.ui-tabs-panel:visible table tbody tr');
            placerBtAjout();
            console.log("click sur tab!");
        });
    }

    
    function refreshCtrlTable(){
        if(AClass = $('#CTRL .menu.type .radio input:radio:checked').val()){
	    console.log("refreshCtrlTable");
	    console.log(AClass);
            $('#CTRL tr:not(.'+AClass+')').hide();
            $('#CTRL tr.static').show();
            $('#CTRL tr.'+AClass).show();
            // Afficher/Cacher Température
            if(AClass == 'CV'){
                if($('.menu.lieu .radio input:radio:checked').val() == 'S')
                    $('#CTRL tr.site').show();
                else
                    $('#CTRL tr.site').hide();
            }
        }else{
            $('#CTRL tr:not(.menu)').hide();
        }
    }

	// retourne le contenue textuel d'un élément Enfant
    function getChildText(parentEl,id){
	    return parentEl.children('td#'+id).text();
    }
    
    function submitForm(formData, URL){
	console.log(formData + " " + URL);
	    $.ajax({
		    type: 'POST',
		    url: URL,
		    data: formData,
		    dataType: 'json',
		    cache: false,
		    timeout: 7000,
		    success: function(data) {
	    if (data.error){
		displayMess("<img src='img/error.png'/><h3>"+data.msg+"</h3>", "ui-state-error",2000);
	    }else{
		displayMess("<img src='img/icon_ok.png'/><h3>"+data.msg+"</h3>", "ui-state-highlight",1500);
		$('.ui-tabs-panel:visible').load(tab.page,function(){reloadContent();});
	    }
		    },
		    error: function(XMLHttpRequest, textStatus, errorThrown){
			    alert("D\351sol\351! Il y a eu une erreur: " + errorThrown + " " + textStatus+" Veuillez contacter Thibaud SMITH afin de résoudre ce problème!");
	    
		    }
	    });
    }
    function displayMess(mess, Class, timeOut){
	$('#message').html(mess).removeClass('ui-state-highlight ui-state-error').addClass(Class + ' ui-corner-all').show();
	setTimeout(function(){$('#message').hide();},timeOut);
    }
	
    $.datepicker.regional['fr'] = {
	    closeText: 'Fermer',
	    prevText: '&#x3c;Pr\351c',
	    nextText: 'Suiv&#x3e;',
	    currentText: 'Courant',
	    monthNames: ['Janvier','F\351vrier','Mars','Avril','Mai','Juin',
	    'Juillet','Ao\373t','Septembre','Octobre','Novembre','D\351cembre'],
	    monthNamesShort: ['Jan','F\351v','Mar','Avr','Mai','Jun',
	    'Jul','Ao\373','Sep','Oct','Nov','D\351c'],
	    dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
	    dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
	    dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
	    weekHeader: 'Sm',
	    dateFormat: 'dd-mm-yy',
	    firstDay: 1,
	    isRTL: false,
	    showMonthAfterYear: false,
	    yearSuffix: ''
    };
    $.datepicker.setDefaults($.datepicker.regional['fr']);
	
    function placerBtAjout(){
        $('.btAjout').each(function(){
            $(this).css('right','-'+($(this).width()-45)+'px')
        });
    }
    
    function SYNC(){
	console.log("sync");
        $.ajax({
	    type:'POST',
            url:'syncGetModif.php',
            dataType:'json',
            success: function(data) {
		console.log(data);
		blinking(false);
                for (var i in data)
                    execModif(data[i]);
		displayMess("<h3>" + data.length + " modifications effectuées sur le serveur distant!</h3>","ui-state-highlight",2000);
            }
        });
    }
    function execModif(dataModif){
	console.log('execModif'+dataModif);
        $.ajax({
            url:"http://88.191.153.53/MultisysControles/syncModif.php",
            dataType:'jsonp',
            data: dataModif,
            jsonp:'callback',
            success: function(data) {
                console.log(data);
            }
        });
    }

    var timer;
    function blinking(on) {
	if(on){
	    timer = setInterval(blink, 10);
	    function blink() {
		$('#sync').fadeOut(400, function() {
		    $('#sync').fadeIn(400);
		});
	    }
	}else{
	    clearInterval(timer);
	}
    }
}