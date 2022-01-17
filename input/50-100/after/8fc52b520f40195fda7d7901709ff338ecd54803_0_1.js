function(incidents) {

		   var self = this;

		   this.incidents = ko.observableArray( $.jStorage.get(INCIDENTS_LIST_KEY) );

		   

		   self.goToIncident = function(incident) {

			   setCurrentIncident(incident);

			   g_curSubject = null;

			   $.mobile.changePage( "incidentForm.html");

		   };

	                  

		}