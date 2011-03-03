if(!Array.indexOf){Array.prototype.indexOf=function(c){for(var b=0,a=this.length;b<a;b++){if(this[b]==c){return b}}return -1}}function obj_length(c){if(c.length!==undefined){return c.length}var b=0;for(var a in c){b++}return b}$.fn.makeAbsolute=function(a){return this.each(function(){var b=$(this);var c=b.position();b.css({position:"absolute",marginLeft:0,marginTop:0,top:c.top,left:c.left,right:$(window).width()-(c.left+b.width())});if(a){b.remove().appendTo("body")}})};function show_hide_popupmenu_options(d,c,a){a=(a===undefined?true:a);var b=new RegExp(c);$(d).find("li").each(function(){if(b.exec($(this).text())){if(a){$(this).show()}else{$(this).hide()}}})}function make_popupmenu(b,c){var a=(b.data("menu_options"));b.data("menu_options",c);if(a){return}b.bind("click.show_popup",function(d){$(".popmenu-wrapper").remove();setTimeout(function(){var g=$("<ul id='"+b.attr("id")+"-menu'></ul>");var f=b.data("menu_options");if(obj_length(f)<=0){$("<li>No Options.</li>").appendTo(g)}$.each(f,function(j,i){if(i){$("<li/>").html(j).click(i).appendTo(g)}else{$("<li class='head'/>").html(j).appendTo(g)}});var h=$("<div class='popmenu-wrapper' style='position: absolute;left: 0; top: -1000;'>");h.append(g).append("<div class='overlay-border'>").appendTo("body");var e=d.pageX-h.width()/2;e=Math.min(e,$(document).scrollLeft()+$(window).width()-$(h).width()-20);e=Math.max(e,$(document).scrollLeft()+20);h.css({top:d.pageY-5,left:e})},10);setTimeout(function(){var f=function(h){$(h).bind("click.close_popup",function(){$(".popmenu-wrapper").remove();h.unbind("click.close_popup")})};f($(window.document));f($(window.top.document));for(var e=window.top.frames.length;e--;){var g=$(window.top.frames[e].document);f(g)}},50);return false})}function make_popup_menus(){jQuery("div[popupmenu]").each(function(){var a={};var c=$(this);c.find("a").each(function(){var f=$(this),h=f.get(0);var d=h.getAttribute("confirm"),e=h.getAttribute("href"),g=h.getAttribute("target");if(!e){a[f.text()]=null}else{a[f.text()]=function(){if(!d||confirm(d)){var i;if(g=="_parent"){window.parent.location=e}else{if(g=="_top"){window.top.location=e}else{if(g=="demo"){if(i==undefined||i.closed){i=window.open(e,g);i.creator=self}}else{window.location=e}}}}}}});var b=$("#"+c.attr("popupmenu"));b.find("a").bind("click",function(d){d.stopPropagation();return true});make_popupmenu(b,a);b.addClass("popup");c.remove()})}function naturalSort(j,h){var p=/(-?[0-9\.]+)/g,k=j.toString().toLowerCase()||"",g=h.toString().toLowerCase()||"",l=String.fromCharCode(0),n=k.replace(p,l+"$1"+l).split(l),e=g.replace(p,l+"$1"+l).split(l),d=(new Date(k)).getTime(),o=d?(new Date(g)).getTime():null;if(o){if(d<o){return -1}else{if(d>o){return 1}}}var m,f;for(var i=0,c=Math.max(n.length,e.length);i<c;i++){m=parseFloat(n[i])||n[i];f=parseFloat(e[i])||e[i];if(m<f){return -1}else{if(m>f){return 1}}}return 0}function replace_big_select_inputs(a,b){if(!jQuery().autocomplete){return}if(a===undefined){a=20}if(b===undefined){b=3000}$("select").each(function(){var d=$(this);var g=d.find("option").length;if((g<a)||(g>b)){return}if(d.attr("multiple")===true){return}if(d.hasClass("no-autocomplete")){return}var m=d.attr("value");var c=$("<input type='text' class='text-and-autocomplete-select'></input>");c.attr("size",40);c.attr("name",d.attr("name"));c.attr("id",d.attr("id"));c.click(function(){var n=$(this).val();$(this).val("Loading...");$(this).showAllInCache();$(this).val(n);$(this).select()});var e=[];var i={};d.children("option").each(function(){var o=$(this).text();var n=$(this).attr("value");e.push(o);i[o]=n;i[n]=n;if(n==m){c.attr("value",o)}});if(m===""||m==="?"){c.attr("value","Click to Search or Select")}if(d.attr("name")=="dbkey"){e=e.sort(naturalSort)}var f={selectFirst:false,autoFill:false,mustMatch:false,matchContains:true,max:b,minChars:0,hideForLessThanMinChars:false};c.autocomplete(e,f);d.replaceWith(c);var k=function(){var o=c.attr("value");var n=i[o];if(n!==null&&n!==undefined){c.attr("value",n)}else{if(m!==""){c.attr("value",m)}else{c.attr("value","?")}}};c.parents("form").submit(function(){k()});$(document).bind("convert_to_values",function(){k()});if(d.attr("refresh_on_change")=="true"){var h=d.attr("refresh_on_change_values"),l=d.attr("last_selected_value");if(h!==undefined){h=h.split(",")}var j=function(){var n=i[c.attr("value")];if(l!==n&&n!==null&&n!==undefined){if(h!==undefined&&$.inArray(n,h)===-1&&$.inArray(l,h)===-1){return}c.attr("value",n);$(window).trigger("refresh_on_change");c.parents("form").submit()}};c.bind("result",j);c.keyup(function(n){if(n.keyCode===13){j()}});c.keydown(function(n){if(n.keyCode===13){return false}})}})}function async_save_text(d,f,e,a,c,h,i,g,b){if(c===undefined){c=30}if(i===undefined){i=4}$("#"+d).live("click",function(){if($("#renaming-active").length>0){return}var l=$("#"+f),k=l.text(),j;if(h){j=$("<textarea></textarea>").attr({rows:i,cols:c}).text($.trim(k))}else{j=$("<input type='text'></input>").attr({value:$.trim(k),size:c})}j.attr("id","renaming-active");j.blur(function(){$(this).remove();l.show();if(b){b(j)}});j.keyup(function(n){if(n.keyCode===27){$(this).trigger("blur")}else{if(n.keyCode===13){var m={};m[a]=$(this).val();$(this).trigger("blur");$.ajax({url:e,data:m,error:function(){alert("Text editing for elt "+f+" failed")},success:function(o){if(o!==""){l.text(o)}else{l.html("<em>None</em>")}if(b){b(j)}}})}}});if(g){g(j)}l.hide();j.insertAfter(l);j.focus();j.select();return})}function init_history_items(d,a,c){var b=function(){try{var e=$.jStorage.get("history_expand_state");if(e){for(var g in e){$("#"+g+" div.historyItemBody").show()}}}catch(f){$.jStorage.deleteKey("history_expand_state")}if($.browser.mozilla){$("div.historyItemBody").each(function(){if(!$(this).is(":visible")){$(this).find("pre.peek").css("overflow","hidden")}})}d.each(function(){var j=this.id,h=$(this).children("div.historyItemBody"),i=h.find("pre.peek");$(this).find(".historyItemTitleBar > .historyItemTitle").wrap("<a href='javascript:void(0);'></a>").click(function(){var k;if(h.is(":visible")){if($.browser.mozilla){i.css("overflow","hidden")}h.slideUp("fast");if(!c){k=$.jStorage.get("history_expand_state");if(k){delete k[j];$.jStorage.set("history_expand_state",k)}}}else{h.slideDown("fast",function(){if($.browser.mozilla){i.css("overflow","auto")}});if(!c){k=$.jStorage.get("history_expand_state");if(!k){k={}}k[j]=true;$.jStorage.set("history_expand_state",k)}}return false})});$("#top-links > a.toggle").click(function(){var h=$.jStorage.get("history_expand_state");if(!h){h={}}$("div.historyItemBody:visible").each(function(){if($.browser.mozilla){$(this).find("pre.peek").css("overflow","hidden")}$(this).slideUp("fast");if(h){delete h[$(this).parent().attr("id")]}});$.jStorage.set("history_expand_state",h)}).show()};b()}function commatize(b){b+="";var a=/(\d+)(\d{3})/;while(a.test(b)){b=b.replace(a,"$1,$2")}return b}function reset_tool_search(a){var c=$("#galaxy_tools").contents();if(c.length===0){c=$(document)}$(this).removeClass("search_active");c.find(".toolTitle").removeClass("search_match");c.find(".toolSectionBody").hide();c.find(".toolTitle").show();c.find(".toolPanelLabel").show();c.find(".toolSectionWrapper").each(function(){if($(this).attr("id")!="recently_used_wrapper"){$(this).show()}else{if($(this).hasClass("user_pref_visible")){$(this).show()}}});c.find("#search-no-results").hide();c.find("#search-spinner").hide();if(a){var b=c.find("#tool-search-query");b.val("search tools");b.css("font-style","italic")}}var GalaxyAsync=function(a){this.url_dict={};this.log_action=(a===undefined?false:a)};GalaxyAsync.prototype.set_func_url=function(a,b){this.url_dict[a]=b};GalaxyAsync.prototype.set_user_pref=function(a,b){var c=this.url_dict[arguments.callee];if(c===undefined){return false}$.ajax({url:c,data:{pref_name:a,pref_value:b},error:function(){return false},success:function(){return true}})};GalaxyAsync.prototype.log_user_action=function(c,b,d){if(!this.log_action){return}var a=this.url_dict[arguments.callee];if(a===undefined){return false}$.ajax({url:a,data:{action:c,context:b,params:d},error:function(){return false},success:function(){return true}})};$(document).ready(function(){$("select[refresh_on_change='true']").change(function(){var a=$(this),e=a.val(),d=false,c=a.attr("refresh_on_change_values");if(c){c=c.split(",");var b=a.attr("last_selected_value");if($.inArray(e,c)===-1&&$.inArray(b,c)===-1){return}}$(window).trigger("refresh_on_change");$(document).trigger("convert_to_values");a.get(0).form.submit()});$("a[confirm]").click(function(){return confirm($(this).attr("confirm"))});if($.fn.tipsy){$(".tooltip").tipsy({gravity:"s"})}make_popup_menus();replace_big_select_inputs(20,1500);$("a").click(function(){var b=$(this);var c=(parent.frames&&parent.frames.galaxy_main);if((b.attr("target")=="galaxy_main")&&(!c)){var a=b.attr("href");if(a.indexOf("?")==-1){a+="?"}else{a+="&"}a+="use_panels=True";b.attr("href",a);b.attr("target","_self")}return b})});