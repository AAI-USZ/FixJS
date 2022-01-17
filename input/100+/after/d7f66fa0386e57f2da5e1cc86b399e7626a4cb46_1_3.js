function()
	{
		var form;
		var id_report		= '24';
		var tipe_report		= 'xls';
		
		form = document.createElement('form');

		form.setAttribute('method', 'post');
		form.setAttribute('target', '_blank');		
		form.setAttribute('action', _g_root +'/report');
		
		var hiddenField1 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
        hiddenField1.setAttribute('name', 'id');
        hiddenField1.setAttribute('value', id_report);
		
		var hiddenField2 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField2.setAttribute('name', 'type');
        hiddenField2.setAttribute('value', tipe_report);

		var hiddenField3 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField3.setAttribute('name', 'id_dir');
        hiddenField3.setAttribute('value', this.set_org.formDirektorat.getValue());
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'id_div');
        hiddenField4.setAttribute('value', this.set_org.formDivProSBU.getValue());
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'id_dep');
        hiddenField5.setAttribute('value', this.set_org.formDepartemen.getValue());
		
		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'id_din');
        hiddenField6.setAttribute('value', this.set_org.formDinas.getValue());
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'id_sek');
        hiddenField7.setAttribute('value', this.set_org.formSeksi.getValue());
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'nipg');
        hiddenField8.setAttribute('value', this.form_peg.getValue());
		
		var hiddenField9 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField9.setAttribute('name', 'start_date');
        hiddenField9.setAttribute('value', this.form_date_begin.getRawValue());
		
		var hiddenField10 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField10.setAttribute('name', 'end_date');
        hiddenField10.setAttribute('value', this.form_date_end.getRawValue());
		
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		form.appendChild(hiddenField3);
		form.appendChild(hiddenField4);
		form.appendChild(hiddenField5);
		form.appendChild(hiddenField6);
		form.appendChild(hiddenField7);
		form.appendChild(hiddenField8);
		form.appendChild(hiddenField9);
		form.appendChild(hiddenField10);
		document.body.appendChild(form);
		form.submit();
	}