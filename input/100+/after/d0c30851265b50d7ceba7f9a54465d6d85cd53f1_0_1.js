function()
	{
		this.tahun	= this.form_year.getValue();
		this.bulan	= this.form_month.getValue();
		
		if (this.bulan == 1){
			this.prev_bulan = 12;
			this.prev_tahun = this.tahun - 1;
		} else {
			this.prev_bulan = this.bulan - 1;
			this.prev_tahun = this.tahun;
		}
		
		var form;
		var id_report	= '17';
		var tipe_report	= 'xls';
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
		hiddenField3.setAttribute('name', 'prev_year');
        hiddenField3.setAttribute('value', this.prev_tahun);
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'prev_month');
        hiddenField4.setAttribute('value', this.prev_bulan);
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'year');
        hiddenField5.setAttribute('value', this.tahun);
		
		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'month');
        hiddenField6.setAttribute('value', this.bulan);
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'id_dir');
        hiddenField7.setAttribute('value', this.id_direktorat);
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'id_div');
        hiddenField8.setAttribute('value', this.id_divprosbu);
				
		form.appendChild(hiddenField1);
		form.appendChild(hiddenField2);
		form.appendChild(hiddenField3);
		form.appendChild(hiddenField4);
		form.appendChild(hiddenField5);
		form.appendChild(hiddenField6);
		form.appendChild(hiddenField7);
		form.appendChild(hiddenField8);
		document.body.appendChild(form);
		form.submit();
	}