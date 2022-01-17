function(){
					var record_all_direktorat = new Ext.data.Record ({
							id		: 0
						,	name	: 'Semua Direktorat'
					});
								
					this.store_direktorat.insert(0, record_all_direktorat);

					if (this.store_direktorat.getTotalCount() > 0) {
						this.form_direktorat.setValue(this.store_direktorat.getAt(0).get('id'));
					}

					this.store_divprosbu.load({
							scope		: this
						,	params		: {
								id_direktorat	: this.id_direktorat
							}
						,	callback	:  function(){
								var record_all_divprosbu = new Ext.data.Record ({
										id_direktorat	: 0
									,	id				: 0
									,	name			: 'Semua Divisi/Proyek/SBU'
								});
											
								this.store_divprosbu.insert(0, record_all_divprosbu);
								
								if (this.store_divprosbu.getTotalCount() > 0) {
									this.form_divprosbu.setValue(this.store_divprosbu.getAt(0).get('id'));
								}
							}
					});
				}