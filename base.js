var str = '/1.html';


// Подключает
function addStyleSheets (href) {
    var $head = document.head,
        $link = document.createElement('link');

    $link.rel = 'stylesheet';
    $link.href = '/BLEACH/style.css';
    $head.appendChild($link);
}

// Отключает 
function disableStyleSheets (href) {
    var styles = document.styleSheets;
    for (i in styles) {
        if (styles[i].href == href) {
            styles[i].disabled = true;
        }
    }
}


var bttn = document.getElementById("BLEACH");