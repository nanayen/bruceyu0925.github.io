window.onload = function () {
    setEvent();
}

function setEvent() {
    window.onscroll = doScroll;
}

function width() {
    document.body.clientWidth;
}

function doScroll(e) {

    var dY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        items,
        aniObj = {
            fadeIn: [
                'js-fadeIn-normal',
                'js-fadeIn-top',
                'js-fadeIn-right',
                'js-fadeIn-bottom',
                'js-fadeIn-left'
            ],
        };

    for (var types in aniObj) {
        for (var i = 0; i < aniObj[types].length; i++) {
            items = document.querySelectorAll('.' + aniObj[types][i]);
            for (var j = 0; j < items.length; j++) {
                if (dY > items[j].offsetTop - this.innerHeight / 4 * 3) {
                    if (items[j].className.indexOf('--active') < 0) {
                        items[j].className += ' ' + aniObj[types][i] + '--active';
                    }
                }
            }
        }
    }

}