/**
 * Created by wuhaiying on 2016/9/7.
 */
/*获取popover相关盒子的宽度和高度,并声明变量*/
var popoverParentHeight=$('.w-popover-wrap').outerHeight();/*popover's parent's height*/
var popoverParentWidth=$('.w-popover-wrap').outerWidth(); /*popover's parent's width*/
var popoverHeight=$('.w-popover-wrap .w-popover').outerHeight(); /*popover's height*/
var popoverWidth=$('.w-popover-wrap .w-popover').outerWidth(); /*popover's width*/

/*获取popover's parent盒子距浏览器各边的距离,并声明变量*/
var boxLeft=$('.horizontal.left').offset().left;/*left*/
var boxRight=$(window).width()-$('.horizontal.right').offset().left-popoverParentWidth;/*right*/
var boxTop=$('.vertical.top').offset().top;/*top*/
var boxBottom=$(window).height()-$('.vertical.bottom').offset().top-popoverParentHeight;/*bottom*/

/*popover各个方位位置的调整*/
/*left*/
$('#popoverLeft .w-popover').css({'margin-left':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
/*right*/
$('#popoverRight .w-popover').css({'margin-right':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
/*top*/
$('#popoverTop .w-popover').css({'margin-left':-popoverWidth/2,'margin-top':-popoverHeight});
/*bottom*/
$('#popoverBottom .w-popover').css({'margin-left':-popoverWidth/2,'margin-bottom':-popoverHeight});

/*popover的鼠标hover事件*/
//$('.w-popover-wrap').mouseover(function(){
//    /*判断popover's的大小会不会超过浏览器的宽高，根据宽高显示不同位置*/
//    /*悬浮框在左侧*/
//    if(boxLeft < popoverWidth){
//        $('#popoverLeft').removeClass('left');
//        $('#popoverLeft').addClass('right');
//        $('#popoverLeft .w-popover').removeClass('left');
//        $('#popoverLeft .w-popover').addClass('right');
//        $('#popoverLeft .w-popover').css({'margin-right':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
//    }else{
//        $('#popoverLeft').removeClass('right');
//        $('#popoverLeft').addClass('left');
//        $('#popoverLeft .w-popover').removeClass('right');
//        $('#popoverLeft .w-popover').addClass('left');
//        $('#popoverLeft .w-popover').css({'margin-left':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
//    }
//    /*悬浮框在右侧*/
//    if(boxRight < popoverWidth){
//        $('#popoverRight').removeClass('right');
//        $('#popoverRight').addClass('left');
//        $('#popoverRight .w-popover').removeClass('right');
//        $('#popoverRight .w-popover').addClass('left');
//        $('#popoverRight .w-popover').css({'margin-left':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
//    }else{
//        $('#popoverRight').removeClass('left');
//        $('#popoverRight').addClass('right');
//        $('#popoverRight .w-popover').removeClass('left');
//        $('#popoverRight .w-popover').addClass('right');
//        $('#popoverRight .w-popover').css({'margin-right':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
//    }
//    /*悬浮框在顶部*/
//    if(boxTop < popoverHeight){
//        $('#popoverTop').removeClass('top');
//        $('#popoverTop').addClass('bottom');
//        $('#popoverTop .w-popover').removeClass('top');
//        $('#popoverTop .w-popover').addClass('bottom');
//        $('#popoverTop .w-popover').css({'margin-left':-popoverWidth/2,'margin-bottom':-popoverHeight});
//    }else{
//        $('#popoverTop').removeClass('bottom');
//        $('#popoverTop').addClass('top');
//        $('#popoverTop .w-popover').removeClass('bottom');
//        $('#popoverTop .w-popover').addClass('top');
//        $('#popoverTop .w-popover').css({'margin-left':-popoverWidth/2,'margin-top':-popoverHeight});
//    }
//    /*悬浮框在底部*/
//    if(boxBottom < popoverHeight){
//        $('#popoverBottom').removeClass('bottom');
//        $('#popoverBottom').addClass('top');
//        $('#popoverBottom .w-popover').removeClass('bottom');
//        $('#popoverBottom .w-popover').addClass('top');
//        $('#popoverBottom .w-popover').css({'margin-left':-popoverWidth/2,'margin-top':-popoverHeight});
//    }else{
//        $('#popoverBottom').removeClass('top');
//        $('#popoverBottom').addClass('bottom');
//        $('#popoverBottom .w-popover').removeClass('top');
//        $('#popoverBottom .w-popover').addClass('bottom');
//        $('#popoverBottom .w-popover').css({'margin-left':-popoverWidth/2,'margin-bottom':-popoverHeight});
//    }
//});
$('#popoverLeft').mouseover(function(){
    /*判断popover's的大小会不会超过浏览器的宽高，根据宽高显示不同位置*/
    /*悬浮框在左侧*/
    if(boxLeft < popoverWidth){
        $('#popoverLeft').removeClass('left');
        $('#popoverLeft').addClass('right');
        $('#popoverLeft .w-popover').removeClass('left');
        $('#popoverLeft .w-popover').addClass('right');
        $('#popoverLeft .w-popover').css({'margin-right':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
    }else{
        $('#popoverLeft').removeClass('right');
        $('#popoverLeft').addClass('left');
        $('#popoverLeft .w-popover').removeClass('right');
        $('#popoverLeft .w-popover').addClass('left');
        $('#popoverLeft .w-popover').css({'margin-left':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
    }



});
$('#popoverRight').mouseover(function(){
    /*悬浮框在右侧*/
    if(boxRight < popoverWidth){
        $('#popoverRight').removeClass('right');
        $('#popoverRight').addClass('left');
        $('#popoverRight .w-popover').removeClass('right');
        $('#popoverRight .w-popover').addClass('left');
        $('#popoverRight .w-popover').css({'margin-left':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
    }else{
        $('#popoverRight').removeClass('left');
        $('#popoverRight').addClass('right');
        $('#popoverRight .w-popover').removeClass('left');
        $('#popoverRight .w-popover').addClass('right');
        $('#popoverRight .w-popover').css({'margin-right':-(popoverWidth+11),'margin-top':-(popoverHeight/2 + 5.5)});
    }
});
$('#popoverTop').mouseover(function(){
    /*悬浮框在顶部*/
    if(boxTop < popoverHeight){
        $('#popoverTop').removeClass('top');
        $('#popoverTop').addClass('bottom');
        $('#popoverTop .w-popover').removeClass('top');
        $('#popoverTop .w-popover').addClass('bottom');
        $('#popoverTop .w-popover').css({'margin-left':-popoverWidth/2,'margin-bottom':-popoverHeight});
    }else{
        $('#popoverTop').removeClass('bottom');
        $('#popoverTop').addClass('top');
        $('#popoverTop .w-popover').removeClass('bottom');
        $('#popoverTop .w-popover').addClass('top');
        $('#popoverTop .w-popover').css({'margin-left':-popoverWidth/2,'margin-top':-popoverHeight});
    }
});
$('#popoverBottom').mouseover(function(){
    /*悬浮框在底部*/
    if(boxBottom < popoverHeight){
        $('#popoverBottom').removeClass('bottom');
        $('#popoverBottom').addClass('top');
        $('#popoverBottom .w-popover').removeClass('bottom');
        $('#popoverBottom .w-popover').addClass('top');
        $('#popoverBottom .w-popover').css({'margin-left':-popoverWidth/2,'margin-top':-popoverHeight});
    }else{
        $('#popoverBottom').removeClass('top');
        $('#popoverBottom').addClass('bottom');
        $('#popoverBottom .w-popover').removeClass('top');
        $('#popoverBottom .w-popover').addClass('bottom');
        $('#popoverBottom .w-popover').css({'margin-left':-popoverWidth/2,'margin-bottom':-popoverHeight});
    }
});
