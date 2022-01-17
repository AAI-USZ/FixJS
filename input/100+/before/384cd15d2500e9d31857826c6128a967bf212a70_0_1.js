function showAvailableCell() {
	var tid = dragElem.attr('id'); //like: n_0_tut_1
	var arrtid = tid.split('_');
	//rip
	var module_id = parseInt(arrtid[1]);
	var module = tt.module[module_id];

	switch (arrtid[2]) {
	case 'lec':
		for (var p=0; p < module.lecture.length; p++) {
			tt.showNode(module, module.lecture[p], module_id, p);
		}
		break;
	case 'tut':
		for (var p=0; p < module.tutorial.length; p++) {
			tt.showNode(module.code, module.tutorial[p], module_id, p);
		}
		break;
	case 'lab':
		for (var p=0; p < module.laboratory.length; p++) {
			tt.showNode(module.code, module.laboratory[p], module_id, p);
		}
		break;
	}
}