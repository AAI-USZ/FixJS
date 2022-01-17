function(e) {
				if(window !== this)
				{
					CzBox.open(this);
				}
				else
				{
					CzBox.open(CzBox.framework.getSrcElement(e).parentNode);
				}
				
				CzBox.framework.cancelEvent(e);
				return false;
			}