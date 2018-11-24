// JavaScript Document
function agregarNuevo(autor,contenido,link,fecha){
	"use strict";
	var author = $("<h5/>", {
	"class": "card-title",
	html: autor+" dijo: "
	});

	var cont = $("<p/>", {
	"class": "card-text",
	html: contenido
	});

	var url=$("<p/>",{
		"class":"card-text",
		html:$("<a/>",{
			"href":link,
			html: link,
		})
	});
	
	
	var date=$("<p/>",{
		"class":"text-right",
		html:fecha	
	});
	
	var divtext = $("<div/>", {
		"class": "car-body"
	});
	
	var divimg=$("<div/>",{
		"class": "col-2 col-md-1",
		html:$("<img/>",{
			"class":"img-fluid",
			"src":"http://icons-for-free.com/free-icons/png/512/174528.png"
		})
	});
	
	var div=$("<div/>",{
		"class":"card mb-3 p-3 shadow row"
	});
	
	//gg.appendTo(url);
	
	author.appendTo(divtext);
	cont.appendTo(divtext);
	url.appendTo(divtext);
	date.appendTo(divtext);
	divimg.appendTo(div);
	divtext.appendTo(div);
	div.appendTo("#tweets");
}

function cargarXML(buscado){
	"use strict";
	
	$.ajax({
		type: "GET",
		url: "https://twitrss.me/twitter_search_to_rss/?term="+buscado,
		dataType:"xml",
		success:function(xml){
			$(xml).find('item').each(function(){
				var autor = $(this).find('dc\\:creator').text().slice(2,-1);
				var descripcion=$(this).find('description').text();
				var url=$(this).find('link').text();
				var fecha=$(this).find('pubDate').text().slice(0,-6);
				agregarNuevo(autor,descripcion,url,fecha);
			});
		},
		error:function(){
			alert("Ha ocurrido un error al cargar el contenido");	
		}
	});
}

function mostrarTweets(){
	"use strict";
	var elm=document.getElementById("tweets");
	while (elm.hasChildNodes()) {
  		elm.removeChild(elm.lastChild);
	}
	var buscado=$("#buscador").val();
	if(buscado.length>0){
		$("#textobuscado").text("Texto buscado: "+buscado);
		cargarXML(buscado);
	}
	else{
		$("#textobuscado").text("Búsqueda...");
	}
}

$(document).ready(function(){
	"use strict";
	$(".btn").click(function(e){
		e.preventDefault();
		mostrarTweets();
	});
});