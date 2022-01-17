function(){
		console.log("hey jule");
		var id=$("#CTRL input[name='id']").val();
		$('#tabCtrl').load('ctrlModif.php',{'ID':id},function(){
		    reloadContent();
		    refreshCtrlTable();
		    CTRL_UpdateSubmitClick(tab.ajout);
		    alert("lkj");
		});
	    }