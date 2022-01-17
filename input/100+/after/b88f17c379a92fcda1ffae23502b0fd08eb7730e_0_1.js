function(){
	
	if(this.cityInput.value == "" && this.selectedCity != null){
		this.setData(this.cityInput, this.selectedCity);
		
		if(this.streetInput.value == "" && this.selectedStreet != null){
			this.setData(this.streetInput, this.selectedStreet);
			
			if(this.buildingInput.value == "" && this.selectedBuilding != null){
				this.setData(this.buildingInput, this.selectedBuilding);
			}
		}
	}
	else if(this.cityInput && this.cityInput.value != null && this.cities[this.cityInput.value] != null){
		this.selectedCity = this.cities[this.cityInput.value].name;
		this.refreshStreetsData(function(){
			
			this.select(this.selectedCity, this.cityView);
			
			if(this.streetInput && this.streetInput.value != null && this.cities[this.selectedCity].streets[this.streetInput.value] != null){
				this.selectedStreet = this.cities[this.selectedCity].streets[this.streetInput.value].name;
				this.refreshBuildingsData(function(){
					this.select(this.selectedStreet, this.streetView);
					
					if(this.buildingInput && this.buildingInput.value && $.inArray(this.buildingInput.value, this.cities[this.selectedCity].streets[this.streetInput.value].buildings) >= 0){
						this.selectedBuilding = this.buildingInput.value;
						this.select(this.selectedBuilding, this.buildingView);
						this.centerSelectedBuilding();
					}
				}, this);
			}
			else{
				this.resetBuildingView();
			}
		}, this);
	}
	else{
		this.resetStreetView();	
	}
}