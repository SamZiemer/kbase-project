var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = proceed;

function proceed() {
	getServerInfo();
	addLinksToArray();
	var supportMatrix = dataArray[0]
	var dataBase = dataArray[3].split(' ')[0];
	dataArray[4] = dataArray[4].replace(' ', '+');
	var componentSearch = 'https://dev.liferay.com/discover/deployment?p_p_id=3&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&_3_struts_action=%2Fsearch%2Fsearch&_3_redirect=%2Fdiscover%2Fdeployment%2F-%2Fknowledge_base&_3_keywords='+dataArray[4]+'&_3_groupId=10184';
	floatMenu.id = "floatMenu";

	for (var i = 0; i < 4; i++) {
		outterDiv[i] = document.createElement('div');

		menuItem[i] = document.createElement('div');
		menuItem[i].className = 'menuItem';
		menuItem[i].innerHTML = categoryNames[i];

		subMenu[i] = document.createElement('div');
		subMenu[i].className = 'subMenu';

		var a;
		var li;
	
		var link = '';
		switch (i) {
			case 0:
				var temp = dataArray[0]
				if (dataArray[0].indexOf('2') > -1){
					link = 'https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210';
				} else {
					link = 'https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a';
				}
				break;

			case 1:
				var link = 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/';
				var temp = dataArray[3]
				switch(dataBase) {
					case "Oracle":
						link += '31478';
						break;
					case "MySQL":
						link += '31470';
						break;
					case "DB2":
						link += '31688';
						break;
					case "PostgreSQL":
						link += '31644';
						break;
					case "Sybase":
						link += '31656';
						break;
					case "SQL":
						link += '31668';
						break;
					case "Hypersonic":
						link += '15256';
						break;
				}
				break;
			case 2:				
				link = getLink(dataArray[2]);
				var temp = dataArray[2];
				break;
			case 3:
				link = componentSearch;
				var temp = "Search KBASE: " + dataArray[4];
				break;
		}

		a = document.createElement('a');
		a.href = link;
		a.text = temp;
		a.target = '_blank';
		li = document.createElement('li');
		li.appendChild(a);
		subMenu[i].appendChild(li);

		if ((categoryNames[i].indexOf('tall') > -1)) {
			link = "https://www.liferay.com/community/wiki/-/wiki/Main/Database+Portal+Properties";
			a = document.createElement('a');
			a.href = link;
			a.text = "Database Setup";
			a.target = '_blank';
			li = document.createElement('li');
			li.appendChild(a);
			subMenu[i].appendChild(li);
		}
		
		outterDiv[i].appendChild(menuItem[i]);
		outterDiv[i].appendChild(subMenu[i]);
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (var i = 0; i < 4; i++) {
		listDiv.appendChild(outterDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Next Steps";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	document.body.appendChild(floatMenu);

	var css = "#floatMenu {\
			position:absolute;\
			top:15%;\
			right:0px;\
			width:200px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border-left:1px solid #ddd;\
			border-right:1px solid #ddd;\
		}\
		#floatMenu h3 {\
			color:black;\
			font-weight:bold;\
			padding:3px;\
			margin:0;\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:18px;\
		}\
		#floatMenu div {\
			margin:0;\
			padding:0;\
			list-style:none;\
		}\
		.menuItem {\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:14px;\
			font-weight:bold;\
			padding-left:10px;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}";

	var head = document.head;
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet){
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	$(function() {
		function moveFloatMenu() {
			var menuOffset = menuYloc.top + $(this).scrollTop() + "px";
			$('#floatMenu').animate({
				top: menuOffset
			}, {
				duration: 500,
				queue: false
			});
		}

		var menuYloc = $('#floatMenu').offset();

		$(window).scroll(moveFloatMenu);

		moveFloatMenu();
	});

	$(function() {
		$('.subMenu').hide();
		$('.menuItem').click(function () {
			$menuItem = $(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	$(function() {
		$('.menuList').hide();
		$('.menuHeader').click(function() {
			$('.subMenu').hide();
			$('.menuList').slideToggle(500);
		});
	});

	function getServerInfo(serverInfo, typeNode) {
		AUI().use('aui-base', 'node',
			function(A) {
				var lrVersionText = 'LIFERAY VERSION: ';
				var opSystemText = 'OPERATING SYSTEM: ';

				var applicationServerText = 'APPLICATION SERVER: ';
				var jvmText = 'JAVA VIRTUAL MACHINE: ';

				var dataBaseText = 'DATABASE: ';       
				var browserText = 'PRIMARY BROWSER: ';

				function serverType(serverInfo) {
					var version = '';
					serverTypeNode = typeNode;
					serverTypeNode.each(
						function() {
							var innerHTML = this.get('innerText');
							if (innerHTML.indexOf(serverInfo) > -1) {
								version = innerHTML;
							}
						}
					);

					if (version) {
						var begin = version.indexOf(serverInfo) + serverInfo.length;
						var end = version.indexOf('\n');

						if (serverInfo == opSystemText) {
							end = version.indexOf('\n') + begin;
						}
						version = version.substring(begin, end);

						return version;
					}

					return serverType;
				}
				var typeNode = A.all(".content-column-content");
				dataArray[dataArray.length] = serverType(lrVersionText, typeNode);
				dataArray[dataArray.length] = serverType(opSystemText, typeNode);
				dataArray[dataArray.length] = serverType(applicationServerText, typeNode);
				dataArray[dataArray.length] = serverType(dataBaseText, typeNode);
				var typeNode = A.all(".callout-content");
				dataArray[dataArray.length] = serverType(componentText, typeNode);
			}
		);
	}

		function getLink(text) {
		var newIndex =0 ;
			for (newIndex = 0; newIndex < arrayofLinks.length; newIndex++) {
				var temp = text;
				temp = temp.split(" ");
				temp = temp [0];
				temp = temp.toLowerCase();

				if (arrayofLinks[newIndex].indexOf(temp) > -1) {
					return arrayofLinks[newIndex];
				}
			}
			return (arrayofLinks[arrayofLinks.length -1]);
		}
};

function addLinksToArray(){
	var kbBase = "https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-";
	arrayofLinks[arrayofLinks.length] = kbBase+"glassfish-4";
	arrayofLinks[arrayofLinks.length] = kbBase+"jboss-7-1";
	arrayofLinks[arrayofLinks.length] = kbBase+"tomcat-7";
	arrayofLinks[arrayofLinks.length] = kbBase+"oracle-weblogic-12c-12-1-2-and-h";
	arrayofLinks[arrayofLinks.length] = kbBase+"websphere-8-5";
	arrayofLinks[arrayofLinks.length] = "https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4";
	arrayofLinks[arrayofLinks.length] = "https://www.liferay.com/documentation/liferay-portal/6.1/user-guide/-/ai/lp-6-1-ugen11-installing-liferay-on-mule-tcat-0";
	arrayofLinks[arrayofLinks.length] = "https://www.liferay.com/community/wiki/-/wiki/Main/tcserver+Configuration+and+Tips";
}

var arrayofLinks = [];
var applicationServerText = "APPLICATION SERVER: ";
var componentText = "COMPONENT: ";
var dataBaseText = "DATABASE: ";
var lrVersionText = "LIFERAY VERSION: ";
var opSystemText = "OPERATING SYSTEM: ";

var dataArray = [];

var floatMenu = document.createElement('div');
var outterDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Compatibiltiy Matrix",
	"Support Policies",
	"Installation",
	"Troubleshooting"
];