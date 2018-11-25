// JavaScript Document
function agregarNuevo(autor,contenido,link,fecha){
	"use strict";
		
	var divrow=$("<div/>",{
		"class":"row mb-3 shadow rounded"
	});
	
	var divtext=$("<div/>",{
		"class":"col-10 col-lg-11"
	});
	
	var divimg=$("<div/>",{
		"class": "col-2 col-lg-1",
	});
	
	var cardT=$("<div/>",{
		"class":"card border-white"	
	});
	
	var cardI=$("<div/>",{
		"class":"card border-white"	
	});
	
	var divbody = $("<div/>", {
		"class": "card-body"
	});
	
	var author = $("<h5/>", {
		"class":"card-text",
		html: autor+" dijo: "
	});

	var cont = $("<p/>", {
		"class":"card-text",
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
		"class":"text-right card-text",
		html:fecha	
	});
	
	var img=$("<img/>",{
		"class":"img-fluid",
		"src":"http://icons-for-free.com/free-icons/png/512/174528.png"
	});
	


	author.appendTo(divbody);
	cont.appendTo(divbody);
	url.appendTo(divbody);
	date.appendTo(divbody);
	divbody.appendTo(cardT);
	cardT.appendTo(divtext);
	img.appendTo(cardI);
	cardI.appendTo(divimg);
	divimg.appendTo(divrow);
	divtext.appendTo(divrow);
	divrow.appendTo("#tweets");
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