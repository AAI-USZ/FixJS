function (wp) {
                 if (wp.get('CheckedStatus') === true) {
                    checkedPhoneNumbersArray.push(wp.get('TelNumber'));
                 }
              }