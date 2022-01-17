function(data) {
            $('#tableFieldsId tr:eq(3) td:eq(0)').html(data.field_type);
            $('#tableFieldsId tr:eq(3) td:eq(1)').html(data.field_collation);
            $('#tableFieldsId tr:eq(3) td:eq(2)').html(data.field_operators);
            $('#tableFieldsId tr:eq(3) td:eq(3)').html(data.field_value);
	    yLabel = $('#tableid_1').val();
	    $('#types_1').val(data.field_type);
        yType = data.field_type;
	    $('#collations_1').val(data.field_collations);
        addDateTimePicker();
        }