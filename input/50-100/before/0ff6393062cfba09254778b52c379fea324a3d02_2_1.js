function(data) {
            $('#tableFieldsId tr:eq(1) td:eq(0)').html(data.field_type);
            $('#tableFieldsId tr:eq(1) td:eq(1)').html(data.field_collation);
            $('#tableFieldsId tr:eq(1) td:eq(2)').html(data.field_operators);
            $('#tableFieldsId tr:eq(1) td:eq(3)').html(data.field_value);
	    xLabel = $('#tableid_0').val();
	    $('#types_0').val(data.field_type);
        xType = data.field_type;
	    $('#collations_0').val(data.field_collations);
        }