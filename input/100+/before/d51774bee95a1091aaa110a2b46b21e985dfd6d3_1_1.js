function(dn, r) {
				if(r && r['403']) return; // not permitted
				
				if(!(locals[dt] && locals[dt][dn])) {
					wn.container.change_to('404');
					return;
				}
				if(!wn.views.formview[dt]) {
					wn.views.formview[dt] = wn.container.add_page('Form - ' + dt);
					wn.views.formview[dt].frm = new _f.Frm(dt, wn.views.formview[dt]);
				}
				wn.container.change_to('Form - ' + dt);
				wn.views.formview[dt].frm.refresh(dn);
			}