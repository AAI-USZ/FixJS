function () {
            this.initCollectionField("Notes", App.Notes);
            this.initCollectionField("Certifications");

            //TODO: move related logic to App.Salary and App.Salaries models
            this.initCollectionField("SalaryChanges", App.Notes);
            this.get("SalaryChanges").on("add remove reset change", this.updateSalaries, this);

            //TODO: move related logic to App.Vacation and App.Vacations models
            this.initCollectionField("Vacations", App.Vacations);
        }