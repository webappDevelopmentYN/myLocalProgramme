function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return decodeURI(c.substring(name.length, c.length));
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCzString();
    document.cookie = cname + "=" + encodeURI(cvalue) + "; " + expires + ";path=/";
}
function setTheme(name){
    var baseUrl = 'styles/';
    var themeUrl = baseUrl+name+'.css';
    var themeLink = document.getElementById('theme');
    var themeLinkUrl = themeLink.getAttribute('href');
    themeLink.setAttribute('href',themeLinkUrl);
    themeLink.setAttribute('href',themeUrl);
    setCookie('themeCookie', name, 365);
}
if(getCookie('themeCookie')){
    setTheme(getCookie('themeCookie'));
}