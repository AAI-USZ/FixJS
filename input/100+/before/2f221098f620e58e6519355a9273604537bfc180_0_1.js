function ()
	{
		this.control ({
			'trans_peminjaman #peminjaman_grid': {
				selectionchange : this.user_select
			,	beforeedit		: this.do_select
			}
		,	'trans_peminjaman #berkas_pinjam_grid': {
				beforeedit		: this.do_select
			}
		,	'trans_peminjaman #peminjaman_grid button[action=add]': {
				click : this.do_add
			}
		,	'trans_peminjaman #peminjaman_grid button[action=refresh]': {
				click : this.do_refresh
			}
		,	'trans_peminjaman #peminjaman_grid button[action=edit]': {
				click : this.do_edit
			}
		,	'trans_peminjaman #peminjaman_grid button[action=del]': {
				click : this.do_delete_peminjaman
			}
		,	'trans_peminjaman #peminjaman_grid button[itemId=search]': {
				click : this.do_open_win_cari
			}
		,	'trans_peminjaman #peminjaman_grid button[itemId=print]': {
				click : this.do_print_peminjaman
			}
		,	'trans_peminjaman #peminjaman_grid button[itemId=pengembalian]': {
				click : this.do_pengembalian
			}
		,	'peminjaman_win  textfield': {
				change: this.do_activate_grid
			}
		,	'peminjaman_win #peminjaman_rinci': {
				itemdblclick: this.do_deactivate_editor
			}
		,	'pengembalian_win #peminjaman_rinci': {
				itemdblclick: this.do_deactivate_editor
			}
		,	'peminjaman_win grid button[action=add]': {
				click : this.do_add_berkas
			}
		,	'peminjaman_win button[action=submit]': {
				click : this.do_submit
			}
		,	'pengembalian_win button[action=submit]': {
				click : this.do_pengembalian_submit
			}
		,	'peminjaman_win grid button[action=del]': {
				click : this.do_delete_berkas
			}
		,	'caripeminjamanwin combo[itemId=pilihan_tanggal]' : {
				change	: this.do_enable_tgl_range
			}
		,	'caripeminjamanwin button[itemId=cari]' : {
				click	: this.do_cari
			}
		});
		
		var form = this
	}