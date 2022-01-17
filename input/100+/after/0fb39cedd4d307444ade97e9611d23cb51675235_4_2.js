function(start, end, o, r)
	{
		var a = Math3D.Delta(start, end);
		var b = Math3D.Delta(start, o);
		var p = Math3D.Dot(a, b);
		var la = Math3D.SizeSq(a);
		var lb = Math3D.SizeSq(b);
		var lp = p * p / la;
		var ld = lb - lp;
		var lr = r * r;
		if (ld > lr)
			return false;

		if (p < 0)
			return lb <= lr;
		else if (p > la)
			return Math3D.DistanceSq(end, o) <= lr;
		else
			return true;
	}