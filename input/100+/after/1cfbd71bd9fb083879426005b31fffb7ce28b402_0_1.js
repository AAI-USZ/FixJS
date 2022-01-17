function(){
            updateSubmitClick(tab.modif,'#CTRL .submit');
            $(".tabs").tabs({'selected':5});
            updateTAb();
            $('#tabCtrl').html("<h1 style='margin-left:10%;'>Chargement ...</h1>");
            var id = getChildText($(this).parent().parent(),'id');
            $('#tabCtrl').load('ctrlModif.php',{'ID':id},function(){reloadContent();refreshCtrlTable();CTRL_UpdateSubmitClick(tab.modif);console.log('tab.modif: '+tab.modif);});
        }