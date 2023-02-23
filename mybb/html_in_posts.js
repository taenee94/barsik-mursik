/****************************************************
 * HTML in posts
 * Author: Alex_63
 * Date: 11.06.2017 / 10.01.2021
****************************************************/

var HTMLinPost = {
	frameData: {},
	font: $('.punbb').css('font'),
	alert: false,
};

window[window.addEventListener ? 'addEventListener' : 'attachEvent']('message', function(e) {
	if (e.origin !== ScriptsURL) return;
	if (e.data && e.data.html_frame) {
		var framData = e.data.html_frame;
		var id = framData.id,
			event = framData.event;
		var cnt = HTMLinPost.frameData[id],
			fnt = HTMLinPost.font,
			lnk = HTMLinPost.lnk,
			html = HTMLinPost.html;
		if (event == 'resize') {
			$('#' + id).css('height', framData.height + 'px').attr('height', framData.height)
		};
		if (event == 'load') {
			var host = location.protocol + '//' + location.hostname + '/';
			var html_frame_request = {
				content: cnt,
				font: fnt,
				lnkStyle: lnk,
				htmlHeader: html,
				host: host
			};
			window.frames[id].postMessage({
				html_frame_response: html_frame_request
			}, ScriptsURL)
		}
	}
});
HTMLinPost.parseTags = function(pst) {
	var StrStart = '</p><div class="html-post-box" style="padding-bottom:1em"><div class="html-inner"><div class="html-content">';
	var StrEnd = '</div></div></div><p>';
	var flg = true;
	var elem = $(pst).find('.post-content');
	if (!elem.length) elem = $(pst).find('dd,ul');
	if (+$(pst).attr('data-group-id') == 3 || (pst.id == 'post-preview' && GroupID == 3)) flg = false;
	$('.code-box', pst).html(function(){return this.innerHTML.replace(/([\[\]])/g,'<span>$1</span>')});

	var lnk = window.ScriptsURL + '/html_in_posts/1.0.9/i/frame.html',
		attr = ' scrolling="auto" frameborder="0" vspace="0" hspace="0" width="100%" height="0" allowfullscreen';
	attr += ' sandbox="allow-same-origin allow-top-navigation allow-forms allow-scripts allow-popups"';
	var cnt = elem.html(),
		reg = new RegExp('&nbsp;|' + String.fromCharCode(160), 'gim'),
		reg2 = /(?:<a\shref=")([\s\S]*?)(?:"[\s\S]*?>)([\s\S]*?)(?:<\/a>)/mgi;
	cnt = cnt.replace(/\[html\]([\s\S]*?)\[\/html\]/mgi, function(str, Sk) {
		var s = '--';
		if (!$.trim(Sk).length) s = flg = '';
		if (!!flg) s = Sk;
		s = s.replace(/<br(\s\/)?>/mgi, '\n').replace(reg, ' ').replace(/<\/p>[\s\S]*?<p>/mgi, '\n\n');
		s = s.replace(reg2, function(str, p1) {
			return p1.replace(/^http\:\/\/(?:.*?)click\.php\?/mgi, '')
		});
		s = s.replace(/&lt;/mgi, '<').replace(/&gt;/mgi, '>').replace(/&quot;/gm, '"').replace(/&amp;/gm, '&');
		s = encodeURIComponent(s);
		var id = 'html_frame' + Math.random().toString().substr(6);
		HTMLinPost.frameData[id] = s;
		var frame = '<iframe id="' + id + '" src="' + lnk + '" class="html_frame" name="' + id + '"' + attr + '></iframe>';
		return (StrStart + (flg ? frame : s) + StrEnd)
	});
	elem.html(cnt);
	$(pst).find('p:empty').filter(function() {
		return $(this).text() == ''
	}).remove();
};

if (GroupID != 3) FORUM.set('editor.addition.tags.html', {
	name: function(text, lang_obj, lang) {
		return (lang == 'ru' || !(lang_obj[text] && lang_obj[text][lang])) ? text : lang_obj[text][lang]
	}('HTML в сообщениях', {'HTML в сообщениях' : {en: 'HTML in posts'}}, $('html')[0].lang),
	onclick: function() {
		bbcode('[html]','[/html]');
	}
});

$(document).pun_mainReady(function() {
	HTMLinPost.font = $('.post-content:first').css('font');
	HTMLinPost.lnk = ($('link#change-style').length ? $('link#change-style') : $('head link[rel="stylesheet"]:first'))[0].href;
	HTMLinPost.html = '';
	$('#html-header').find('style,link[rel="stylesheet"]').each(function() {
		HTMLinPost.html += $(this).clone().wrap('<div />').parent().html()
	});
	$('.post,#post-preview,#profile-signature,.parsedsig').filter(':contains("[html]")').map(function() {
		HTMLinPost.parseTags(this);
	});
});