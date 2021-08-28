// Color
function getCookie(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

if (document.cookie != '') {
    var Major = getCookie('Major');
    var Minor = getCookie('Minor');
    var Title = getCookie('Title');
    var AttrCss = document.documentElement.style;
    AttrCss.setProperty('--major', Major);
    AttrCss.setProperty('--minor', Minor);
    AttrCss.setProperty('--title', Title);
    console.log(document.cookie);
}else{
    console.log("no-cookie")
}