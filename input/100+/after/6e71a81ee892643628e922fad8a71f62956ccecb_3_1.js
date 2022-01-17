function successCallback(data) {
                 lastData = currentData;
                 currentData = data;
                 $("#jenkins-invalid-url").hide();
                 $("#jenkins-container").show();
                 $('#jenkins-queue').empty();
                 $.each(data.items, function () {
                     name = this.task.name;
                     if (name.length > 25) {
                         name = name.substring(0, 22) + '...';
                     }
                     $('#jenkins-queue').append('<p><span class="job label label-inverse">' + name + '</span></p>');
                 });
             }