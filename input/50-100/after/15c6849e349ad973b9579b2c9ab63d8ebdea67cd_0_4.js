function UITitle(text, x, y){
    function draw(ctx){
        ctx.fillStyle = '#900';
        ctx.font = '100pt "Press Start 2P"';
        ctx.textAlign = 'center'
        ctx.fillText(text, x, y);
    }
    return new UIElement(text, 0, 0, WIDTH, 80, draw);
}