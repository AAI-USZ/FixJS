function () {
      this.inherited(arguments);

      /**
       * This JSON descriptor can easily be stored somewhere else. It doesn't need
       * to be enyo-dependent.
       */
      /**
       * I've thought about getting the workspace code to figure out the
       * appropriate fieldType dynamically (if it's a date object, use DateWidget,
       * etc. But I think this would fail if the field happens to be null.
       */
      this.setWorkspacePanelDescriptor({
        "XM.Account": [
          {
            title: "Account Info",
            fields: [
              { fieldName: "name" },
              { fieldName: "number" }
            ]
          },
          {
            title: "Contact",
            fields: [
              // TODO: we can avoid having to specify the modelType by looking in the
              // *relations* of the model, which will work even if the submodel is null
              { fieldName: "primaryContact", fieldType: "relation", modelType: "XM.ContactInfo" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }

        ],

        "XM.Contact": [
          {
            title: "Contact Info",
            fields: [
              { fieldName: "firstName" },
              { fieldName: "lastName" },
              { fieldName: "jobTitle" },
              { fieldName: "phone" },
              { fieldName: "primaryEmail" }
            ]
          },
          {
            title: "Account Info",
            fields: [
              { fieldName: "account", fieldType: "relation", modelType: "XM.AccountInfo" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }
        ],

        "XM.ToDo": [
          {
            title: "ToDo Info",
            fields: [
              { fieldName: "name" },
              { fieldName: "description" },
              { fieldName: "status", fieldType: "dropdown", modelType: "XM.projectStatuses" },
              { fieldName: "priority", fieldType: "dropdown", modelType: "XM.priorities" },
              { fieldName: "incident", fieldType: "relation", modelType: "XM.IncidentInfo" }
            ]
          },
          {
            title: "Schedule",
            fields: [
              { fieldName: "startDate", fieldType: "date" },
              { fieldName: "dueDate", fieldType: "date" },
              { fieldName: "assignDate", fieldType: "date" },
              { fieldName: "completeDate", fieldType: "date" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }
        ],

        "XM.Opportunity": [
          {
            title: "Opportunity Info",
            fields: [
              { fieldName: "number" },
              { fieldName: "name" },
              { fieldName: "account", fieldType: "relation", modelType: "XM.AccountInfo" },
              { fieldName: "opportunityStage", fieldType: "dropdown", modelType: "XM.opportunityStages" },
              { fieldName: "opportunityType", fieldType: "dropdown", modelType: "XM.opportunityTypes" },
              { fieldName: "opportunitySource", fieldType: "dropdown", modelType: "XM.opportunitySources" }
            ]
          },
          {
            title: "Schedule",
            fields: [
              { fieldName: "startDate", fieldType: "date" },
              { fieldName: "assignDate", fieldType: "date" },
              { fieldName: "targetClose", fieldType: "date" },
              { fieldName: "actualClose", fieldType: "date" }
            ]
          },
          {
            title: "Notes",
            location: "bottom",
            fields: [
              { fieldName: "amount", fieldType: "number" },
              { fieldName: "probability", fieldType: "number" },
              { fieldName: "notes" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }
        ],

        "XM.Incident": [
          {
            title: "Incident Info",
            fields: [
              { fieldName: "number" },
              { fieldName: "description" },
              { fieldName: "notes" }
            ]
          },
          {
            title: "Relationships",
            fields: [
              { fieldName: "owner", fieldType: "relation", modelType: "XM.UserAccountInfo" },
              { fieldName: "contact", fieldType: "relation", modelType: "XM.ContactInfo" },
              { fieldName: "account", fieldType: "relation", modelType: "XM.AccountInfo" },
              { fieldName: "item", fieldType: "relation", modelType: "XM.ItemInfo" }
            ]
          },
          {
            title: "History",
            boxType: "grid",
            objectName: "history",
            location: "bottom",
            fields: [
              { fieldName: "description" },
              { fieldName: "created", fieldType: "readonly" },
              { fieldName: "createdBy", fieldType: "readonly" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }
        ],

        "XM.Project": [
          {
            title: "Project Info",
            fields: [
              { fieldName: "number", placeholder: "Enter the project number" },
              { fieldName: "name" },
              { fieldName: "notes" },
              { fieldName: "status", fieldType: "dropdown", modelType: "XM.projectStatuses" }
            ]
          },
          {
            title: "Summary",
            location: "bottom",
            fields: [
              { fieldName: "budgetedHoursTotal", fieldType: "readonly" },
              { fieldName: "actualHoursTotal", fieldType: "readonly" },
              { fieldName: "actualHoursBalance", fieldType: "readonly" },
              { fieldName: "budgetedExpensesTotal", fieldType: "readonly" },
              { fieldName: "actualExpensesTotal", fieldType: "readonly" },
              { fieldName: "balanceExpensesTotal", fieldType: "readonly" }

            ]
          },
          {
            title: "Schedule",
            fields: [
              { fieldName: "owner", fieldType: "relation", modelType: "XM.UserAccountInfo" },
              { fieldName: "assignedTo", fieldType: "relation", modelType: "XM.UserAccountInfo" },
              { fieldName: "dueDate", fieldType: "date" },
              { fieldName: "assignDate", fieldType: "date" },
              { fieldName: "startDate", fieldType: "date" },
              { fieldName: "completeDate", fieldType: "date" }
            ]
          },
          {
            title: "Tasks",
            location: "bottom",
            boxType: "grid",
            objectName: "tasks",
            fields: [
              { label: "number", fieldName: "number", width: "120" },
              { label: "name", fieldName: "name", width: "120" },
              { label: "notes", fieldName: "notes", width: "220" },
              { fieldName: "dueDate", fieldType: "date", width: "100" },
              { label: "actualHours", fieldName: "actualHours", fieldType: "number", width: "40" },
              { label: "actualExpenses", fieldName: "actualExpenses", fieldType: "number", width: "40" }
            ]
          },
          {
            title: "Comments",
            location: "bottom",
            boxType: "comments",
            objectName: "comments"
          }
        ]
      });


      this.getRelationalTitleFields = {};
      this.getRelationalTitleFields["XM.UserAccountInfo"] = "username";
      this.getRelationalTitleFields["XM.ContactInfo"] = "lastName";
      this.getRelationalTitleFields["XM.IncidentInfo"] = "number";
      this.getRelationalTitleFields["XM.AccountInfo"] = "name";
      this.getRelationalTitleFields["XM.ItemInfo"] = "number";

    }