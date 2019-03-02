
const maintenance=false;
var urlParams = new URLSearchParams(location.search);

function setContent(junk){
	let content=document.getElementById('jcr6_content');
	content.innerHTML = junk;
}

function addContent(junk){
	let content=document.getElementById('jcr6_content');
	content.innerHTML += junk;
}

function underconstruction(){
	setContent("This site is currently still under construction");
}

function lang(sd,tag){
	if (sd[tag]["lang_repository"]=="")
		return sd[tag]["lang_Name"];
	else
		return `<a href="${sd[tag]["lang_repository"]}" target=_blank>${sd[tag]["lang_Name"]}</a>`;
}

function showSupport(){
	var suppdata;
	//*
	setContent("<h1>Support Overview!</h1>");
	addContent("<h3>JCR6 has currently support for the next programming languages</h3>");
	//*
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var rText = this.responseText
			//var myObj = JSON.parse(rText);
			//suppdata = myObj;
			//console.log("RECEIVED: <"+rText+">");
			//document.getElementById("demo").innerHTML = myObj.name;
			console.log("getting!");
			let tF = new Function("return "+rText+";");
			console.log("Got it! Executing!");
			suppdata = tF();
			console.log("Done?");
			console.log(suppdata);
			let crap = "<ol type=i>";
			for (t in suppdata){
				//console.log(t);
				crap += "<li>"+lang(suppdata,t);
				let d = suppdata[t];
				if (d["lang_Remarks"]!="") crap+="<br><b>Notes:</b> "+d["lang_Remarks"];
				if (d["lang_Dependencies"]!="") crap+="<br><b>Dependency notes:</b> "+d["lang_Dependencies"];
				crap+="</li>\n";
			}
			addContent(crap+"</ol>");
			// File formats
			addContent("<h3>File formats</h3>By default JCR6 only reads its own native format, but the next formats are also supported for reading only! (only JCR6 format can be written by most libaries)");
			let formats = ["JCR6","JCR5","Real_Dir","WAD","QuakePak"];
			crap = "<table><tr><th></th>";
			for (f of formats) crap+="<th>"+f+"</th>";
			crap+="<th>Notes</th><th>Dependencies needed</th></tr>";
			for (t in suppdata){
				let d = suppdata[t];
				crap+="<tr valign='top'><td>"+lang(suppdata,t)+"</td>";
				for (c of formats) crap+=`<td align='center'><img src='img/${d["file_"+c]}.png' height=15></td>`;
				crap+="<td>"+d["file_remarks"]+"</td>";
				crap+="<td>"+d["file_dependencies"]+"</td>";
			}
			crap+="</table>";
			addContent(crap);
			// compression methods
			addContent("<h3>Compression methods</h3><br>Please note that by convention all methods must have a name in lower case only as upper case is reserved for special methods or methods causing special effects (such as BRUTE in the Go cli tools trying all known methods only keeping the best result).");
			formats = ["Store","zlib","lzma","lzw","flate","jxsrcca"];
			crap = "<table><tr><th></th>";
			for (f of formats) crap+="<th>"+f+"</th>";
			crap+="<th>Notes</th><th>Dependencies needed</th></tr>";
			for (t in suppdata){
				let d = suppdata[t];
				crap+="<tr valign='top'><td>"+lang(suppdata,t)+"</td>";
				for (c of formats) crap+=`<td align='center'><img src='img/${d["comp_"+c]}.png' height=15></td>`;
				crap+="<td>"+d["comp_remarks"]+"</td>";
				crap+="<td>"+d["comp_dependencies"]+"</td>";
			}
			crap+="</table>";
			addContent(crap);
			addContent("<img src='img/-1.png' height=15> = Not supported<br><img src='img/0.png' height=15> = Not supported yet, but planned for the nearby future<br><img src='img/1.png' height=15> = Supported");
		}
	};
	xmlhttp.open("GET", "Data/Support.json", true);
	xmlhttp.send();
	//*/ 
	console.log("Got everything?");
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
	if (!stuff[qr]) go404(); else stuff[qr]();
}


