function (el, past) {
        var step = collectCanvasData(el);
        var pastStep = collectCanvasData(past);

        var viewPortScale = parseFloat(Config.ViewPort.stepScale);
        var viewMaxScale = parseFloat(Config.ViewPort.maxScale);
        //zoom out scale
        var scaleReview = (pastStep.scale / 2.0);
        //duration
        var duration = parseInt(Config.ViewPort.transitionDuration);
        var zoomDuration = parseInt(Config.ViewPort.zoomDuration);
        var moveDuration = parseInt(Config.ViewPort.moveDuration)

        //step fn
        var zoomOut = function () {
            $("#camera-move")[0].style.WebkitTransform = "scale(" + scaleReview + ")" + cssTranslate(pastStep.translate);
        }

        var move = function () {
            $("#camera-move")[0].style.WebkitTransform = "scale(" + scaleReview + ")" + cssTranslate(step.translate);   
        }

        var zoomIn = function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssTranslate(step.translate);      
        }

        var rotate = function () {
            $("#camera-move")[0].style.WebkitTransform = cssScale(step.scale) + cssRotate(step.rotate) + cssTranslate(step.translate);
        }
        
        zoomOut();

        setTimeout(function () {
            move();
        }, duration)

        setTimeout(function () {
            zoomIn();
        }, duration * 2);

        setTimeout(function () {
            rotate();
        }, duration * 3);
	}