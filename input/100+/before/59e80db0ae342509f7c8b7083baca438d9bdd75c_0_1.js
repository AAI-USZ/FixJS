function(record){

				var filter = {};

				var tmp = [];

				if (record.contract_no != "") {

					filter.type = "string";

					filter.field = "contract.contract_no";

					filter.value = record.contract_no;

					tmp.push(Ext.apply({}, filter));

				}

				if (record.supplier != "") {

					filter.type = "string";

					filter.field = "contract.supplier";

					filter.value = record.supplier;

					tmp.push(Ext.apply({}, filter));

				}

				if (record.model_contract != "") {

					filter.type = "string";

					filter.field = "materila_doc_item.model_contract";

					filter.value = record.model_contract;

					tmp.push(Ext.apply({}, filter));

				}

				

				if (record.original != undefined  && record.original != null &&record.original != "") {

					filter.type = "int";

					filter.field = "inspection.original";

					filter.comparison = 'eq';

					filter.value = record.original;

					tmp.push(Ext.apply({}, filter));

				}



				if (record.inspectionDateFrom != "") {

					filter.type = "date";

					filter.field = "inspection.inspection_date";

					filter.comparison = 'ge';

					filter.value = record.inspectionDateFrom;

					tmp.push(Ext.apply({}, filter));

				}

				

				if (record.inspectionDateTo != "") {

					filter.type = "date";

					filter.field = "inspection.inspection_date";

					filter.comparison = 'le';

					filter.value = record.inspectionDateTo;

					tmp.push(Ext.apply({}, filter));

				}

				

				if (record.doc_no != "") {

					filter.type = "string";

					filter.field = "inspection.doc_no";

					filter.value = record.doc_no;

					tmp.push(Ext.apply({}, filter));

				}

				

				

				if (record.plate_num != "") {

					filter.type = "string";

					filter.field = "material_doc.plate_num";

					filter.value = record.plate_num;

					tmp.push(Ext.apply({}, filter));

				}

				if (record.batch_no != "") {

					filter.type = "string";

					filter.field = "material_doc.batch_no";

					filter.value = record.batch_no;

					tmp.push(Ext.apply({}, filter));

				}

				if (record.delivery_note != "") {

					filter.type = "string";

					filter.field = "material_doc.delivery_note";

					filter.value = record.delivery_note;

					tmp.push(Ext.apply({}, filter));

				}

				

				

				return tmp;

                

				

				

			}