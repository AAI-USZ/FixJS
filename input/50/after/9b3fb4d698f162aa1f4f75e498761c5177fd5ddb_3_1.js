function (wp) {
                 if (wp.get('CheckedStatus') === true) {
                    self.checkedPhoneNumbersArray.push(wp.get('TelNumber'));
                 }
              }