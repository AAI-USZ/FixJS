function () {

		$('#deposit-modal').remove();
		
		if ($('#deposit-modal').length == 0)
			$('body').append('<div id="deposit-modal" class="modal hide" style="width:100%;max-width:700px;"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h3>'+title+'</h3></div><div class="modal-body"><iframe id="deposit-frame" border="0" style="overflow-y:auto;border-style:none;width:100%;height:400px"></iframe></div><div class="modal-footer btn-group">Deposit Bitcoin into address <b>'+address+'</b> <a class="btn btn-secondary">Close</a></div></div>');

		var modal = $('#deposit-modal');

		modal.modal({
			keyboard: true,
			backdrop: "static",
			show: true
		});

		modal.find('.btn.btn-primary').unbind().click(function() {
			modal.modal('hide');
		});

		modal.find('.btn.btn-secondary').unbind().click(function() {
			modal.modal('hide');
		});

        //Center
        modal.center();

		$('#deposit-frame').attr('src', '/deposit?address='+address+'&ptype='+method);
	}