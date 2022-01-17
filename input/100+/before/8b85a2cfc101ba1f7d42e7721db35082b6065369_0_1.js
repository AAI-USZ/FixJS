function(self, target, ability)
	{
		if (this._attackCoolDown > 0)
			this._attackCoolDown--;

		var selfCenter = self.GetCenter();
		var targetCenter = target.GetCenter();

		var distToTarget = Math3D.Distance(selfCenter, targetCenter);

		if (distToTarget > 20)
		{
			this.IsActive = false;
			return;
		}

		if (distToTarget > 3)
		{
			var targetLoc = target.GetCenterRounded();
			if (!self.IsNavigatingTo(targetLoc.x, targetLoc.y))
			{
				self.NavigateTo(targetLoc.x, targetLoc.y);
			}
		}
		else
		{
			if (self.IsNavigating())
				self.StopNavigation();
		}

		if (distToTarget <= 10)
		{
			if (this._attackCoolDown <= 0)
			{
				this._attackCoolDown = 50;
				var data = { dir : Math3D.Direction(selfCenter, targetCenter) };
				self.UseAbility(ability, data);
			}
		}
	}