function(pcontacts) {
      // The selected contacts
      var contacts = pcontacts;
      // The uids of the selected contacts
     var kcontacts = Object.keys(contacts);

      var chunkSize = 10;
      var pointer = 0;
      this.pending = contacts.length;

      /**
       *  Imports a slice
       *
       */
      function importSlice() {
        var cgroup = kcontacts.slice(pointer,pointer + chunkSize);
          persistContactGroup(cgroup,function() {
            pointer += chunkSize; this.pending -= chunkSize;
            this.onsuccess(); }.bind(this) );
      } // importSlice

      /**
       *  This method allows to continue the process
       *
       */
      this.continue = function() {
        if(this.pending > 0) {
          if(this.pending < chunkSize) {
            var cgroup = kcontacts.slice(pointer,pointer + this.pending);
            persistContactGroup(cgroup,function() { this.pending = 0;
                                                        this.onsuccess(); }.bind(this) );
          }
          else {
            (importSlice.bind(this))();
          }
        }
      }

      /**
       *  Starts a new import process
       *
       */
      this.start = function() {
        pointer = 0;
        this.pending = kcontacts.length;
        (importSlice.bind(this))();
      }

      /**
       * Auxiliary function to know where a contact works
       *
       */
      function getWorksAt(fbdata) {
        var ret = '';
        if(fbdata.work && fbdata.work.length > 0) {
          // It is assumed that first is the latest
          ret = fbdata.work[0].employer.name;
        }

        return ret;
      }


      /**
       *  Auxiliary function to know where a contact studied
       *
       */
      function getStudiedAt(fbdata) {
        var ret = '';

        if(fbdata.education && fbdata.education.length > 0) {
          var university = fbdata.education.filter(function(d) {
            var e = false;
            if(d.school.type === 'College') {
              e = true;
            }
            return e;
          });

          if(university.length > 0) {
            ret = university[0].school.name;
          }
          else {
            ret = fbdata.education[0].school.name;
          }
        }

        return ret;
      }

      /**
       *  Calculates a friend's partner
       *
       */
      function getMarriedTo(fbdata) {
        var ret = '';

        window.console.log('Significant other id: ',fbdata.significant_other_id);

        if(fbdata.significant_other_id) {
          ret = friendsPartners[fbdata.significant_other_id];
        }

        return ret;
      }

      /**
       *  Facebook dates are MM/DD/YYYY
       *
       *  Returns the birth date
       *
       */
      function getBirthDate(sbday) {
        var ret = new Date();

        var imonth = sbday.indexOf('/');
        var smonth = sbday.substring(0,imonth);

        window.console.log('Birthday month:',smonth);

        var iyear = sbday.lastIndexOf('/');
        if(iyear === imonth) {
          iyear = sbday.length;
        }
        var sday = sbday.substring(imonth + 1,iyear);

        window.console.log('Birthday day:',sday);

        var syear = sbday.substring(iyear + 1,sbday.length);
        window.console.log('Birthday year:',syear);

        ret.setDate(parseInt(sday));
        ret.setMonth(parseInt(smonth),parseInt(sday));

        if(syear && syear.length > 0) {
          ret.setYear(parseInt(syear));
        }

        return ret;
      }

    /**
     *  Persists a group of contacts
     *
     */
    function persistContactGroup(cgroup,doneCB) {
      var numResponses = 0;
      var totalContacts = cgroup.length;

      window.console.log('Contacts to add: ',totalContacts);

      cgroup.forEach(function(f) {
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

            contact.init({ name: [cfdata.name] , category: ['facebook'],
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
      }); //forEach
    } // persistContactGroup
  }