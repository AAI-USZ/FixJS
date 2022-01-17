function(db, appPrefix, queue, maxElems, callback,

  firstElem) {

  'use strict';

  logger.debug('popNotification(db, appPrefix, queue, maxElems, callback, firstElem)',

    [db, appPrefix, queue, maxElems, callback, firstElem]);

  //pop the queu  (LRANGE)

  //hight priority first

  var fullQueueIdH = config.db_key_queue_prefix + 'H:' + appPrefix +

    queue.id, fullQueueIdL = config.db_key_queue_prefix + 'L:' + appPrefix +

    queue.id, restElems = 0;



  db.lrange(fullQueueIdH, 0, maxElems-1, function onRangeH(errH, dataH) {

    var dataHlength = dataH.length;

    logger.debug('onRangeH(errH, dataH)', [ errH, dataH ]);

    if (errH && !firstElem) {//errH

      manageError(errH, callback);

    } else {

      db.ltrim(fullQueueIdH, dataH.length, -1, function onTrimH(err) {

        if (err) {

          logger.warning('onTrimH', err);

        }

        //the trim fails!! duplicates warning!!

      });



      if (firstElem[0] === fullQueueIdH) {  //buggy indexes beware

        dataH = [

          firstElem[1]

        ].concat(dataH);

      }





      if (dataHlength < maxElems) {

        restElems = maxElems - dataHlength;

        //Extract from both queues

        db.lrange(fullQueueIdL, 0, restElems-1, function on_rangeL(errL, dataL) {

            var dataLLength = dataL.length;

            if (errL && firstElem[0] !== fullQueueIdL) {

              //fail but we may have data of previous range

              if (dataH) {

                //if there is dataH dismiss the low priority error

                getPopData(dataH, callback, queue);

              } else {

                manageError(errL, callback);

              }

            } else {

              if (firstElem[0] === fullQueueIdL) {

                dataL = [

                  firstElem[1]

                ].concat(dataL);

              }

                db.ltrim(fullQueueIdL,dataL.length, -1, function on_trimL(err) {

                    //the trim fails!! duplicates warning!!

                  });

                if (dataL) {

                  dataH = dataH.concat(dataL);

                }

                getPopData(dataH, callback, queue);

              }

          });

      } else {

        //just one queue used

        getPopData(dataH, callback, queue);

      }

    }

  });

}