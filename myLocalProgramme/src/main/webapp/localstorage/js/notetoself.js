/*created by wuhaiying in 2016/07/27*/
/*localStorage practice begin*/
//    localStorage.setItem('stick_0',"it's time to go home");
//    localStorage.setItem('stick_1',"right,let's go together");
//    localStorage.setItem('stick_2',"no,i'd love to ,but i have to work late");
//    console.log(localStorage.length);
//    var array=[];
//    for(var i= 0; i < localStorage.length; i++){
//        var key=localStorage.key(i);//key���������localStorage�и���������ļ�
//        //console.log(key);
//        var value=localStorage[key];
//        //console.log(value);
//        array[i]=value;
//    }
//    console.log(array);
/*localStorage practice end*/


/*notetoself begin*/
/*ҳ�����ʱ��������init����*/
localStorage.setItem('sticky_0',"it's time to go home");
localStorage.setItem('sticky_1',"right,let's go together");
var date = new Date();
var time = date.getTime();
console.log(time);
window.onload=init;
/*初始化*/
//var stickiesList=document.getElementById('stickies').find('li');
//stickiesList.onclick=deleteSticky;
function init(){
    var button = document.getElementById('add_button');
    var stickiesArray=getStickiesArray();
    button.onclick=createSticky;
    for(var i = 0 ; i < stickiesArray.length; i++){
        var key = stickiesArray[i];
        var value = JSON.parse(localStorage[key]);
        addStickyToDOM(key,value);
    }
}

/*创建一个唯一的即时贴key*/
function createSticky(){
    var stickiesArray = getStickiesArray();
    var currentDate = new Date();
    var time = currentDate.getTime();
    /*获取所选择的颜色选项的值*/
    var colorSelectObj = document.getElementById('note_color');
    var index = colorSelectObj.selectedIndex;
    var color = colorSelectObj[index].value;

    var value = document.getElementById('note_text').value;
    var key = 'sticky_' + time;
    /*根据颜色创建对象，且包含两个属性（文本和用户选择的颜色）*/
    var stickyObj = {
        'value': value,
        'color': color
    };

    localStorage.setItem(key, JSON.stringify(stickyObj));
    stickiesArray.push(key);
    localStorage.setItem('stickiesArray',JSON.stringify(stickiesArray));/*存储数组并转换为串*/
    addStickyToDOM(key,stickyObj);
}

/*获取即时贴数组*/
function getStickiesArray(){
    var stickiesArray = localStorage.getItem('stickiesArray');
    if(!stickiesArray){
        stickiesArray=[];
        localStorage.setItem('stickiesArray',JSON.stringify(stickiesArray));/*存储数组并转换为串*/
    }else{
        stickiesArray=JSON.parse(stickiesArray);/*解析数组*/
    }
    return stickiesArray;
}

/*添加即时贴到页面中*/
function addStickyToDOM(key,stickObj){
    var stickies=document.getElementById('stickies');
    var sticky=document.createElement('li');
    sticky.setAttribute('id',key);
    /*将stickyObj的颜色赋给li*/
    sticky.style.backgroundColor = stickObj.color;

    var span=document.createElement('span');
    span.setAttribute('class','sticky');
    span.innerHTML=stickObj.value;
    sticky.appendChild(span);
    stickies.appendChild(sticky);
    sticky.onclick=deleteSticky;
}
/*删除一个即时贴*/
function deleteSticky(e){
    var key = e.target.id;
    if(e.target.tagName.toLowerCase() == 'span'){
        key = e.target.parentNode.id;
    }
    localStorage.removeItem(key);
    var stickiesArray=getStickiesArray();/*获取数组*/
    for (var i = 0; i< stickiesArray.length;i++){
        if(key == stickiesArray[i]){
            stickiesArray.splice(i,1);
        }
    }
    localStorage.setItem('stickiesArray',JSON.stringify(stickiesArray));/*删除数组后重新存储即时贴数组*/
    removeStickyFromDOM(key);/*从页面删除包含这个li的即时贴*/
}
function removeStickyFromDOM(key){
    var sticky = document.getElementById(key);
    sticky.parentNode.removeChild(sticky);
}

/*让浏览器的存储发挥到最大极致*/
//localStorage.setItem('fuse','-');
//while(true){
//    var fuse = localStorage.getItem('fuse');
//    try{
//        localStorage.setItem('fuse', fuse + fuse);
//    }catch(e){
//        alert('Your browser blew up at' + fuse.length + 'with exception:' + e);
//        break
//    }
//}


/*notetoself end*/
