function showQuickReply(post) {
	var tNum = post.thr.Num,
		qArea = $id('DESU_qarea');
	pr.tNum = tNum;
	if(pr.isQuick) {
		if(aib.getWrap(post).nextElementSibling === qArea) {
			$disp(qArea);
			showMainReply();
			return;
		}
	} else {
		pr.isQuick = true;
		qArea.appendChild($id('DESU_pform'));
		$disp($id('DESU_toggleReply'));
		if(!TNum && !aib.kus && !aib.hana && !aib.ylil) {
			$del($q('#thr_id, input[name="parent"]', pr.form));
			$before(pr.form.firstChild, 
				$add('<input type="hidden" id="thr_id" value="' + tNum + '" name="' + (
					aib.fch || aib.gazo ? 'resto' :
					aib.tiny ? 'thread' :
					'parent'
				) + '">')
			);
			if(oeForm) {
				$del($q('input[name="oek_parent"]', oeForm));
				$before(oeForm.firstChild,
					$add('<input type="hidden" value="' + tNum + '" name="oek_parent">')
				);
			}
		}
	}
	$after(aib.getWrap(post), qArea);
	qArea.style.display = '';
	if(!TNum) {
		toggleQuickReply(tNum);
		if(Cfg['noThrdForm']) {
			$id('DESU_parea').style.display = 'none';
		}
	}
	if(pr.cap && !pr.recap && !aib.kus) {
		refreshCapImg(tNum);
	}
	if(aib._420 && pr.txta.value === 'Comment') {
		pr.txta.value = '';
	}
	$txtInsert(pr.txta, '>>' + post.Num + (quotetxt || '').replace(/(?:^|\n)(.)/gm, '\n> $1') + '\n');
}