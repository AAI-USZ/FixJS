function(){
	var vp = new Ext.ux.MainViewport();
	Ext.ux.msg('Грузимся ....', 'пожалуйста подождите', "ext-mb-invisible");
    Engine.vp = vp;
    Engine.auth.checkAuth();
    Ext.get('traceback').hide();
	
	$.alerts._overlay = function(status) {
			switch( status ) {
				case 'show':
					alertsMask.show();			
				break;
				case 'hide':
					alertsMask.hide();
				break;
			}
		},
	
	/*
	 *  Global hotkeys
	 */
	
	Ext.get(document).on('keypress', function(e,o) {
		if(e.ctrlKey) {
			e.preventDefault()
			if(e.button==119) {
				// Ctrl+X
					active_tab = Ext.getCmp("tab-panel").toolbars[0].getActiveTab()
					if (active_tab) {
							(function(){
								this.hide()
								Ext.getCmp("tab-panel").toolbars[0].remove(this.id);
								Ext.getCmp("tab-panel").toolbars[0].doLayout();
							}).defer(100, active_tab);						
					}				
				
			}								
		}            				               				
    });
    
    /*
     * Abonents grid special buttons
     */
    
	$(".abonent_edit_button").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abonent.openForm(o.id,$(o).attr('code'),$(o).attr('confirmed'),$(o).attr('dis'));
	});
    
    /*
     * Payments grid special buttons	 
     */
    
	$(".abonent_delete_payment").live('click', function(e) {
		o = e.currentTarget;
    	Engine.menu.cashier.register.deletePayment(o.getAttribute('val'),o);
	});
	$(".abonent_transfer_payment").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.register.transferPayment(o.getAttribute('val'),o);
	});
	$(".abonent_rollback_payment").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.payment.rollback(o.getAttribute('val'),o);
	});	 
		
	/*
	 * Fees grid special buttons
	 */
	
	$(".abonent_rollback_fee").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.fee.rollback(o.getAttribute('val'),o);
	});	 
	
	/*
	 * Register grid special buttons
	 */
	
	$(".register_edit_button").live('click', function(e) {
		o = e.currentTarget;	
    	Engine.menu.cashier.register.openForm(o.id);
    });
	$(".register_cash_button").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.register.partiallyConfirm(o.id, $(o).attr('source'));
	});
	
	/*
	 * Register form grid special buttons 
	 */
	
	$(".register_delete_payment").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.register.deletePayment(o.id,o);
	});
	
	/*
	 * Card history grid special buttons
	 */
	
	$(".card_history_deldete").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.history_delete(o.getAttribute('val'),o);
	});
	
	/*
	 * Abonent cards grid special buttons
	 */
	
	$(".abon_card_activate").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.card_activate(o.getAttribute('val'),o);
	});
	
	$(".abon_card_deactivate").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.card_deactivate(o.getAttribute('val'),o);
	});
	
	$(".abon_card_unbind").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.card_unbind(o.getAttribute('val'),o);
	});
	
	/*
	 * Abonent card tps grid special buttons
	 */
	
	$(".abon_tp_activate").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.tp_activate(o.getAttribute('val'),o);
	});
	
	$(".abon_tp_deactivate").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.tp_deactivate(o.getAttribute('val'),o);
	});
	
	$(".abon_tp_unbind").live('click', function(e) {
		o = e.currentTarget;
		Engine.menu.cashier.abon_card_func.tp_unbind(o.getAttribute('val'),o);
	});
}