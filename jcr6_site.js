
const maintenance=false;
var urlParams = new URLSearchParams(location.search);

function setContent(junk){
	let content=document.getElementById('jcr6_content');
	content.innerHTML = junk;
}

function addContent(junk){
	let content=document.getElementById('jcr6_content');
	content.innterHTML += junk;
}

function underconstruction(){
	setContent("This site is currently still under construction");
}


function showSupport(){
}


let stuff = {
	"default":() => { underconstruction(); },
	"support":showSupport
}

function go404(){
	let flauwekul = [ "Sorry, that page is on vacation","Sorry, that page has been eaten by a shark","That page doesn't like you and refuses to appear",
	                  "Never heard of that page, really!","Browse, browse, browse the web, gently down the stream!<br>Merrily merrily merrily merrily, this page is but a dream!",
	                  "Huh? What were you looking for?","That page is out for lunch!","404 other people tried to look for this page!"]
	let fki = Math.floor(Math.random()*flauwekul.length);
	setContent(`<H1>ERROR!</h1><P>${flauwekul[fki]}</p>`);	
}

function go(){
	let qr // Query reference
	if (!urlParams.has('page')) qr="default"; else qr=urlParams.get("page");
	console.log("Requested page "+qr);
	if (!stuff[qr]) go404(); else stuf[qr]();
}


