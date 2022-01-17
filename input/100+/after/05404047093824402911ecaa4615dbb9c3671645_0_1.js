function(){
            updateTAb();
            // Vérifier si la tab necessite d'etre rechargé
            if(tab.needReload == "true"){
                $('.ui-tabs-panel:visible').html("<h1 style='margin-left:10%;'>Chargement ...</h1>");
                $('.ui-tabs-panel:visible').load(tab.page,function(){reloadContent();});
            }
            if(tab.page == 'ctrl.php'){
                $("li.search").hide();
                CTRL_UpdateSubmitClick(tab.ajout);
                // Delai car tout element de la tab deviennent visible après le click
                var wait = setTimeout(refreshCtrlTable,10);
            }else $("li.search").show();
            $('input#search').val('');
            $('input#search').quicksearch('.ui-tabs-panel:visible table tbody tr');
            placerBtAjout();
            console.log("click sur tab!");
        }