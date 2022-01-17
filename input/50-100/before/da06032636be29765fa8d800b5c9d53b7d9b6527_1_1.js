function init(){

    $("canvas").after('<a id="y-gplus" class="inner-tooltip-invoke" title="Find Me on Google+" href="https://plus.google.com/b/101251082499312129098/101251082499312129098/posts"></a>');



    imgYRun.onload=handleImageLoad;

    imgYRun.onerror=handleImageError;

    imgYRun.src="http://cdn.yetanotherwebdesigner.com/images/y-run.png";



    imgYIdle.onload=handleImageLoad;

    imgYIdle.onerror=handleImageError;

    imgYIdle.src="http://cdn.yetanotherwebdesigner.com/images/y-idle.png";

}