function(docTopicDistFile){
              readCSVFile(docTopicDistFile,function(dtderr,docTopicDist){
                listTTDs(topicTermDistDir,function(ttderr,topicTermDist){
                  cb( null
                    , { docTopicDict:  docTopicDist
                      , topicTermDist: topicTermDist
                      }
                    );
                });
              });
          }