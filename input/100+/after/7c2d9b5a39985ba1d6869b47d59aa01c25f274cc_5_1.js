function(){
        Ext.create('Ext.Container',{
            id:'viewPort',
            fullscreen:true,
            layout:'card',
            items:[{
                // log into application
                xclass:'mUserStories.view.loginScreen'
            },{
                // daily checkin
                xclass:'mUserStories.view.confirmLocation'
            },{
                // display a list of patients
                xclass:'mUserStories.view.patientList'
            },{
                // display details of patient
                xclass:'mUserStories.view.patientDetails'
            },{
                // display options for adding
                xclass:'mUserStories.view.addOptions'
            },{
                xclass:'mUserStories.view.addPatient'
            },{
                xclass:'mUserStories.view.addReminder'
            },{
                xclass:'mUserStories.view.addAppointment'
            },{
                // display inbox/outbox
                xclass:'mUserStories.view.notificationInbox'
            },{
                xclass:'mUserStories.view.resources'
            },{
                xclass:'mUserStories.view.vcNotifications'
            },{
                xclass:'mUserStories.view.vcScheduling'
            }]
        })
    }