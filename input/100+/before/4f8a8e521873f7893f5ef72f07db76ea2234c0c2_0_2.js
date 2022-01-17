function(f) {
        var contact;
        if(navigator.mozContacts) {
          contact = new mozContact();
        }

      var cfdata = contacts[f];

       getContactPhoto(cfdata.uid,function(photo) {
          // When photo is ready this code will be executed

          window.console.log('Photo: ',photo);

          var worksAt = getWorksAt(cfdata);
          var studiedAt = getStudiedAt(cfdata);
          var marriedTo = getMarriedTo(cfdata);
          var birthDate = null;
          if(cfdata.birthday_date && cfdata.birthday_date.length > 0) {
           birthDate = getBirthDate(cfdata.birthday_date);
          }

          window.console.log(cfdata.uid,worksAt,studiedAt,marriedTo,birthDate);

          if(navigator.mozContacts) {
            var fbInfo = {
                            uid: cfdata.uid,
                            marriedTo: marriedTo,
                            studiedAt: studiedAt
            };

            contact.init({ name: [cfdata.name] , familyName: [cfdata.last_name],
                        additionalName: [cfdata.middle_name],
                        givenName: [cfdata.first_name],
                        category: ['facebook','fb_not_linked'],
                        note: [JSON.stringify(fbInfo)],
                        photo: [photo],
                        bday: birthDate,
                        org: [worksAt]
            });

            var request = navigator.mozContacts.save(contact);
            request.onsuccess = function() {
              numResponses++;
              window.console.log('Contact added!!!',numResponses);

              if(numResponses === totalContacts) {
                if(typeof doneCB === 'function') {
                  doneCB();
                }
              }
            } /// onsuccess

            request.onerror = function(e) {
              numResponses++;
              window.console.log('Contact Add error: ',numResponses);

              if(numResponses === totalContacts) {
                if(typeof doneCB === 'function') {
                  doneCB();
                }
              }
            };
          }
        });  // getContactPhoto
      }