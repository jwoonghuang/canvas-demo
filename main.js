/* var div = document.getElementById('canvas')

var painting = false

//鼠标点击
div.onmousedown = function (a) {
    painting= true
    var x = a.clientX
    var y = a.clientY
    var divA = document.createElement('div')
    divA.style = 'width: 6px; height: 6px;'+
        'border-radius: 3px; background: pink; position: absolute;'+ 'left: '+(x-3)+'px; top: '+(y-3)+'px;'
    div.appendChild(divA)
}


//鼠标移动
div.onmousemove = function (a) {
    if (painting){
        var x = a.clientX
        var y = a.clientY
        var divA = document.createElement('div')
        divA.style = 'width: 6px; height: 6px;'+
            'border-radius: 3px; background: pink; position: absolute;'+ 'left: '+(x-3)+'px; top: '+(y-3)+'px;'
        div.appendChild(divA)
    }else {

    }

}

//鼠标松开
div.onmouseup = function (a) {
 painting = false
}
*/

var yyy = document.getElementById('draw');
var ctx = yyy.getContext('2d');

autosetCanvasSize(yyy)

listenToMouse(yyy)

/*********/


var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = 'actions x'
}
brush.onclick = function () {
    eraserEnabled = false;
    actions.className = 'actions'
}

/********/

function autosetCanvasSize(canvas) {
    setcanvasSize();

    window.onresize = function () {
        setcanvasSize();
    };
    function setcanvasSize() {   //获取用户窗口尺寸
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.fillStyle = '#512e47';
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){

    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#512e47'
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}

function listenToMouse(canvas) {
    var using = false;
    var lastPoint = {x:undefined,y:undefined};

    canvas.onmousedown = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;
        using = true;
        if (eraserEnabled){
            ctx.clearRect(x-20,y-20,40,40);
        }else{
            lastPoint = {x:x,y:y};
        }
    }

    canvas.onmousemove = function(aaa){
        var x = aaa.clientX;
        var y = aaa.clientY;
        if(!using){return}
        if (eraserEnabled){
            ctx.clearRect(x-20,y-20,40,40);
        }else{
            var newPoint = {x:x,y:y};
            drawCircle(x,y,5);
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
            lastPoint = newPoint;
            }
    }

    canvas.onmouseup = function(aaa){
        using = false;
    }
}