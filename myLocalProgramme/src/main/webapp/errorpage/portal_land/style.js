var num=6;
function reaction(){
    num--;
    document.getElementById('timer').innerHTML=num;
    if(num<0){
        document.getElementById('timer').innerHTML=0;
        location.href='/corpland/index#/site/home';
    }
}
setInterval('reaction()',1000);