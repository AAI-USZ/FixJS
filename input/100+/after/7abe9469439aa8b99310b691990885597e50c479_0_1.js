function getRepeaterStatus(later, si_idx, repeaters, count)
{
	var c = 0;
	var len = repeaters.length;

	if (len < count)
		return -1;

	/* length == 1 */
	if (len == 1 && count == 1) {
		var si = repeaters[0].pos_now;
		si_idx.set(si.laterIndex, si.partIndex);
		return 1;
	}

	/* length > 1 */
	for (var i = 1; i < len; i++) {
		var rprv = repeaters[i-1];
		var rnow = repeaters[i];
		var si_prvnxt = getNextStrokeIndex(later, rprv.pos_now);
		var si_nowstart = rnow.pos_start;
		if (isStrokeIndexEqual(si_prvnxt, si_nowstart)) {
			c++;
			si_idx.set(rnow.pos_now.laterIndex, rnow.pos_now.partIndex);
		} else {
			c = 0;
		}

		if ((c+1) >= count) {
			return 1;
		}
	}
	si_idx = null;
	return 0;
}