function()
	{
		var form;
		var id_report	= '25';
		var tipe_report	= 'xls';
		var isinorg		= m_rca_lap_severity.form.set_org.isChecked();
		
		if (isinorg){
			is_in_org	= '1'
		} else {
			is_in_org	= '0'
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
		hiddenField3.setAttribute('name', 'is_in_org');
        hiddenField3.setAttribute('value', is_in_org);
		
		var hiddenField4 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField4.setAttribute('name', 'year');
        hiddenField4.setAttribute('value', m_rca_lap_severity.form.set_waktu.formTahun.getValue());
		
		var hiddenField5 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField5.setAttribute('name', 'month');
        hiddenField5.setAttribute('value', m_rca_lap_severity.form.set_waktu.formBulan.getValue());

		var hiddenField6 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField6.setAttribute('name', 'id_dir');
        hiddenField6.setAttribute('value', m_rca_lap_severity.form.set_org.formDirektorat.getValue());
		
		var hiddenField7 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField7.setAttribute('name', 'id_div');
        hiddenField7.setAttribute('value', m_rca_lap_severity.form.set_org.formDivProSBU.getValue());
		
		var hiddenField8 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField8.setAttribute('name', 'id_dep');
        hiddenField8.setAttribute('value', m_rca_lap_severity.form.set_org.formDepartemen.getValue());
		
		var hiddenField9 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField9.setAttribute('name', 'id_dinas');
        hiddenField9.setAttribute('value', m_rca_lap_severity.form.set_org.formDinas.getValue());
		
		var hiddenField10 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField10.setAttribute('name', 'id_seksi');
        hiddenField10.setAttribute('value', m_rca_lap_severity.form.set_org.formSeksi.getValue());
		
		var hiddenField11 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField11.setAttribute('name', 'id_wilayah');
        hiddenField11.setAttribute('value', m_rca_lap_severity.form.set_wil.formWilayah.getValue());
		
		var hiddenField12 = document.createElement ('input');
        hiddenField1.setAttribute('type', 'hidden');
		hiddenField12.setAttribute('name', 'id_area');
        hiddenField12.setAttribute('value', m_rca_lap_severity.form.set_wil.formArea.getValue());
				
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
		form.appendChild(hiddenField11);
		form.appendChild(hiddenField12);
		document.body.appendChild(form);
		form.submit();
	}