function (e) {

            if (e.keyCode === 13 && !e.shiftKey) {

                var message = Kupo.unformatMessage(elements.querySelector('.chatInput textarea').value);



                if (message[message.length - 1] == "\n") {

                    message = message.substring(0, message.length - 1);

                }



                if (message == "") return;



                message = {

                    to: activeEmail,

                    date: new Date(),

                    direction: 'out',

                    message: message,

                    otr: gtalk.roster.get(activeEmail).otr

                };

                

                gtalk.sendMessage(activeEmail, message);



                $('.chatMessages').append('<div class="chat chatSent">' + Kupo.formatMessage(message) + '</div>');

                $('.chatInput textarea').val('').trigger('change');

                $('.chatContainer').animate({scrollTop: $('.chatContainer')[0].scrollHeight}, 'slow');



                activeConversation.push(message);



                updateRecentList(activeEmail);

                gtalk.save(localSettings);



                if (shareOperation) {

                    var contact = gtalk.roster.get(activeEmail);

                    // report share completed and add quicklink to contact

                    var quickLink = new Windows.ApplicationModel.DataTransfer.ShareTarget.QuickLink();

                    quickLink.title = contact.name;

                    quickLink.id = activeEmail;

                    var dataFormats = Windows.ApplicationModel.DataTransfer.StandardDataFormats;

                    quickLink.supportedDataFormats.replaceAll([dataFormats.text, dataFormats.uri, dataFormats.bitmap]);



                    Windows.Storage.ApplicationData.current.localFolder.getFileAsync(

                        contact.photo + '.jpg'

                    ).then(function (iconFile) {

                        quickLink.thumbnail = Windows.Storage.Streams.StreamReference.createFromFile(iconFile);

                        shareOperation.reportCompleted(quickLink);

                    }, function () {

                        Console.log('Error finding icon file');

                        shareOperation.reportCompleted(quickLink);

                    });

                }

            }

        }