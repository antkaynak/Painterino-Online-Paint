
var active = false;
var color = "#000000";
var size = 1;
var temporaryStorage = [];
var mouse = {x: 0, y: 0};
var exmouse = {x: 0, y: 0};
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

$(document).ready(function(){

    $('#canvas').width($('#canvasDiv').css('width'));
    $('#canvas').height($('#canvasDiv').css('height'));

    //On window resize change canvas width and height.
    //It will scale automatically with this way.
    $(window).on('resize',function(){
        $('#canvas').width($('#canvasDiv').css('width'));
        $('#canvas').height($('#canvasDiv').css('height'));
        reCanvasPaint();
    });

    $('#sizerange').on('change',function(){
        size = $('#sizerange').val();
    });

    $('#clearbtn').on('click',function(e) {
        canvasClear(ctx);
    });

    $('#exitbtn').on('click', function (e) {
        window.location.href = "/";
    });

    //Downloading canvas does not work with Jquery so I used native JS.
    document.getElementById('download').addEventListener('click', function() {
        downloadCanvas(this, 'canvas', 'painterino.png');
    }, false);

    canvas.addEventListener('mousedown', mousedown, false);
    canvas.addEventListener('mousemove', mousemove, false);
    canvas.addEventListener('mouseup', mouseup, false);
    canvas.addEventListener('mouseleave', mouseleave, false);
    //Touch events are for the mobile support.
    canvas.addEventListener('touchstart', touchdown, false);
    canvas.addEventListener('touchmove', touchmove, false);
    canvas.addEventListener('touchend', touchup, false);

});

function mousedown(){
    active = true;
    var xy = getMousePos();
    canvasPaint(xy.x, xy.y ,"mousedown");
    temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousedown");
}

function mousemove(e){
    if(active){
        var xy = getMousePos(e);
        canvasPaint(xy.x, xy.y ,"mousemove");
        temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousemove");
    }
}

function mouseup(){
    active = false;
}

function mouseleave(){
    active = false;
}

function touchdown() {
    active = true;
    var xy = getTouchPos();
    canvasPaint(xy.x, xy.y ,"mousedown");
    temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousedown");
    event.preventDefault();
}


function touchmove(e) {
    var xy = getTouchPos(e);
    canvasPaint(xy.x, xy.y ,"mousemove");
    temporaryStorage.push(size+",round,"+color+","+xy.x+","+xy.y+",mousemove");
    event.preventDefault();
}

function touchup() {
    active = false;
    event.preventDefault();
}

function getMousePos(evt) {

    if (!evt){
        var evt = event;
    }
    var rect = document.getElementById('canvas').getBoundingClientRect();
    var X = (evt.clientX - rect.left) / (document.getElementById('canvas').clientWidth / document.getElementById('canvas').width);
    var Y = (evt.clientY - rect.top) / (document.getElementById('canvas').clientHeight / document.getElementById('canvas').height);
    X = Math.ceil(X);
    Y = Math.ceil(Y);
    return {
        x: X,
        y: Y
    };
}


function getTouchPos(evt) {
    if (!evt){
        var evt = event;
    }
    if(evt.touches) {
        if (evt.touches.length == 1) {
            var touch = evt.touches[0];
            var rect = document.getElementById('canvas').getBoundingClientRect();
            var touchX = (touch.clientX - rect.left) / (document.getElementById('canvas').clientWidth / document.getElementById('canvas').width);
            var touchY = (touch.clientY - rect.top) / (document.getElementById('canvas').clientHeight / document.getElementById('canvas').height);
            touchX = Math.ceil(touchX);
            touchY = Math.ceil(touchY);
            return {
                x: touchX,
                y: touchY
            };
        }
    }

}



function canvasFill(ctx){
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.closePath();
}

function canvasClear(ctx){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.closePath();

}


function canvasPaint(x,y,drag){
    if(drag == "mousemove"){
        ctx.moveTo(exmouse.x, exmouse.y);
    }else{
        ctx.moveTo(x - 1 , y);
    }
    ctx.lineTo(x, y );
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.stroke();
    ctx.beginPath();
    ctx.closePath();
    exmouse.x = x;
    exmouse.y = y;
}

function reCanvasPaint(){

    canvasFill(ctx);


    for(var i=0; i < Object.keys(temporaryStorage).length; i++){
        var temp = temporaryStorage[i].split(',');
        if( temp[5] == "mousemove" && i != 0){
            var temp2 = data[i-1].split(',');
            ctx.moveTo(temp2[3], temp2[4]);
        }
        else{
            ctx.moveTo(temp[3] - 1, temp[4]);
        }

        ctx.lineTo(temp[3], temp[4]);

        ctx.closePath();
        ctx.strokeStyle = temp[2];
        ctx.lineWidth = temp[0];
        ctx.stroke();
        ctx.beginPath();
        ctx.closePath();
    }


}

function downloadCanvas(link, canvasId, filename) {
    link.href = document.getElementById(canvasId).toDataURL();
    link.download = filename;
}


function update(jscolor){
    color = '#' + jscolor;
}

