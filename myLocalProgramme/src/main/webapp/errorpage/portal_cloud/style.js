var num=6;
function reaction(){
    num--;
    document.getElementById('timer').innerHTML=num;
    if(num<0){
        document.getElementById('timer').innerHTML=0;
        location.href='corpcloud/login.html#/routeSearch';
    }
}
setInterval('reaction()',1000);