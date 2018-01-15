/**
 * Created by yineng on 2017/2/16.
 */
$(document).ready(function(){
  $('#button').click(function(){
    //console.log('124');
    $.ajax({
      type:"GET",
      url:"ztree.json",
      dataType:"json",
      success:function(data){
        console.log('1234');
        var song="<ul>";
        //i表示在data中的索引位置，n表示包含的信息的对象
        $.each(data,function(i,n){
          //获取对象中属性为optionsValue的值
          song+="<li>"+n["optionValue"]+"</li>";
        });
        song+="</ul>";
        $('#result').append(song);
      }
    });
    return false;
  });
});
