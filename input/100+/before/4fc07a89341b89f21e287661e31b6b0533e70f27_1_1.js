function setup()
{
    var snd_wrong = new Audio("67454__splashdust__negativebeep_edited.wav");
    var snd_right = new Audio("26875__cfork__cf-fx-batch-jingle-glock-n-kloing_edited.wav");
    
    //get ui elements
    var canvas = document.getElementById("canvasShow");
    var canvasDraw = document.getElementById("canvasDraw");
    var txtAnswer = document.getElementById("txtInput");
    var btnTip = document.getElementById("btnTip");
    var btnNext = document.getElementById("btnNext");
    var lblSymbol = document.getElementById("divSymbol");
    var divStatus = document.getElementById("divStatus");
    var divStatistics = document.getElementById("divStatistics");
    //options:
    var chkHiragana = document.getElementById("chkHiragana");
    var chkKatakana = document.getElementById("chkKatakana");
    var chkBase = document.getElementById("chkBase");
    var chkExtended = document.getElementById("chkExtended");
    var chkYoon = document.getElementById("chkYoon");
    
    //setup kana trainer object
    var kanaTrainer = new KanaTrainer(canvas, getKanaData());
    
    //test code
    var painter = new Paint(canvasDraw);
    
    //configure ui elements
    
    btnTip.onclick = function()
    {
        txtAnswer.value = kanaTrainer.tip();
        return true;
    };
    
    btnNext.onclick = function()
    {
        kanaTrainer.next();
        setStats();
        return true;
    };
    
    chkHiragana.checked = true;
    chkKatakana.checked = true;
    chkBase.checked = true;
    chkExtended.checked = true;
    chkYoon.checked = true;
    chkHiragana.onclick = checkBoxHelper("hiragana", chkHiragana);
    chkKatakana.onclick = checkBoxHelper("katakana", chkKatakana);
    chkBase.onclick = checkBoxHelper("base", chkBase);
    chkExtended.onclick = checkBoxHelper("ext", chkExtended);
    chkYoon.onclick = checkBoxHelper("yoon", chkYoon);
    
    txtAnswer.onkeydown = function(event)
    {
        if(event.keyCode == 18)
        {
             btnTip.onclick();
             return false;
        }
    };
    
    txtAnswer.onkeypress = function(event)
    {
        if(!(event.keyCode == 13 || event.charCode == 32))
            return true;
        
        txtAnswer.style.backgroundColor="transparent";
        if(kanaTrainer.validate(txtAnswer.value))
        {
            snd_right.currentTime = 0;
            snd_right.play();
            txtAnswer.value = "";
            kanaTrainer.next();    
            painter.clear();
        }
        else
        {
            snd_wrong.currentTime = 0;
            snd_wrong.play();
            txtAnswer.style.backgroundColor="#ff5656";
        }
        
        setStats();
        
        return false;
    };
    
    function checkBoxHelper(option, checkbox)
    {
        return function()
        {
            kanaTrainer.setOption(option, checkbox.checked);
            kanaTrainer.next();
            setStats();
            return true;
        }
    }
    
    function setStats()
    {
        divStatus.innerHTML = kanaTrainer.getQueuePos() + "/" + kanaTrainer.getQueueSize() + "-" + kanaTrainer.getFaultQueueSize();
        var stats = kanaTrainer.getStatistics();
        divStatistics.innerHTML = "Right: " + stats.right + " Wrong: " + stats.wrong + " Right in Row: " + stats.rightInRow;
    }
    
    //initial
    kanaTrainer.next();
    setStats();
    txtAnswer.focus();
    
    

}