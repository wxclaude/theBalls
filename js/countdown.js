/**
 * Created by Allen on 2016/3/17.
 */
var WINDOW_WIDTH=1000;
var WINDOW_HEIGHT=500;
var R=8;
var MARGIN_LEFT=20;
var MARGIN_TOP=20;
var endTime=new Date();
endTime.setTime(endTime.getTime()+3600000);
var curTimeSecond=0;
var balls=[];
const colors= ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
window.onload=function(){
    var canvas=document.getElementById("canvas");
    var context=canvas.getContext("2d");
    canvas.width=WINDOW_WIDTH;
    canvas.height=WINDOW_HEIGHT;
    curTimeSecond=getCurrentShowTimeSeconds();
    setInterval(
        function(){
            render(context);
            update();
    },50);
};
function getCurrentShowTimeSeconds(){
    var curTime=new Date();
    var ret=endTime.getTime()-curTime.getTime();
    ret=Math.round(ret/1000);
    return ret>0?ret:0;
}
function render(cx){
    cx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hour=parseInt(curTimeSecond/3600);
    var minute=parseInt((curTimeSecond-hour*3600)/60);
    var second=curTimeSecond%60;
    renderdig(MARGIN_LEFT,MARGIN_TOP,parseInt(hour/10),cx);
    renderdig(MARGIN_LEFT+15*(R+1),MARGIN_TOP,hour%10,cx);
    renderdig(MARGIN_LEFT+30*(R+1),MARGIN_TOP,10,cx);
    renderdig(MARGIN_LEFT+39*(R+1),MARGIN_TOP,parseInt(minute/10),cx);
    renderdig(MARGIN_LEFT+54*(R+1),MARGIN_TOP,minute%10,cx);
    renderdig(MARGIN_LEFT+69*(R+1),MARGIN_TOP,10,cx);
    renderdig(MARGIN_LEFT+78*(R+1),MARGIN_TOP,parseInt(second/10),cx);
    renderdig(MARGIN_LEFT+93*(R+1),MARGIN_TOP,second%10,cx);

    for (var i= 0;i<balls.length;i++){
        cx.fillStyle=balls[i].color;
        cx.beginPath();
        cx.arc(balls[i].x,balls[i].y,R,0,2*Math.PI,true);
        cx.closePath();
        cx.fill();
    }
}

function renderdig(x,y,num,cx){
    cx.fillStyle="blue";
    var todrawnum=dig[num];
    for(var i=0;i<todrawnum.length;i++){
        for(var j=0;j<todrawnum[i].length;j++){
            if (todrawnum[i][j]!=0){
                cx.beginPath();
                cx.arc(x+(2*j+1)*(R+1),y+(2*i+1)*(R+1),R,0,2*Math.PI);
                cx.closePath();
                cx.fill();
            }
        }
    }
}
function update(){
    var nextShowTimeSecond= getCurrentShowTimeSeconds();

    var nexthour=parseInt(nextShowTimeSecond/3600);
    var nextminute=parseInt((nextShowTimeSecond-nexthour*3600)/60);
    var nextSecond=nextShowTimeSecond%60;
    var curhour=parseInt(curTimeSecond/3600);
    var curminute=parseInt((curTimeSecond-curhour*3600)/60);
    var curSecond=curTimeSecond%60;

    if (nextSecond!=curSecond){
        if (parseInt(nexthour/10)!=parseInt(curhour/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curhour/10))
        }
        if (nexthour%10!=curhour%10){
            addBalls(MARGIN_LEFT+15*(R+1),MARGIN_TOP,curhour%10)
        }
        if (parseInt(nextminute/10)!=parseInt(curminute/10)){
            addBalls(MARGIN_LEFT+39*(R+1),MARGIN_TOP,parseInt(curminute/10))
        }
        if (nextminute%10!=curminute%10){
            addBalls(MARGIN_LEFT+54*(R+1),MARGIN_TOP,curminute%10)
        }
        if (parseInt(nextSecond/10)!=parseInt(curSecond/10)){
            addBalls(MARGIN_LEFT+78*(R+1),MARGIN_TOP,parseInt(curSecond/10))
        }
        if (nextSecond%10!=curSecond%10){
            addBalls(MARGIN_LEFT+93*(R+1),MARGIN_TOP,curSecond%10)
        }
        curTimeSecond=nextShowTimeSecond;
    }
    updateBalls();
}

function updateBalls(){
    for (var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i].y>=WINDOW_HEIGHT-R){
            balls[i].y=WINDOW_HEIGHT-R;
            balls[i].vy= - balls[i].vy*0.75;
        }
        if (balls[i].x>=WINDOW_WIDTH-R){
            balls[i].x=WINDOW_WIDTH-R;
            balls[i].vx=-balls[i].vx;
        }
    }

    var cnt=0;
    for (var i=0;i<balls.length;i++){
        if (balls[i].x+R>0){
            balls[cnt++]=balls[i]
        }
    }
    while (balls.length>cnt){
        balls.pop();
    }
}
function addBalls(x,y,num){
    for(var i=0;i<dig[num].length;i++){
        for(var j=0;j<dig[num][i].length;j++){
            if (dig[num][i][j]!=0){
                var aBall={
                    x:x+(2*j+1)*(R+1),
                    y:y+(2*i+1)*(R+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                }

                balls.push(aBall);
            }
        }
    }
}