function(args) {
		var cs = Ext.getStore('Choice');
		var es = Ext.getStore('Explanation');
		var qs = Ext.getStore('Question');
		// Empty Explanation store/model/proxy.
		es.model.proxy.clear();
		var scoreContent = '';
		var num_questions = Ext.ComponentQuery.query('quizcards')[0].items.length;
		var num_correct = 0;
		// loop through quiz cards
		for ( i = 0; i < num_questions; i++) {
			var questionId = Ext.ComponentQuery.query('quizcards')[0].items.getAt(i).questionId;
			//get selected radiofield id
			try {
				var selected_id = Ext.ComponentQuery.query('#choicegroup-'+questionId)[0].getValue()['rb'];
				if (cs.getById(selected_id).data['is_correct']) {
					num_correct += 1;
				} else {
					var exp = Ext.create('Assessor.model.Explanation', {
						question: qs.getById(questionId).data['text'],
						choice: cs.getById(selected_id).data['text'],
						explanation: qs.getById(questionId).data['explanation']
					});
					exp.save();
					es.add(exp);
				}
			} catch (e) {
				console.log(e);
			}
		}
		var pctScore = 100.0 * num_correct / num_questions;
		scoreContent += 'Your score was <b>' + pctScore + '%</b>. ';
		if (pctScore>=70.0) {
			scoreContent += 'Congratulations, you passed!';
		} else {
			scoreContent += 'BBS requires at least a 70%, keep studying.';
		}
		Ext.ComponentQuery.query('quizcards')[0].removeAll();
		// make sure the grid has data
		es.load()
		rc = Ext.create('Assessor.view.ResultCard', {});
		Ext.ComponentQuery.query('#resultpanel')[0].html = scoreContent
		Ext.ComponentQuery.query('quizcards')[0].add(rc);
	}