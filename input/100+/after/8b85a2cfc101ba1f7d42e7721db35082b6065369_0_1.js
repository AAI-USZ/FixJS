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

		if (!self.IsNavigatingTo(target))
		{
			if (this._entity.IsNavigating() || distToTarget > 12)
			{
				this._entity.NavigateTo(target, 6);
			}
			else
			{
				if (this._attackCoolDown <= 0)
				{
					this._attackCoolDown = 50;
					var data = { dir : Math3D.Direction(selfCenter, targetCenter) };
					self.UseAbility(ability, data);
				}
			}
		}
	}