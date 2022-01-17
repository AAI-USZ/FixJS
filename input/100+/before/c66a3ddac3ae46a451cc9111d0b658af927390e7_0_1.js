function(){
  loadInfo = function(loadUrl){
      $.ajax({
      url: loadUrl,
      success: function(data){
        firstStudy = shuffle(data["Day 1: STUDY PHASE"]);
        firstTest = shuffle(data["Day 1: TEST PHASE"]);
        secondTest = shuffle(data["Day 2: TEST PHASE"]);
        console.log(secondTest)
        loadImages()
      }
  })
}
  
    //Ajax call to get friend data

  var loadImages = function(){
    $(firstStudy).each(function(){
          $('<img/>')[0].src = imgFullPath(this.abbr)
      });
      $(firstTest).each(function(){
          $('<img/>')[0].src = imgFullPath(this.abbr)
      });
  }
  var imgFullPath = function(img){
    var path = 'resources/faces/'
    return path+img+'.bmp'
  }

  /**************** Study Functions ***************/
  
  // Sets up loop variables for study
  var showInitial = function(type){
    //Global type to avoid calling function timer logs on study function
    questionTypeEnum = type;
    src = ""
    if(type ==1){
      src = firstStudy
    }
    if(type ==2){
      src = firstTest
    }
    if(type ==3){
      src = secondTest
    }
    $(".imgSrc").attr('src',imgFullPath(src[0].abbr))
    $(".photoName").html(src[0].name)
    //START COntainer is another part of the page, which is hidden as not necessary in study
    $("#startContainer").fadeOut(100,function(){
      $(".photoPairWrapper").fadeIn(300,function(){
          if(questionTypeEnum ==2 ||  questionTypeEnum ==3){
            questionLogs.startTime()
          }
      });
    })  
  }

  //Shows Images on Timer
  //Mehtod iterates through contents of an array showing each one
  var showStudyImage = function()
  { 
    
    if (startStudy == stopStudy){
      clearInterval(inter)
      //Transition to Testing Phase
      doDemographics()
      return;
    }
    updateContainerImage(firstStudy,startStudy)
    startStudy++
  }
  //initializes parameters of which contents should be iterated through
  var setupStudy = function(start, stop,timer)
  {
    startStudy = start
    stopStudy = stop
    showInitial(1)
    inter = setInterval(showStudyImage, timer);
  }
  // Updates image to desired index of people
  // called by showStudyImage
  var updateContainerImage= function(people, index)
  {
    $(".photoPair").fadeOut(200,function(){ 
      $(".imgSrc").attr('src',imgFullPath(src[index].abbr))
      $(".photoName").html(src[index].name)
    })
    $(".empty").fadeOut(500);//For blank screen in between
    $(".empty").fadeIn(1, function(){
      $(".photoPair").fadeIn(200,function(){
        //Start timer for user answer
         if(questionTypeEnum ==2 ||  questionTypeEnum ==3){
            questionLogs.startTime()
          }
      })
    })
  }
    /***************Wrapper Caller Functions *************/

  var startStudyPhase = function (){
    $("#header").animate({opacity:0},500,function(){
      setupStudy(1,firstStudy.length,2500)
    })
    
  }
  var startTestPhase1 = function(){
    $("#header").animate({opacity:0},500,function(){
      setupTestPhase(0,firstTest.length,10000)
      $("#testPanel").fadeIn(400)
    })
  }
  var startTestPhase2 = function(){
    $("#header").animate({opacity:0},500,function(){
      setupTestPhaseDay2(0,secondTest.length,10000)
      $("#testPanel").fadeIn(400)
    })
  }
  $(".startStudyPhase").click(startStudyPhase)
  $("#startTestPhase1").click(startTestPhase1)
  $(".startTestPhase2").click(startTestPhase2)

 /***************Logging Class *************/
 //Fixme need list number and userid
 var getListNum = function(){
   return 1;
 }
 var getPersonId = function(abbr)
 {
  return 1234
 }
 function Question(personName, personId, userAnswer, correctAnswer, timeTilAnswer, didTimeout)
 {
  this.personName = personName
  this.personId = personId
  this.userAnswer = userAnswer
  this.correctAnswer = correctAnswer
  this.timeTilAnswer = timeTilAnswer
  this.didTimeout = didTimeout
 }
function QuestionLog(listNum, dayNum) {
  this.listNumber = listNum;
  this.numWrong = 0
  this.numRight = 0
  this.questions = new Array()
  // return this;
  }
  QuestionLog.prototype.startTime = function()
  {
    var d = new Date()
    this.time = d.getTime();
  } 
  QuestionLog.prototype.logAnswer = function(personName, personId, userAns, corrAns, didTimeout) {
      if (userAns == corrAns){
        this.numRight++;
      }else{
        this.numWrong++;
      }
      var d = new Date()
      var endTime = d.getTime();
      var timeElapsed = endTime-this.time;
      this.questions.push(new Question(personName, personId, userAns, corrAns, timeElapsed, didTimeout))
  }


 /***************Testing Functions *************/
  var setupTestPhase = function(start, stop,timer)
  {
    questionLogs = new QuestionLog(getListNum(), 1)
    testIndex = start
    stopTest = stop
    showInitial(2)
    inter = setInterval(testTimeout, timer);
  }
  var setupTestPhaseDay2 = function(start, stop,timer)
  {
    questionLogs = new QuestionLog(getListNum(), 2)
    testIndex = start
    stopTest = stop
    showInitial(3)
    inter = setInterval(testTimeout, timer);
  }
  //Functions for answering questions 
  //Function moves to next question after 10 seconds
  testTimeout = function(){
    //BUG: Sometimes clearTimeout function is not being called, so at the end of the test, this method will still be called
    //This if statement is a quick fix
    if (testIndex<stopTest)
    {
      questionLogs.logAnswer(src[testIndex].name, getPersonId(src[testIndex].abbr), 'none', src[testIndex].testType, "false")
      showTestImage(src, testIndex)
    }
  }
  //Checks if actual answer is the same as the expected answer
  testAnswer = function(answer){
    questionLogs.logAnswer(src[testIndex].name, getPersonId(src[testIndex].abbr), answer, src[testIndex].testType, "false")
    // if(answer == src[testIndex].testType){
    //   console.log(('Answered Correctly '+src[testIndex].name + ' ans '+ src[testIndex].testType))
    // }else{
    //   console.log(('Answered '+answer +' incorrectly for '+src[testIndex].name + ' ans: '+ src[testIndex].testType))
    // }
    clearInterval(inter)
    showTestImage()
    inter = setInterval(testTimeout, 10000);
  }

  //shows Images on Timer for the test variables
  var showTestImage = function()
  { 
    testIndex++
    if (testIndex == stopTest){
      clearInterval(inter)
      console.log(questionLogs)
      sendTestResult()
      //Transition to Testing Phase
      endFirstTest()
      return
    }
    updateContainerImage(src,testIndex)
  }

showScore = function(){
  var score = "score"
  var level = "level"
  //Global So sendTestResult can access
  rightId = 0
  oldTotal = 0
  wrongRej = 0
  newTotal = 0
  for (var i =0;i<questionLogs.questions.length; i++)
  {
    var log = questionLogs.questions[i];
    if(log.correctAnswer == "old")
    {
      oldTotal++;
      if(log.correctAnswer == log.userAnswer)
      {
        rightId++;
      }
    }
    else{
      newTotal++
      if(log.correctAnswer == log.userAnswer)
      {
        wrongRej++;
      }
    }
  }

  $("#score").html(score);
  $("#level").html(level);
  $("#rightId").html(100*rightId/oldTotal);
  $("#wrongRej").html(100*wrongRej/newTotal);
}

// Data Capturing
  var sendTestResult = function(){
    showScore()
    // SLoppy string concatentation.  print out data to see total string
    var serverLogs = "'&testDay='"+testDay+"'&rightId='"+rightId+"'&oldTotal='"+oldTotal;
    serverLogs += "'&wrongRej='"+wrongRej+"'&newTotal='"+newTotal+"'";



    // $.ajax({
    //   type: "GET",
    //   contentType: "application/json; charset=utf-8",
    //   url: "recordTestResult.php",
    //   data: "data='"+JSON.stringify(questionLogs)+serverLogs,
    //   // dataType: "json",
    //   success:function(data)
    //   {
    //     result = jQuery.parseJSON( data );
    //     alert (result)
    //     window.console.log(result);
    //     $("#score").html(result.score)
    //     $("#level").html(result.level)
    //   }
    // });
    $.ajax({
      type: "POST",
     // contentType: "application/json; charset=utf-8",
      url: "recordTestResult.php",
      data: "data='"+JSON.stringify(questionLogs)+serverLogs,
      // dataType: "json",
      success:function(data)
      {
        result = jQuery.parseJSON( data );
        // alert (result)
        window.console.log(result);
        $("#score").html(result.score)
        $("#level").html(result.level)
      }
    });




  }

// End DOCUMENT READY FUNCTION
}