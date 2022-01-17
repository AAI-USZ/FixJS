function () {
		        me.checkSession();
                me.getPatientesInPoolArea();
                CronJob.run();
	        }