var yyy = document.getElementById('draw');
var ctx = yyy.getContext('2d');
var lineWidth = 3
var circleRadius = 1.5

autosetCanvasSize(yyy)

listenToUser(yyy)

/*********/


var eraserEnabled = false;
pencil.onclick = function () {
    eraserEnabled = false
    pencil.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled = true
    eraser.classList.add('active')
    pencil.classList.remove('active')
}
clear.onclick = function () {
    ctx.clearRect(0, 0, yyy.width, yyy.height)
}
save.onclick = function () {
    var url = yyy.toDataURL("image/png")
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = 'new png'
    a.target = '_blank'
    a.click()
}
black.onclick = function () {
    ctx.fillStyle = 'black'
    ctx.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
red.onclick = function () {
    ctx.fillStyle = 'red'
    ctx.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    yellow.classList.remove('active')
}
green.onclick = function () {
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    yellow.classList.remove('active')
}
yellow.onclick = function () {
    ctx.fillStyle = 'yellow'
    ctx.strokeStyle = 'yellow'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    yellow.classList.add('active')

}

thin.onclick = function () {
    lineWidth = 3
    circleRadius = 1.5
    thin.classList.add('active')
    middle.classList.remove('active')
    thick.classList.remove('active')
}
middle.onclick = function () {
    lineWidth = 6
    circleRadius = 3
    thin.classList.remove('active')
    middle.classList.add('active')
    thick.classList.remove('active')
}
thick.onclick = function () {
    lineWidth = 9
    circleRadius = 4.5
    thin.classList.remove('active')
    middle.classList.remove('active')
    thick.classList.add('active')
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
    ctx.arc(x,y,radius,0,Math.PI*2);
    ctx.fill();
}

function drawLine(x1,y1,x2,y2){

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.closePath();
}



function listenToUser(canvas) {
    var using = false;
    var lastPoint = {x:undefined,y:undefined};

    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (bbb) {
            var x = bbb.touches[0].clientX
            var y = bbb.touches[0].clientY
            using = true
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40)
            }else{
                lastPoint = {x:x,y:y}
            }
        }
        canvas.ontouchmove = function (bbb) {
            var x = bbb.touches[0].clientX
            var y = bbb.touches[0].clientY
            if(!using){return}
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40);
            }else{
                var newPoint = {x:x,y:y};
                drawCircle(x,y,circleRadius);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }
        canvas.ontouchend = function (bbb) {
            using = false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function(aaa){
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled){
                ctx.clearRect(x-20,y-20,40,40)
            }else{
                lastPoint = {x:x,y:y}
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
                drawCircle(x,y,circleRadius);
                drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
                lastPoint = newPoint;
            }
        }

        canvas.onmouseup = function(aaa){
            using = false;
        }
    }
}