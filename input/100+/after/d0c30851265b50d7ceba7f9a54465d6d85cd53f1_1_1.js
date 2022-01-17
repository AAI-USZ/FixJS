function()
	{
		this.tahun_1	= this.form_year.getValue();
		this.bulan_1	= this.form_month.getValue();
		
		if (this.bulan_1 == 1){
			this.tahun_2 = this.tahun_1 - 1;
			this.bulan_2 = 12;
			this.tahun_3 = this.tahun_1 - 1;
			this.bulan_3 = 11;
		} else if(this.bulan_1 == 2){
			this.tahun_2 = this.tahun_1;
			this.bulan_2 = this.bulan_1 - 1;
			this.tahun_3 = this.tahun_1 - 1;
			this.bulan_3 = 12;
		} else {
			this.tahun_2 = this.tahun_1;
			this.bulan_2 = this.bulan_1 - 1;
			this.tahun_3 = this.tahun_1;
			this.bulan_3 = this.bulan_1 - 2;
		}
		
		var form;
		var id_report	= '20';
		var tipe_report	= 'doc';
		
		switch(this.form_jenis.getValue()){
			case 1	:
				id_report	= '20';
				break;
			case 2	:
				id_report	= '21';
				break;
			case 3	:
				id_report	= '22';
				break;
		}

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
		hiddenField3.setAttribute('name', 'year_1');
        hiddenField3.setAttribute('value', this.tahun_1);
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'year_2');
        hiddenField4.setAttribute('value', this.tahun_2);
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'year_3');
        hiddenField5.setAttribute('value', this.tahun_3);
		
		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'month_1');
        hiddenField6.setAttribute('value', this.bulan_1);
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'month_2');
        hiddenField7.setAttribute('value', this.bulan_2);
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'month_3');
        hiddenField8.setAttribute('value', this.bulan_3);
		
		var hiddenField9 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField9.setAttribute('name', 'id_dir');
        hiddenField9.setAttribute('value', this.id_direktorat);
		
		var hiddenField10 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField10.setAttribute('name', 'id_div');
        hiddenField10.setAttribute('value', this.id_divprosbu);
				
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