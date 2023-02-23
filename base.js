// var str = '/1.html';


// // Подключает
// function addStyleSheets (href) {
//     window.location.href='/1.html';
//     var $head = document.head,
//         $link = document.createElement('link');

//     $link.rel = 'stylesheet';
//     $link.href = '/BLEACH/style.css';
//     $head.appendChild($link);
// }

// // Отключает 
// function disableStyleSheets (href) {
//     var styles = document.styleSheets;
//     for (i in styles) {
//         if (styles[i].href == href) {
//             styles[i].disabled = true;
//         }
//     }
// }


var bttn = document.getElementById("BLEACH");
bttn.addEventListener("click", addStyleSheets);

DynCSS = {
    css: [
        { title: 'BLEACH', url: '/BLEACH/style.css' },
        { title: 'Красный', url: '/temp/red/style.css' },
        { title: 'Лайм', url: '/temp/lime/style.css' }
    ],
    id2e: function(id) { return document.getElementById(id); },
    init: function() {
        this.renderOptions();
        var icss = (icss = String(document.cookie).match(/\bdyncss=([^;]*)/)) && icss[1];
        this.setCSS(icss);
    },
    setCSS: function(icss) {
        var s = this.id2e('dynCSSSelect');
        if (!arguments.length) icss = s.value;
        else s.value = this.css[icss = parseInt(icss) || 0] ? icss : 0;
        var css = this.css[icss];
        this.id2e('dynCSS').href = css.url;
        var d = new Date();
        d.setFullYear(d.getFullYear() + 1);
        document.cookie = ['dyncss=', icss, ';expires=', d.toGMTString(), ';path=/;'].join('');
        return this;
    },
    renderOptions: function() {
        for (var i = 0, s = this.id2e('dynCSSSelect'); i < this.css.length; ++i)
            s.options.add(new Option(this.css[i].title, i));
    }
};