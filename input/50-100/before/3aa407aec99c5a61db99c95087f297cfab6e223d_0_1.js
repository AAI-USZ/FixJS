function(years,department,data){
			//Changing url
			moduleContext.getController().goTo("salesinfo/"+department+"/"+years);
			
			self.tableEnabled(true);
			self.selectedYear(years);
			self.selectedDept(department);
			self.selectedData(data.values);
		}