/****************************************************
 * Bookmarks in posts
 * Author: Alex_63
 * Date: 20.05.2016 / 28.08.2017
 ****************************************************/

FORUM.isDifferentHostname = false;
try {
	self.document.location.hostname == top.document.location.hostname
} catch (e) {
	FORUM.isDifferentHostname = true
}
if (self == top || self.parent == top && FORUM.isDifferentHostname)(function() {
	delete FORUM.isDifferentHostname;
	FORUM.bookmarks = {};
	FORUM.bookmarks.mode = 2;
	var lang_obj = {
		'Внимание! Отменить это действие будет невозможно.' : {en: 'Attention! After removal, you can not undo this action.'},
		'Чтобы поставить закладку, дважды кликните по нужному месту в тексте поста, а затем еще раз по серому маркеру' : {en: 'To place a bookmark, double-click on the desired location in the post, and then again on the gray marker'},
		'Закладок пока нет' : {en: 'No bookmarks yet'},
		'Максимальное количество сохраненных закладок' : {en: 'The maximum number of saved bookmarks'},
		'Вы действительно хотите удалить закладку' : {en: 'Are you sure you want to delete the bookmark'},
		'Подтвердить вставку закладки' : {en: 'Confirm adding a bookmark'},
		'Удалить все сохраненные закладки?' : {en: 'Delete all stored bookmarks?'},
		'Список закладок' : {en: 'My Bookmarks'},
		'Редактировать закладку' : {en: 'Edit bookmark'},
		'Скрыть редактирование' : {en: 'Close edit'},
		'Удалить закладку' : {en: 'Delete bookmark'},
		'Тема' : {en: 'Topic'},
		'Форум' : {en: 'Forum'},
		'Описание' : {en: 'Description'},
		'Сохранить' : {en: 'Save'},
		'Мои закладки' : {en: 'My Bookmarks'},
		'Свернуть' : {en: 'Minimize'},
		'Вверх' : {en: 'Upward'},
		'Вниз' : {en: 'Downward'},
		'От' : {en: 'At'}
	}, 
		lang = $('html')[0].lang;
	function _(text) {
		return (lang == 'ru' || !(lang_obj[text] && lang_obj[text][lang])) ? text : lang_obj[text][lang]
	}

	$(document).on("keydown", function(l) {
		if (l.ctrlKey && l.altKey && l.keyCode == 123) {
			try {
				var h = JSON.parse($.ajax({
					url: "/api.php?method=storage.get&key=bookmarks",
					async: false,
					cache: false
				}).responseText);
				var g = /&quot;/g,
					f = "#QUOT#",
					d = /&apos;/g,
					c = "#APOS#",
					b = /#QUOT#/g,
					y = "&quot;",
					j = /#APOS#/g,
					i = "&apos;";
				if (h.response) {
					h = $("<obj>" + (h.response.storage.data.bookmarks).replace(g, f).replace(d, c) + "</obj>").text().replace(b, y).replace(j, i)
				}
				var a = prompt(_("Удалить все сохраненные закладки?") + "\n" + _("Внимание! Отменить это действие будет невозможно."), h);
				if (a) {
					$.post("/api.php", {
						method: "storage.delete",
						token: ForumAPITicket,
						key: "bookmarks"
					}, function(m) {
						setTimeout(function() {
							window.location.reload()
						}, 1000)
					}, "json");
					$.post("/api.php", {
						method: "storage.delete",
						token: ForumAPITicket,
						key: "data_bookmarks"
					}, "json");
					localStorage.removeItem("MyBookmarksS");
					localStorage.removeItem("data-Bookmarks");
					$deleteCookie("thisUserID")
				}
			} catch (l) {
				console.error("Caught " + l)
			}
		}
	});
	if (GroupID != 3 && window.localStorage && navigator.cookieEnabled) {
		$(document).pun_mainReady(function() {
			function s() { /*==|||==;
.post .bookmark {
	width: 30px;
	height: 16px;
	position: absolute;
	color: #e23b3d;
	background: currentColor;
	opacity: .8;
	transition: .1s ease;
	right: -3px;
	z-index: 999
}
.post .bookmark:hover {
	opacity: 1.0
}
.post .bookmark:before {
	content: "";
	display: block;
	position: absolute;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 8px 0 8px 10px;
	border-color: currentColor transparent;
	left: -10px
}
.post .bookmark.ncnfrm {
	color: #959595
}
#BookmCntToggle {
	position: fixed;
	top: 10px;
	left: 10px;
	width: 30px;
	height: 30px;
	opacity: .7;
	cursor: pointer;
	z-index: 3;
	transition: opacity .3s ease-out
}
#BookmCntToggle:hover {
	opacity: 1.0
}
#BookmCntToggle.default-style {
	background: #F7F7F7;
	border-left: solid 5px currentColor;
	box-shadow: 0 0 6px rgba(0,0,0,.42);
	color: #E41818;
	display: block;
	height: 26px;
	width: 21px;
}
#BookmCntToggle.default-style:before {
	background: currentColor;
	content: "";
	display: block;
	height: 10px;
	margin-left: 3px;
	width: 8px;
}
#BookmCntToggle.default-style:after {
	border-color: transparent currentColor;
	border-style: solid;
	border-width: 0 4px 6px;
	content: "";
	display: block;
	height: 0;
	left: 3px;
	position: absolute;
	top: 10px;
	width: 0;
}
.post-box {
	position: relative;
	overflow: visible !important
}
.editBookmark {
	position: absolute;
	z-index: 999999;
	right: -5px;
	top: 30px;
	box-shadow: 0 0 15px rgba(0,0,0,.5);
	border-radius: 4px
}
.editBookmark h2 {
	border-radius: 4px 4px 0 0
}
.editBookmark .container {
	padding: .6em .9em !important;
	text-align: center;
	border-radius: 0 0 4px 4px
}
.editBookmark h1 {
	max-width: 34em;
	border-radius: 4px 4px 0 0
}
span.delBookmark {
	float: right;
	cursor: pointer;
	font-size: 1.2em !important;
	line-height: 1em;
	background: none transparent !important;
	border: none 0 transparent !important;
	padding: 0 !important
}
.editBookmark .inputfield {
	font-weight: 700
}
.editBookmark .inputfield .button {
	margin-left: 5px
}
#MyBookmarks {
	display: none;
	position: fixed;
	z-index: 101;
	left: 0;
	top: 0;
	right: 0;
	height: 100%;
	box-shadow: 0 0 20px rgba(0,0,0,.5);
	width: 240px
}
#MyBookmarks h2,
#MyBookmarks h1 {
	padding-left: 1em;
	padding-right: 1em;
	text-align: left !important
}
#MyBookmarks h2,
#MyBookmarks h1,
.editBookmark h2 {
	position: relative;
	width: auto;
	z-index: 9999999
}
#MyBookmarks inner {
	height: 9999px;
	position: relative;
	border-color: inherit;
	padding-top: 1.9em;
	display: block
}
#MyBookmarks .container {
	position: relative !important;
	height: 100%!important;
	padding: 0 1em
}
#MyBookmarks .deS {
	display: block;
	top: 0 !important;
	text-align: center
}
#MyBookmarks .deS:after {
	content: "#$3#";
	display: block;
	font-size: .8em;
	margin-top: 1em
}
#MyBookmarks li.BookmarkL {
	position: relative;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: rgba(0,0,0,.1);
}
#MyBookmarks li>span {
	display: block;
	padding: 0 1em;
	margin: 0 -1em;
	cursor: pointer
}
#MyBookmarks li.BookmarkL>span>a {
	padding: .5em 0 .5em 2.2em;
	display: block;
	z-index: 9;
	position: relative
}
#MyBookmarks li.BookmarkL>span.last_click {
	background: rgba(255,0,0,.08);
	box-shadow: 0px 0px 8px rgba(255,0,0,.16);
}
#MyBookmarks li.BookmarkL>span>dd {
	position: absolute;
	width: 240px;
	top: 0;
	left: 240px;
	border-left: solid 5px transparent;
	visibility: hidden;
	opacity: 0;
	transition: all.3s ease;
}
#MyBookmarks li.BookmarkL>span:hover>dd {
	display: block !important;
	visibility: visible;
	opacity: 1;
	margin-left: -1.2em;
	cursor: default
}
#MyBookmarks li.BookmarkL>span em {
	display: block !important;
	background: rgba(0,0,0,.8);
	color: #fff !important;
	z-index: 9999
}
#MyBookmarks em.e1 {
	border-radius: 3px 3px 0 0;
	padding: .5em .7em
}
#MyBookmarks li.BookmarkL em.e1:before {
	content: " ";
	width: 0;
	height: 0;
	position: absolute;
	display: inline-block;
	left: -12px;
	top: 8px;
	border-style: solid;
	border-width: 6px;
	border-color: transparent rgba(0,0,0,.8) transparent transparent;
}
#MyBookmarks li.BookmarkL>span em.e2 {
	border-radius: 0 0 3px 3px;
	padding: .3em .7em .6em
}
#MyBookmarks em a {
	color: #fafafa !important
}
#MyBookmarks em a:hover {
	opacity: .6
}
#MyBookmarks #bm2 {
	cursor: pointer;
	display: inline-block;
	position: absolute;
	padding: 0;
	height: 0;
	width: 0 !important;
	top: 0;
	right: .6em;
	bottom: 0;
	vertical-align: middle;
	background: none transparent;
	text-align: center;
	border-style: solid;
	border-width: .5em .9em .5em 0;
	border-color: transparent currentColor transparent transparent;
}
#MyBookmarks #bm2:after {
	content: "";
	display: block;
	position: absolute;
	width: 2em;
	height: 2em;
	margin: -1em;
	top: 0;
	right: -.3em;
}
#MyBookmarks li span strong {
	float: right;
	cursor: pointer;
	z-index: 99999;
	font-weight: normal;
	color: red;
	padding: .3em;
	margin: 0 -.3em;
	position: relative;
	font-size: 13px;
	font-family: Tahoma, Verdana, Arial;
	line-height: 1.3em
}
#MyBookmarks li num {
	float: left;
	width: 2.2em;
	padding: .5em 0
}
#MyBookmarks span.scrl {
	text-align: center;
	width: 120px;
	cursor: pointer;
	padding-top: 6px;
	z-index: 999;
	background-color: inherit;
	color: green;
	text-shadow: 0 0 6px green;
	font-size: 1.2em;
	line-height: 1.1em
}
#MyBookmarks span.scrl span {
	display: block
}
#MyBookmarks span.scrl span:before {
	content: "^"
}
#MyBookmarks span.scrl.t {
	position: absolute;
	top: 0;
	left: 0;
	box-shadow: 0 0 5px -1px rgba(0, 0, 0, .5)
}
#MyBookmarks span.scrl.b {
	position: absolute;
	top: 0;
	left: 118px;
	box-shadow: 0 0 5px -1px rgba(0, 0, 0, .5)
}
#MyBookmarks span.scrl.b span {
	transform: rotate(180deg);
	transform-origin: 50% 40%
}
.tipsy.bookmark {
	margin-left: -10px;
}
.tipsy.bookmark2 {
	margin-left: .3em;
}
		==|||==;*/ }
			s = "<style>" + (s.toString().split("==|||==;")[1].replace(/#\$3#/gm, _("Чтобы поставить закладку, дважды кликните по нужному месту в тексте поста, а затем еще раз по серому маркеру"))) + "</style>";
			$(s).appendTo("head");

			function y(B) {
				B = B.replace(/"/g, "&quot;").replace(/'/g, "&apos;");
				return B
			}
			var c = ForumAPITicket;
			var A;
			var r;
			var z = "/api.php?method=storage.get&key=bookmarks";
			var u, b, v, ac;
			if ($("#pun-viewtopic").length) {
				u = $('head>link[rel="alternate"]')[0].href.split("id=")[1];
				b = y(FORUM.get("topic.subject").replace(/(‡|†|¤)(.*?)(¤|&a?m?p?;?)/mgi, ""));
				v = FORUM.get("topic.forum_id");
				ac = y(FORUM.get("topic.forum_name").replace(/^#/, ""))
			}

			function i(E) {
				var C = E;
				var H = new Date();
				H.setTime(C);
				var F = H.getFullYear();
				var B = H.getMonth() + 1;
				if (B < 10) {
					B = "0" + B
				}
				var D = H.getDate();
				if (D < 10) {
					D = "0" + D
				}
				var G = H.toTimeString().replace(/ .+$/img, "");
				var I = D + "." + B + "." + F;
				I += " " + G;
				return I
			}

			function j(D, C) {
				var B;
				for (B = 0; B < D.length; B++) {
					if (D[B][0] == C) {
						delete D[B]
					}
				}
			}

			function f(D, C) {
				var B;
				for (var E = 0; E < D.length; E++) {
					if (D[E][0] == C) {
						B = D[E]
					}
				}
				if (B) {
					return B
				} else {
					return null
				}
			}
			FORUM.bookmarks.getBookmarksList = function(K) {
				var F;
				if (localStorage.getItem("MyBookmarksS") && K) {
					F = localStorage.getItem("MyBookmarksS")
				} else {
					try {
						F = JSON.parse($.ajax({
							url: z,
							async: false,
							cache: false
						}).responseText)
					} catch (B) {
						F = "[]";
					}
					var I = /&quot;/g,
						H = "#QUOT#",
						G = /&apos;/g,
						E = "#APOS#",
						D = /#QUOT#/g,
						C = "&quot;",
						L = /#APOS#/g,
						J = "&apos;";
					try {
						F = $("<obj>" + (F.response.storage.data.bookmarks).replace(I, H).replace(G, E) + "</obj>").text().replace(D, C).replace(L, J)
					} catch (B) {
						F = "[]"
					}
				}
				F = F.replace(/\\/g, "").replace(/undefined,?/g, "").replace(/null,?/g, "").replace(/,\]/g, "]");
				localStorage.setItem("MyBookmarksS", F);
				if (F.length < 5 || typeof(F) == "undefined") {
					F = []
				} else {
					try {
						F = JSON.parse(F)
					} catch (B) {
						F = [];
						$.post("/api.php", {
							method: "storage.delete",
							token: c,
							key: "bookmarks"
						});
						localStorage.removeItem("MyBookmarksS")
					}
				}
				return F
			};

			function k(B, K, I, L, C, D, M, E, F) {
				clearTimeout(r);
				if (f(B, K)) {
					if (F == "") {
						j(B, K);
						B.push([K, [I, L, C, D, M, E]])
					} else {
						if (F == true) {
							for (var G = 0; G < B.length; G++) {
								if (B[G][0] == K) {
									var J = B[G][1];
									J[0] = I;
									J[1] = L;
									J[2] = C;
									J[3] = D;
									J[4] = M;
									J[5] = E
								}
							}
						}
					}
				} else {
					j(B, K);
					B.push([K, [I, L, C, D, M, E]])
				}
				var H = JSON.stringify(B).replace(/undefined,?/g, "").replace(/null,?/g, "").replace(/,\]/g, "]");
				localStorage.setItem("MyBookmarksS", H);
				r = setTimeout(function() {
					$.post("/api.php", {
						method: "storage.set",
						token: c,
						key: "bookmarks",
						value: H
					}, "json")
				}, 1200)
			}

			function o(D, B) {
				j(D, B);
				var C = JSON.stringify(D).replace(/undefined,?/g, "").replace(/null,?/g, "").replace(/,\]/g, "]");
				$("#" + B).find(".bookmark").remove();
				$.post("/api.php", {
					method: "storage.set",
					token: c,
					key: "bookmarks",
					value: C
				}, function(E) {
					localStorage.setItem("MyBookmarksS", C)
				}, "json")
			}

			function w(B) {
				$(B).parents(".editBookmark").fadeOut(200, function() {
					$(B).parents(".editBookmark").remove()
				});
				var C = $(B).parents(".post").find(".bookmark");
				C.attr("title", _("Редактировать закладку"));
				if (C.hasClass("hover")) {
					C.mouseleave().mouseenter()
				}
				if (FORUM.bookmarks.touch) setTimeout(function() {
					$(".tipsy.bookmark").remove();
				}, 400);
			}

			function p(C) {
				var E = $("#MyBookmarks li.hidden").length;
				var D = $("#MyBookmarks .last_click").find("a").attr("href");
				if (D) {
					D = D.replace(/^.*#p(\d+)-.*$/g, "$1")
				} else {
					D = "0"
				}
				var B = "none";
				if (!$("#MyBookmarks").hasClass("hide") && $("#MyBookmarks").css("display") == "block") {
					B = "block"
				}
				var G = E;
				if (D) {
					G += ("," + D)
				}
				if (B) {
					G += ("," + B)
				}
				localStorage.setItem("data-Bookmarks", G);
				var F = {
					method: "storage.set",
					token: c,
					key: "data_bookmarks",
					value: G
				};
				if (C) {
					$.post("/api.php", F, function() {
						location.href = C
					}, "json")
				} else {
					clearTimeout(A);
					A = setTimeout(function() {
						$.post("/api.php", F, "json");
					}, 1000)
				}
			}
			FORUM.bookmarks.scrollTop = function() {
				$("li.BookmarkL:visible:not(:last):first").hide().addClass("hidden");
				p()
			};
			FORUM.bookmarks.scrollBottom = function() {
				$("li.BookmarkL:hidden:last").show().removeClass("hidden");
				p()
			};
			var t = $getCookie("thisUserID");
			if (!t || (+t != UserID)) {
				$setCookie("thisUserID", UserID);
				localStorage.removeItem("MyBookmarksS");
				localStorage.removeItem("data-Bookmarks")
			}
			var d = FORUM.bookmarks.getBookmarksList(true);

			function h(F) {
				if ($("#pun-viewtopic").length) {
					for (var G = 0; G < F.length; G++) {
						if (!F[G]) {
							F[G] = []
						}
						var B = F[G][0],
							E, H;
						try {
							E = F[G][1][4];
							H = F[G][1][5]
						} catch (C) {
							E = 50;
							H = ""
						}
						var tL = _("Редактировать закладку");
						if ($("#p" + B).find(".editBookmark").length) {
							tL = _("Скрыть редактирование")
						}
						var I = ' class="bookmark" id="p' + B + '-bookmark"';
						var D = "<span" + I + ' style="top:' + E + 'px" title="' + tL + '" alt="' + H + '">&nbsp;</span>';
						$("#p" + B).find(".post-content").prepend(D);
						$(".bookmark").tipsy({
							live: true,
							fade: true,
							gravity: "e bookmark"
						})
					}
					$(".post:not(:has(.bookmark))").has(".editBookmark").find(".editBookmark").remove()
				}
			}
			h(d);

			function n(L) {
				L = JSON.stringify(L).replace(/undefined,?/g, "").replace(/null,?/g, "").replace(/,\]/g, "]");
				L = L.replace(/&/gm, "&amp;").replace(/</gm, "&lt;").replace(/>/gm, "&gt;").replace(/&amp;quot;/gm, "&quot;").replace(/&amp;apos;/gm, "&apos;");
				L = JSON.parse(L);
				var Z = $("#pun-userlist").length ? "h1" : "h2";
				var C = '<div id="MyBookmarks" style="display:none"><' + Z + '><b id="bm2" style="width:0;margin:auto!important;" title="' + _('Свернуть') + '"></b><span>' + _('Мои закладки') + '</span>';
				C += "</" + Z + "><ul class=container>";
				var D = "</ul></inner></div>",
					E = D;
				for (var R = 0; R < L.length; R++) {
					if (!L[R]) {
						L[R] = []
					}
					try {
						var N = L[R][0],
							O = L[R][1][0],
							M = L[R][1][1],
							B = L[R][1][2],
							P = L[R][1][3],
							U = L[R][1][5],
							F = "";
						F += '<li class=BookmarkL><span><strong title="' + _('Удалить закладку') + '">&#215;</strong><a href="/viewtopic.php?pid=' + N + "#p" + N + '-bookmark">';
						F += U + '</a><dd>';
						F += '<em class="e1">' + _('Тема') + ': <a href="/viewtopic.php?id=' + O + '">' + M + "</a></em>";
						F += '<em class="e2">' + _('Форум') + ': <a href="/viewforum.php?id=' + B + '">' + P + "</a></em></dd></span></li>";
						D = F + D
					} catch (T) {}
				}
				if (D == E) {
					D = '<span class="deS" style="padding:.6em 0!important;">' + _("Закладок пока нет") + '.</span>'
				} else {
					var K = ' onclick="FORUM.bookmarks.scrollTop()"';
					var J = ' onclick="FORUM.bookmarks.scrollBottom()"';
					D = '<span class="scrl t" title="' + _('Вверх') + '" ' + K + '><span></span></span><span class="scrl b" title="' + _('Вниз') + '" ' + J + "><span></span></span><inner>" + D
				}
				C += D;
				var S = "";
				if ($("#MyBookmarks").length) {
					S = $("#MyBookmarks").css("display");
					$("#MyBookmarks").remove()
				}
				$(C).appendTo("#pun-main");
				if (!S) {
					S = "none"
				}
				if (S) {
					$("#MyBookmarks").css({
						display: S,
						width: "240px"
					})
				}
				var I = localStorage.getItem("data-Bookmarks"),
					V, G, Q;
				if (I) {
					I = I.split(",")
				} else {
					I = JSON.parse($.ajax({
						url: "/api.php?method=storage.get&key=data_bookmarks",
						async: false,
						cache: false
					}).responseText);
					if (I.response) {
						I = I.response.storage.data.data_bookmarks;
						I = I.split(",")
					}
				}
				if (!I) {
					I = ["0", "0", "none"]
				}
				V = I[0];
				G = I[1];
				Q = I[2];
				if (G) {
					$('#MyBookmarks li>span>a[href*="?pid=' + G + '#"]').parent().addClass("last_click")
				}
				$("#MyBookmarks li").map(function(W) {
					$(this).children().prepend("<num>" + (W + 1) + ". </num>")
				});
				if ($('#MyBookmarks .deS').length) {
					$("#MyBookmarks").addClass("empty")
				}
				if (V) {
					$("#MyBookmarks li:lt(" + V + ")").hide().addClass("hidden")
				}
				if (Q) {
					$("#MyBookmarks").css("display", Q)
				}
				if ($(".BookmarkL:not(.hidden)").length == 0 && $("#MyBookmarks .deS").length == 0) {
					FORUM.bookmarks.scrollBottom()
				}
				if (localStorage.getItem("data-Bookmarks") === null) {
					p()
				}
				var H = $("#MyBookmarks li").length;
				if (H > 0) {
					$("#MyBookmarks " + Z + ">span:first").append(': <strong style="margin-left:-2px">' + H + "</strong>")
				}
			}
			n(d);
			$("#pun").prepend('<span id="BookmCntToggle" onclick="FORUM.bookmarks.toggleBookmSection();" title="' + _('Список закладок') + '"> &nbsp; </span>');
			if ($("#BookmCntToggle").css("background-image") == "none") $("#BookmCntToggle").addClass("default-style");
			$("#BookmCntToggle,#bm2").tipsy({
				live: true,
				fade: true,
				gravity: "w bookmark2"
			});
			FORUM.bookmarks.toggleBookmSection = function() {
				if ($("#MyBookmarks").css("display") == "none") {
					$("#MyBookmarks").removeClass("hide").show().css("left", "-" + $("#MyBookmarks").width() + "px").animate({
						left: "0px"
					}, 150)
				} else {
					$("#MyBookmarks").addClass("hide").animate({
						left: "-" + $("#MyBookmarks").width() + "px"
					}, 150, function() {
						$("#MyBookmarks").hide()
					})
				}
				p();
				$("#BookmCntToggle,#bm2").mouseleave()
			};
			$("#MyBookmarks #bm2").live("click", function() {
				FORUM.bookmarks.toggleBookmSection()
			});
			var x = false;
			var az = 0;
			var st;
			$(document).on("keydown", function(B) {
				if (B.keyCode == 17) {
					x = true
				}
			}).on("keyup", function(B) {
				if (B.keyCode == 17) {
					x = false;
					return false
				}
			});
			FORUM.bookmarks.touch = false;
			if ("ontouchstart" in window || window.DocumentTouch && document instanceof window.DocumentTouch || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0) {
				FORUM.bookmarks.touch = true;
			}
			FORUM.bookmarks.add = function($this, G) {
				if (!x && FORUM.bookmarks.mode == 1) {
					return false
				}
				var D = G ? ((G.originalEvent && G.originalEvent.touches ? G.originalEvent.touches[0].pageY : G.touches ? G.touches[0].pageY : G.pageY ? G.pageY : G.clientY + document.documentElement.scrollTop) - $this.offset().top) : 50;
				var J = $this.parents(".post").attr("id").split("p")[1];
				var F = false;
				if (FORUM.bookmarks.mode == 2 || $this.find(".bookmark").length) {
					F = true
				}
				var B = FORUM.bookmarks.getBookmarksList(F);
				var I = f(B, J);
				var C = _("От") + ": " + i(new Date().getTime());
				if ($this.parents(".post").find(".editBookmark").length) {
					w($this.parents(".post").find(".editBookmark").children())
				}
				if ($this.find(".bookmark").length) {
					$this.find(".bookmark").css("top", D + "px").attr("alt", C);
					if (!$this.find(".bookmark").hasClass("ncnfrm")) {
						k(B, J, u, b, v, ac, D, C, "")
					}
				} else {
					var E = $("#MyBookmarks li").length;
					if (E >= 50) {
						$.jGrowl(_("Максимальное количество сохраненных закладок") + " — 50.");
						return false
					}
					if (FORUM.bookmarks.mode == 0 || FORUM.bookmarks.mode == 1) {
						var H = ' class="bookmark" id="p' + J + '-bookmark"';
						$this.prepend("<span" + H + ' style="top:' + D + 'px" title="' + _('Редактировать закладку') + '" alt="' + C + '">&nbsp;</span>');
						$this.find(".bookmark").tipsy({
							live: true,
							fade: true,
							gravity: "e bookmark"
						});
						k(B, J, u, b, v, ac, D, C, "")
					} else {
						if (FORUM.bookmarks.mode == 2) {
							H = ' class="bookmark ncnfrm" id="p' + J + '-bookmark"';
							$this.prepend("<span" + H + ' style="top:' + D + 'px" title="' + _('Подтвердить вставку закладки') + '" alt="' + C + '">&nbsp;</span>');
							$this.find(".bookmark").tipsy({
								live: true,
								fade: true,
								gravity: "e bookmark"
							})
						}
					}
				}
				n(B);
			};
			if (!FORUM.bookmarks.touch) {
				$("#pun-viewtopic .post-box").live("dblclick", function(G) {
					G.preventDefault();
					clearTimeout(st);
					FORUM.bookmarks.add($(this), G);
					return false
				});
			} else {
				var evt = ["touchstart", "touchend"];
				if (navigator.pointerEnabled) {
					evt = ["pointerdown", "pointerup"];
				} else if (navigator.msPointerEnabled) {
					evt = ["MSPointerDown", "MSPointerUp"];
				}
				$("#pun-viewtopic .post-box").live(evt[0], function(G) {
					var $this = $(this);
					clearTimeout(st);
					st = setTimeout(function() {
						FORUM.bookmarks.add($this, G);
					}, 800);
				}).live(evt[1], function(G) {
					clearTimeout(st);
				});
				$(window).on("scroll", function() {
					clearTimeout(st);
				});
			}
			if (FORUM.bookmarks.mode == 2) {
				$(".post-box .bookmark.ncnfrm").live("click", function(C) {
					var F = $(this).css("top").replace(/px/, "");
					var E = _("Редактировать закладку");
					var D = FORUM.bookmarks.getBookmarksList(false);
					var B = $(this).attr("alt");
					var G = $(this).parents(".post").attr("id").split("p")[1];
					$(this).removeClass("ncnfrm").attr("title", E).mouseleave().mouseenter();
					k(D, G, u, b, v, ac, F, B, "");
					n(D)
				})
			}
			$(".post-box .bookmark:not(.ncnfrm)").live("click", function(F) {
				F.preventDefault();
				var D = $(this).parents(".post").find(".editBookmark");
				if (D.length) {
					w(D.children());
					return
				}
				var C = '<div class="editBookmark" style="display:none"><h1><span class="delBookmark" title="' + _('Удалить закладку') + '">&#215;</span><span>' + _('Редактировать закладку') + '</span></h1><div class="container"><span class="inputfield">' + _('Описание') + ': <input type="text" size="25" maxlength="50" id="inpEditBm"/><input type="button" class="button" value="' + _('Сохранить') + '" id="btnSaveBm"/></span></div></div>';
				$(this).parents(".post-box").prepend(C);
				var E = $("<obj>" + $(this).attr("alt") + "</obj>").text();
				var B = parseInt($(this).css("top").replace("px", ""));
				var D = $(this).parents(".post-box").find(".editBookmark");
				var H = D.height();
				D.fadeIn(200).find('input[id="inpEditBm"]').val(E);
				D.parents(".post-box").find(".editBookmark").css("top", (B - (H + 10)) + "px");
				$(this).attr("title", _("Скрыть редактирование")).mouseleave().mouseenter()
			});
			$(".post-box .bookmark:not(.ncnfrm)").live({
				mouseenter: function() {
					$(this).addClass("hover")
				},
				mouseleave: function() {
					$(this).removeClass("hover")
				}
			});
			$('.button[id="btnSaveBm"]').live("click", function() {
				var G = $.trim($(this).prev().val()),
					I = $(this).parents(".post").find(".bookmark").attr("alt");
				if (G == I || G.length < 1) {
					w(this);
					return false
				}
				G = y(G);
				var E = FORUM.bookmarks.getBookmarksList(false);
				var F = $(this).parents(".post").attr("id").split("p")[1];
				var C = f(E, F);
				var D = C[1][0],
					L = C[1][1],
					B = C[1][2],
					K = C[1][3],
					H = C[1][4],
					J = true;
				k(E, F, D, L, B, K, H, G, J);
				w(this);
				$(this).parents(".post").find(".bookmark").attr("alt", G);
				n(E)
			});
			$('.button[id="Cncl"]').live("click", function() {
				w(this)
			});
			$(".delBookmark").live("click", function(C) {
				C.preventDefault();
				var B = $(this).parents(".post").find(".bookmark").attr("alt");
				if (!confirm(_('Вы действительно хотите удалить закладку') + ' "' + B + '"?')) {
					return false
				}
				var E = FORUM.bookmarks.getBookmarksList(false);
				var D = $(this).parents(".post").attr("id").split("p")[1];
				o(E, D);
				w(this);
				$(this).parents(".post").find(".bookmark").remove();
				n(E)
			});
			$("#MyBookmarks li >span> a").live("click", function(B) {
				B.preventDefault();
				var C = this.href;
				$("#MyBookmarks li >span").removeClass("last_click");
				$(this).parent().addClass("last_click");
				p(C)
			});
			$(".BookmarkL>span>strong").live("click", function(C) {
				var D = $(this).next("a").text();
				if (!confirm(_('Удалить закладку') + ' "' + D + '"?')) {
					return false
				}
				var E = $(this).next("a").attr("href").replace(/^.*#p(\d+)-.*$/g, "$1");
				var B = FORUM.bookmarks.getBookmarksList(false);
				o(B, E);
				if ($("#p" + E + "-bookmark").length) {
					$("#p" + E + "-bookmark").remove()
				}
				w($(".editBookmark").children());
				n(B)
			});
			var a = false,
				m = false;
			var q;
			if ($("#pun-viewtopic").length) {
				$(document).on("dragstart", ".post h3 .permalink", function() {
					a = !1;
					m = !0;
					q = $(this).parents(".post").attr("id").substr(1)
				}).on("mouseup", ".post h3 .permalink", function() {
					a = !1;
					q = ""
				});
				document.ondragleave = function(C) { 
					var B = ($(C.target).parents("#MyBookmarks").length != 0 || $(C.target).attr("id") == "BookmCntToggle");
					if (B) {
						a = !0;
						m = !1
					} else {
						a = !1;
						m = !0
					}
				}
			}
			$("#MyBookmarks .container,#BookmCntToggle").live("mouseup mouseenter", function(B) {
				if (!a || !q) {
					return
				}
				a = m = false;
				var C = $("#MyBookmarks li").length;
				if (C >= 50) {
					$.jGrowl(_("Максимальное количество сохраненных закладок") + " — 50.");
					return false
				}
				var E = FORUM.bookmarks.getBookmarksList(false),
					H = q;
				if (f(E, H)) {
					return
				}
				var G = 50,
					F = _("От") + ": " + i(new Date().getTime());
				var D = ' class="bookmark" id="p' + H + '-bookmark"';
				$("#p" + H).find(".post-box").prepend("<span" + D + ' style="top:' + G + 'px" title="' + ('Редактировать закладку') + '" alt="' + F + '">&nbsp;</span>');
				$("#p" + H).find(".post-box").find(".bookmark").tipsy({
					live: true,
					fade: true,
					gravity: "e bookmark"
				});
				k(E, H, u, b, v, ac, G, F);
				n(E)
			});
			document.onkeyup = function(B) {
				if (B.keyCode == 27 && $("#MyBookmarks").css("display") != "none") {
					FORUM.bookmarks.toggleBookmSection()
				}
			};
			$(".scrl").live("mousedown", function() {
				$(this).css("margin", "1px")
			}).live("mouseup", function() {
				$(this).css("margin", "0")
			});
			var g = true;
			$(document).live("visibilitychange", function() {
				if (g) {
					g = false;
					return false
				}
				if (document.visibilityState == "visible") {
					var B = FORUM.bookmarks.getBookmarksList(true);
					n(B);
					$(".post .bookmark:not(.ncnfrm)").remove();
					h(B)
				}
			})
		})
	}
})();