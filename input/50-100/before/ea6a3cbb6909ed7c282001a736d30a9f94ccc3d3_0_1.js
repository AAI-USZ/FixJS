function doNextStep()
{
    if (typeof(currentStep) == "undefined")
        currentStep = 0;

    if (currentStep < todo.length)
        setTimeout(function () { todo[currentStep++](); }, 0);
    else if (currentStep++ == todo.length)
        setTimeout(function () { finishJSTest(); }, 0);
}