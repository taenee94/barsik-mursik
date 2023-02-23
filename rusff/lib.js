/*
    Собтсвенность ZeroParking,
    скрипт не подлежит частичному или полному 
    копированию, распрастранению, модификации.

    Moscow, 2010.
*/
$doc = document;
$id = function (r) { return $doc.getElementById(r) };
$tag = function (r) { return $doc.getElementsByTagName(r); };
$class = function (clsName) {
    var retVal = new Array();
    var elements = $tag("*");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].className.indexOf(" ") >= 0) {
            var classes = elements[i].className.split(" ");
            for (var j = 0; j < classes.length; j++) {
                if (classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if (elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}
$create = function (r) { return $doc.createElement(r); };

$ZP = {
	Forum: {
	   UserLogin: (window["UserLogin"] ? window["UserLogin"] : ''),
	   BoardID: (window["BoardID"] ? window["BoardID"] : null),
	   BoardCat: (window["BoardCat"] ? window["BoardCat"] : null),
	   UserID: (window["UserID"] ? window["UserID"] : -1),
	   UserRegistered: (window["UserRegistered"] ? window["UserRegistered"] : -1),
	   UserRegistred:  (window["UserRegistered"] ? window["UserRegistered"] : -1),
	   GroupID : (window["GroupID"] ? window["GroupID"] : -1)
	},
    
	Func: {
		FirstMsgSticker: true,
		Active: false,
		Share: true,
		MassMail: true,
		Warnings: true,
		Tags: true
	},
	
	Settings: {
		Active: {
			Title: '<a href="/userlist.php">Посетили за сутки</a> '
		},
		Warnings: {
			HideReportButton: false,
			Description: 'Пожалуйста, сделайте краткое описание причины вашего недовольстава этим сообщением.',
			MinLength: 10,
			ShowToModer: false
		}
	},
	
	Utils: {
		TryDecode: function(e) {
			var result;
			try
			{
				result = decodeURIComponent(e);
			}
			catch (err)
			{
				try
				{
					result = unescape(e);
				}
				catch (err2)
				{
					result = e;
				}
			}
			return result;
		}
	}
};

function load(url) {
    script = $doc.createElement('script');
	script.src = url;
	$tag('head')[0].appendChild(script);
}

$load = load;

function GET(){
	var a = location.search.slice(1);
	a = a.split('&')
	var i = 0
	var b = new Object;
	while(a[i]) {
a[i] = a[i].split('=')
b[a[i][0]] = a[i][1];
i++;
	}
	return b
}

function setcookie(a,b,c) {if(c){var d = new Date();d.setTime(d.getTime()+c);}if(a && b) document.cookie = a+'='+b+(c ? '; expires='+d.toUTCString() : '');else return false;}
function getcookie(a) {var b = new RegExp(a+'=([^;]){1,}');var c = b.exec(document.cookie);if(c) c = c[0].split('=');else return false;return c[1] ? c[1] : false;}
function rmcookie(a) {var d = new Date();d.setDate(d.getDate()-900);if(a) document.cookie = a+'=a; expires='+d.toUTCString();else return false;}

$get = GET();

	