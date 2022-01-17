function(result) {
        $("#step1-logout").removeClass("hide");
        var logoutButton = $("#step1-logout-button")
        logoutButton.on("click", function() {
          IN.User.logout(reinitialize);
          return false;
        });

        var profile = result.values[0];
        var profHTML = "<h2>" + profile.firstName + " " + profile.lastName + "</h2>"; 
        profHTML += "<h4>" + profile.headline + "</h4>"; 

        if ('pictureUrl' in profile) {
          profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<p><h6>Photo</h6><img id='pictureUrl' src='" + profile.pictureUrl + "' /></p>";
        }

        if ('summary' in profile) {
          profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<p><h6>Summary</h6>"+profile.summary+"</p>";
        }

        profHTML += "<h3>Experience</h3>"; 
        var positions = profile.positions.values;
        $.each(positions, function(index, item) {
          profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<h4>" + item.company.name + "</h4>"; 
          profHTML += "<h4><small>" + getDateStr(item.startDate) + " - "+ getDateStr(item.endDate, item.isCurrent) + "</small></h4>"; 
          profHTML += "<p>" + getSummaryStr(item.summary) + "</p>"; 
        });

        profHTML += "<h3>Education</h3>"; 
        var educations = profile.educations.values;
        $.each(educations, function(index, item) {
          profHTML += " <button class='close' data-dismiss='alert'>×</button>"
          profHTML += "<h4>" + item.schoolName + "</h4>"; 
          profHTML += "<h4><small>" + getDateStr(item.startDate) + " - "+ getDateStr(item.endDate) + "</small></h4>"; 
          profHTML += "<p>" + item.fieldOfStudy + ", " + item.degree + "</p>"; 
          profHTML += "<p>" + getSummaryStr(item.notes) + "</p>"; 
        });

        if (certifications in profile && values in profile.certifications) {
        profHTML += " <button class='close' data-dismiss='alert'>×</button>"
        profHTML += "<h3>Certifications</h3>"; 
        profHTML += "<ul>";
        var certifications = profile.certifications.values;
        $.each(certifications, function(index, item) {
          profHTML += "<li>" + item.name + "</li>"; 
        });
        profHTML += "</ul>";
        }

        profHTML += " <button class='close' data-dismiss='alert'>×</button>"
        profHTML += "<h3>Skills</h3>"; 
        profHTML += "<p>";
        var skills = profile.skills.values;
        $.each(skills, function(index, item) {
          profHTML += item.skill.name + "   "; 
        });
        profHTML += "</p>";

        step2Spinner.stop();
        $("#step2-status").text("Not yet reviewed");
        $("#profile").html(profHTML);

        //Show confirm buttons after loading
        var confirmButton = $("#step3-generate")
        confirmButton.on("click", function() {
          generateResume(profile);
          _gaq.push(['_trackEvent', 'Buttons', 'Generate Resume']);
          return false;
        });
        confirmButton.removeClass("hide");
        
        var debugHTML = "<h3>Debug</h3>"; 
        debugHTML += "<code>" + JSON.stringify(result) + "</code>";
        $("#debug").html(debugHTML);
      }