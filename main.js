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

getwindowSize();

window.onresize(){
    getwindowSize();  
}
function getwindowSize() {   //获取用户窗口尺寸
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    yyy.width = pageWidth;
    yyy.height = pageHeight;
}

function drawCircle(x,y,radius){
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){
    ctx.beginPath();
    ctx.lineWidth = 10;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}



var painting = false;
var lastPoint = {x:undefined,y:undefined};

yyy.onmousedown = function(aaa){
    painting = true;
    var x = aaa.clientX;
    var y = aaa.clientY;
    lastPoint = {x:x,y:y};
    drawCircle(x,y,5);
    drawLine(x,y)
}

yyy.onmousemove = function(aaa){
    if (painting){
        var x = aaa.clientX;
        var y = aaa.clientY;
        var newPoint = {x:x,y:y};
        drawCircle(x,y,5);
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
    }else{

    }
}

yyy.onmouseup = function(aaa){
    painting = false;
}