function () {
					if (this.self.getName() == "PartKeepr.Footprint" && this.get("id") == draggedRecord.get("id")) {
						return true;
					} else {
						return false;
					}
				}