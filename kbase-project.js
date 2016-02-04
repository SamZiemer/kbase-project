var collapsedOnStart = true;
var collapsed = collapsedOnStart;

window.addEventListener('load', function() {
	var jq = document.createElement('script');
	jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
	document.querySelector('head').appendChild(jq);

	jq.onload = proceed;
}, false);

function proceed() {
	getServerInfo();
	addLinksToArrays();
	getLinks();
	floatMenu.id = "floatMenu";

	for (var i = 0; i < categoryNames.length; i++) {
		outerDiv[i] = document.createElement('div');

		menuItem[i] = document.createElement('div');
		menuItem[i].className = 'menuItem';
		menuItem[i].innerHTML = categoryNames[i];

		subMenu[i] = document.createElement('div');
		subMenu[i].className = 'subMenu';

		var a;
		var li;
		switch (i) {
			case 0:
				for (var j = 0; j < troubleshootingLinks.length; j++) {
					a = document.createElement('a');
					a.href = troubleshootingLinks[j].link;
					a.text = troubleshootingLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(troubleshootingLinks[j].link);
				}
				break;

			case 1:
				for (var j = 0; j < installationLinks.length; j++) {
					a = document.createElement('a');
					a.href = installationLinks[j].link;
					a.text = installationLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(installationLinks[j].link)
				}
				break;

			case 2:
				for (var j = 0; j < supportPolicyLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportPolicyLinks[j].link;
					a.text = supportPolicyLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(supportPolicyLinks[j].link);
				}
				break;

			case 3:
				for (var j = 0; j < supportForumsLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportForumsLinks[j].link;
					a.text = supportForumsLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(supportForumsLinks[j]);
				}
				break;

			case 4:
			{
				a = document.createElement('a');
				a.href = "https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Service+Level+Response+and+Resolution+Times"
				a.text = "SLA";
				a.target = '_blank';
				li = document.createElement('li');
				li.appendChild(a);
				subMenu[i].appendChild(li);
			}
				break;

			case 5:
				var feedbackURLYes = createFeedbackURL("Yes");
				var feedbackURLNo = createFeedbackURL("No");
				var d = document.createElement('div');
				var s = document.createElement('span');
				s.innerText = " - or - ";

				a = document.createElement('a');
				a.href = feedbackURLYes;
				a.text = "Yes";
				a.target = '_blank';

				var b = document.createElement('a');
				b.href = feedbackURLNo;
				b.text = "No";
				b.target = '_blank';

				d.appendChild(a);
				d.appendChild(s);
				d.appendChild(b);
				subMenu[i].appendChild(d);

				break;
		}

		outerDiv[i].appendChild(menuItem[i]);
		outerDiv[i].appendChild(subMenu[i]);
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < categoryNames.length; i++) {
		listDiv.appendChild(outerDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Quick Links";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:fixed;\
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
		.subMenu {\
			border-bottom:1px solid #ddd;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}";

	var head = document.head;
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	jQuery(function() {
        if(collapsedOnStart){
            jQuery('.menuList').hide();
            floatMenu.className = "";//"rotate";
        }
		jQuery('.menuItem').click(function() {
			$menuItem = jQuery(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	jQuery(function() {
		jQuery('.menuHeader').click(function() {
			jQuery('.subMenu').hide();
			jQuery('.menuList').slideToggle(500);
            collapsed = collapsed ^ true;
            
            if (collapsed) {
                floatMenu.className = "";//"rotate";
            } else {
                floatMenu.className = "";
            }
		});
	});

	function getServerInfo(serverInfo, typeNode) {
		AUI().use('aui-base', 'node',
			function(A) {
				function serverType(serverInfo) {
					var version = '';
					var serverTypeNode = typeNode;
					serverTypeNode.each(
						function() {
							var innerHTML = this.get('textContent');
							if (innerHTML.toUpperCase().indexOf(serverInfo) > -1) {
								version = innerHTML;
							}
						}
					);

					if (version) {
						var begin = version.toUpperCase().indexOf(serverInfo) + serverInfo.length;
						var end = version.indexOf('  ', begin);

						version = version.substring(begin, end);
						return version.toString().trim();
					}

					return serverType;
				}
				var typeNode = A.all(".content-column-content");
				dataArray[dataArray.length] = serverType(lrVersionText, typeNode);
				dataArray[dataArray.length] = serverType(opSystemText, typeNode);
				dataArray[dataArray.length] = serverType(applicationServerText, typeNode);
				dataArray[dataArray.length] = serverType(dataBaseText, typeNode);
				dataArray[dataArray.length] = serverType(browserText, typeNode);
				dataArray[dataArray.length] = serverType(javaText, typeNode);
				typeNode = A.all(".callout-content");
				dataArray[dataArray.length] = serverType(componentText, typeNode);
				dataArray[dataArray.length] = getCustomerId();
			}
		);
	}

	function getCustomerId() {
		var customerId = document.getElementsByTagName("title")[0].innerHTML;

		var tempVar = customerId.split("[");
		customerId = tempVar[1].split("]");

		return customerId[0];
	}

	function addLinksForFeedback(linkContent) {

		feedbackLinkContent[feedbackLinkContent.length] = linkContent;
	}

	function createFeedbackURL(answer) {

		var customerId = dataArray[7];

		var baseGoogleFormURL = "https://docs.google.com/a/liferay.com/forms/d/143TgPw3RGU67t17OO195pb7lhnAVW6o909CWSTKKCso/viewform";

		var completeFormURL = baseGoogleFormURL + "?entry.321334840=" + customerId;

		completeFormURL = completeFormURL + "&entry.1983029939=" + answer +"&" ;

		completeFormURL = completeFormURL + "&entry.1550379905=";

		for (var a = 0; a < feedbackLinkContent.length; a++) {
			completeFormURL = completeFormURL + feedbackLinkContent[a] + " , "
		}

		return completeFormURL;
	}

	function getLinks() {
		var appServer = dataArray[2].split(" ")[0],
			browser = dataArray[4].split(" ")[0],
			component = dataArray[6],
			db = dataArray[3].split(" ")[0],
			java = dataArray[5].split(" ")[0],
			os = dataArray[1].split(" ")[0];

		for (var i = 0; i < arrayOfMaps.length; i++) {
			var map = arrayOfMaps[i];
			var install = [];
			var supportPolicy = [];
			var troubleShoot = [];
			var supportForums = [];

			switch (i) {
				case 0:
					if (appServer in map) {
						if (map[appServer][0] !== null) {
							if (appServer == 'Websphere') {
								if (dataArray[2].indexOf('8.5')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else if (appServer == 'Weblogic') {
								if (dataArray[2].indexOf('12')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else {
								install.link = map[appServer][0];
								install.name = dataArray[2];
								installationLinks[installationLinks.length] = install;
							}
						}
						if (map[appServer][1] !== null) {
							supportPolicy.link = map[appServer][1];
							supportPolicy.name = dataArray[2];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[appServer][2] !== null) {
							troubleShoot.link = map[appServer][2];
							troubleShoot.name = dataArray[2];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 1:
					if (browser in map) {
						if (map[browser][0] !== null) {
							supportPolicy.link = map[browser][0];
							supportPolicy.name = dataArray[4];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[browser][1] !== null) {
							troubleShoot.link = map[browser][1];
							troubleShoot.name = dataArray[4];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 2:
					if (component in map) {
						if (map[component][0] !== null) {
							install.link = map[component][0];
							install.name = dataArray[6];
							installationLinks[installationLinks.length] = install;
						}
						if (map[component][1] !== null) {
							supportPolicy.link = map[component][1];
							supportPolicy.name = dataArray[6];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[component][2] !== null) {
							troubleShoot.link = map[component][2];
							troubleShoot.name = dataArray[6];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
						if(map[component][3] !== null) {
							supportForums.link = map[component][3];
							supportForums.name = dataArray[6];
							supportForums.noLink = false;
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						} else {
							supportForums.link = 'https://in.liferay.com/web/support/forums/-/message_boards/category/922867';
							supportForums.name = 'Support Forums';
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						}
					}
					break;
				case 3:
					if (db in map) {
						if (map[db][0] !== null) {
							supportPolicy.link = map[db][0];
							supportPolicy.name = dataArray[3];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[db][1] !== null) {
							troubleShoot.link = map[db][1];
							troubleShoot.name = dataArray[3];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 4:
					if (java in map) {
						if (map[java][0] !== null) {
							supportPolicy.link = map[java][0];
							supportPolicy.name = dataArray[5];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[java][1] !== null) {
							troubleShoot.link = map[java][1];
							troubleShoot.name = dataArray[5];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 5:
					if (os in map) {
						if (map[os][0] !== null) {
							supportPolicy.link = map[os][0];
							supportPolicy.name = dataArray[1];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[os][1] !== null) {
							troubleShoot.link = map[os][1];
							troubleShoot.name = dataArray[1];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
			}
		}
	}
}

function addLinksToArrays() {
	appServerMap['Websphere'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-websphere-8-5', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-websphere-8-0'], 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31534', null];
	appServerMap['Tomcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-tomcat-7', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31522', null];
	appServerMap['Weblogic'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-oracle-weblogic-12c-12-1-2-and-h', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-oracle-weblogic-10-3', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-weblogic-10'], null, null];
	appServerMap['JBoss'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-jboss-7-1', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31960', null];
	appServerMap['Tcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-mulesoft-tcat', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32064', null];
	appServerMap['Glassfish'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-glassfish-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31320', null];
	appServerMap['Resin'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31988', null];
	appServerMap['tcServer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/13554', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32076', null];

	browserMap['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32010', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31732', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Internet'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32039', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];

	componentMap['Account Administration'] = [null, null, "https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/integrating-liferay-users-into-your-enterprise#ldap", null];
	componentMap['Activation Key'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616", null,"https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767","https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767",null];
	componentMap['Authentication'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40359", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14567", "https://in.liferay.com/web/support/forums/-/message_boards/category/4697603"];
	componentMap['Calendar'] = ["https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-events-and-calendar-resources-with-liferays-c", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40324", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951214"];
	componentMap['Clustering'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14264973", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14666", "https://in.liferay.com/web/support/forums/-/message_boards/category/16979473"];
	componentMap['Collaboration Suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40284", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15089", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951214"];
	componentMap['Developer Studio'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27061762", null, null, 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697596'];
	componentMap['Document Library'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/38992", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483903", "https://in.liferay.com/web/support/forums/-/message_boards/category/4534050"];
	componentMap['LAR/Staging'] = ["https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/43449", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14694", "https://in.liferay.com/web/support/forums/-/message_boards/category/5953181"];
	componentMap['License'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['License/Account Setup'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['Liferay API'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/14262850", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15200", "https://in.liferay.com/web/support/forums/-/message_boards/category/5950852"];
	componentMap['Liferay Faces'] = ['https://www.liferay.com/community/liferay-projects/liferay-faces/documentation', null, "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27733288", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951363"];
	componentMap['Liferay Mobile SDK'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile', null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15277", null];
	componentMap['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/administering-liferay-sync', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40300", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27528001", "https://in.liferay.com/web/support/forums/-/message_boards/category/5952429"];
	componentMap['Patch Management'] = ['https://www.liferay.com/group/customer/products/portal/patching', null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14769", null];
	componentMap['Portal Administration'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30717691", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18554", "https://in.liferay.com/web/support/forums/-/message_boards/category/4772239"];
	componentMap['Portal Deployment'] = ['https://dev.liferay.com/discover/deployment', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485351", "https://in.liferay.com/web/support/forums/-/message_boards/category/4533678"];
	componentMap['Search/Indexing'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/14324221", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40308", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485451", "https://in.liferay.com/web/support/forums/-/message_boards/category/5953181"];
	componentMap['Security'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/25821", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14727", "https://in.liferay.com/web/support/forums/-/message_boards/category/5950866"];
	componentMap['UI'] = [null, null, "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43697018", "https://in.liferay.com/web/support/forums/-/message_boards/category/5952679"];
	componentMap['Upgrade'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/27740277", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14762", "https://in.liferay.com/web/support/forums/-/message_boards/category/17065113"];
	componentMap['Web Content Management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40292", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485750", 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697774'];
	componentMap['Workflows/Forms'] = ["https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/kaleo-forms-defining-business-processes", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18545", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22105"];

	databaseMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31478', null];
	databaseMap['MySQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470', null];
	databaseMap['DB2'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31688', null];
	databaseMap['PostgreSQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31644', null];
	databaseMap['Sybase'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31656', null];
	databaseMap['SQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31668', null];

	javaMap['IBM JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31918', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/24963'];
	javaMap['Oracle JRockit'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31996', null];
	javaMap['Java'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31968', null];
	javaMap['Sun JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31945', null];

	lrVersionMap['6.2'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210'];
	lrVersionMap['6.1'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a'];
	lrVersionMap['6.0'] = ['https://www.liferay.com/documents/3133562/8435741/Compatibility+Matrix+v6.0.pdf/b58f3e64-30d8-400a-aba3-71c16e439fc9?'];
	lrVersionMap['5.2'] = ['https://www.liferay.com/documents/3133562/8435737/Compatibility+Matrix+v5.2.pdf/4a81c299-132c-488d-b10e-b7546891a1d2?'];
	lrVersionMap['5.1'] = ['https://www.liferay.com/documents/3133562/8435733/Support+Matrix+v5.1.pdf/91f9a892-6b3b-4ab2-abdc-14ceb1aceb1f'];

	osMap['Mac'] = [null, null];
	osMap['Windows'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32055', null];
	osMap['Red'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31911', null];
	osMap['AIX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31895', null];
	osMap['Debian'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31812', null];
	osMap['openSUSE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31840', null];
	osMap['Ubuntu'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32047', null];
	osMap['CentOS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31902', null];
	osMap['Solaris'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31980', null];
	osMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31847', null];
	osMap['Other'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32112', null];
	osMap['HP-UX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31820', null];
	osMap['General'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
	osMap['Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];

	htComponent['Account Administration'] = [null];
	htComponent['Activation Key'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616,Activation Key Deployment'];
	htComponent['Authentication'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658,SAML Start Guide for 6.1+','https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/integrating-liferay-users-into-your-enterprise#ldap,Integrating Liferay Users','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/15472222,NTLM Setup'];
	htComponent['Calendar'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-events-and-calendar-resources-with-liferays-c,Managing Events and Calendar'];
	htComponent['Clustering'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14264973,Installation in a Clustered Environment','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/37840259,Managing Distributed Cache','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14624847,Echache Configuration','https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/liferay-clustering,Liferay Clustering'];
	htComponent['Collaboration Suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite,Collaboration Suite'];
	htComponent['Developer Studio'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27061762,Getting Started', 'https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-1/liferay-ide-and-liferay-developer-studio,IDE and Developer Studio', 'https://dev.liferay.com/develop/learning-paths/mvc/-/knowledge_base/6-2/developing-applications-with-liferay-developer-stu,Developing Applications'];
	htComponent['Document Library'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14370777,Document and Media Library Guide', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management,Document Management'];
	htComponent['LAR/Staging'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/43449,Staging in 6.2: FAQ', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/staging-page-publication,Staging Page Publication'];
	htComponent['Liferay API'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14262850,Thread Dumps from JVM','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/42637305,Liferay&#39;s Clustering API'];
	htComponent['Liferay Faces'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27550873,Faces Installation'];
	htComponent['Liferay Mobile SDK'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile,Mobile SDK'];
	htComponent['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/administering-liferay-sync,Administering Liferay Sync'];
	htComponent['Patch Management'] = ['https://www.liferay.com/group/customer/products/portal/patching,Portal Patching'];
	htComponent['Portal Administration'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14991389,Apply Fix Packs and Hotfixes','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30717691,Portal Properties for Separate Instances'];
	htComponent['Portal Deployment'] = ['https://dev.liferay.com/discover/deployment,Portal Deployment'];
	htComponent['Searching/Indexing'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/search-and-indexing,Search and Indexing','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/searching-for-content-in-liferay,Searching For Content','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14324221,Basic SOLR Setup Guide'];
	htComponent['Security'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658,SAML Start Guide for 6.1+'];
	htComponent['UI'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43766704,6.2 UI Features'];
	htComponent['Upgrade'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/38711583,Upgrading to 6.2','https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/upgrading-liferay,Upgrading Liferay'];
	htComponent['Web Content Management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management,Web Content Management','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/building-a-site-with-liferay-web-content,Building a Site with WCM','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/searching-for-content-in-liferay,Searching for Content in Liferay','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/using-the-asset-publisher,Using the Asset Publisher'];
	htComponent['Workflows/Forms'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/kaleo-forms-defining-business-processes,Kaleo Forms Business Processes'];

	htAppServer['Websphere'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/38001801,Websphere 8','https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-websphere-8-5,Websphere 8.5','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14310761,Websphere 7'];
	htAppServer['Tomcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-tomcat-7,Tomcat 7'];
	htAppServer['Weblogic'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-oracle-weblogic-12c-12-1-2-and-h,Weblogic 12C','https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-oracle-weblogic-10-3,Weblogic 10.3','https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-weblogic-10,Weblogic 10'];
	htAppServer['JBoss'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-jboss-7-1,JBoss 7.1'];
	htAppServer['Tcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-mulesoft-tcat,Tcat'];
	htAppServer['Glassfish'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-glassfish-4,Glassfish 4'];
	htAppServer['Resin'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4,Resin 4'];
	htAppServer['tcServer'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36925033,Tc Server 2.9.3','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/17987883,Tc Server 2.6.4'];

	spMatrix['6.2'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210,6.2 EE Matrix'];
	spMatrix['6.1'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a,6.1 EE Matrix'];
	spMatrix['6.0'] = ['https://www.liferay.com/documents/3133562/8435741/Compatibility+Matrix+v6.0.pdf/b58f3e64-30d8-400a-aba3-71c16e439fc9?,6.0 EE Matrix'];
	spMatrix['5.2'] = ['https://www.liferay.com/documents/3133562/8435737/Compatibility+Matrix+v5.2.pdf/4a81c299-132c-488d-b10e-b7546891a1d2?,5.2 EE Matrix'];
	spMatrix['5.1'] = ['https://www.liferay.com/documents/3133562/8435733/Support+Matrix+v5.1.pdf/91f9a892-6b3b-4ab2-abdc-14ceb1aceb1f,5.1 EE Matrix'];

	spSla['sla'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Service+Level+Response+and+Resolution+Times,SLA'];

	spComponent['Account Administration'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Handling+New+Developer+Requests+On+LESA,Handling Developer Requests SOP'];
	spComponent['Activation Key'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/License+Provisioning+SOP,Provisioning SOP'];
	spComponent['Authentication'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40359,SSO','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40366,LDAP'];
	spComponent['Calendar'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145,Calendar'];
	spComponent['Clustering'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40324,Clustering','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/17258,Distributed Caching Policy'];
	spComponent['Collaboration Suite'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40284,Chat Portlet'];
	spComponent['Developer Studio'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/49754,Developer Studio'];
	spComponent['Document Library'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/38992,CMS Repository','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40344,Office Solutions','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40351,WebDAV','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40331,Preview/Thumbnail Generator'];
	spComponent['LAR/Staging'] = [null];
	spComponent['Liferay API'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14673,Approaching Customization Tickets','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23456,Out of Scope Policy'];
	spComponent['Liferay Faces'] = [null];
	spComponent['Liferay Mobile SDK'] = [null];
	spComponent['Liferay Sync'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40300,Liferay Sync SOP'];
	spComponent['Patch Management'] = [null];
	spComponent['Portal Administration'] = [null];
	spComponent['Portal Deployment'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470,MySQL SOP'];
	spComponent['Searching/Indexing'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40308,Search/Indexing SOP'];
	spComponent['Security'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/25821,Security SOP'];
	spComponent['UI'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22089,Accessibility Requests'];
	spComponent['Upgrade'] = [null];
	spComponent['Web Content Management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40292,Text Editor SOP'];
	spComponent['Workflows/Forms'] = [null];

	spAppServer['WebSphere'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31534,WebSphere'];
	spAppServer['Tomcat'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31522,Tomcat'];
	spAppServer['Weblogic'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31570,Weblogic'];
	spAppServer['JBoss'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31960,JBoss'];
	spAppServer['Tcat'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32064,Tcat'];
	spAppServer['Glassfish'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31320,Glassfish'];
	spAppServer['Resin'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31988,Resin'];
	spAppServer['tcServer'] =['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32076,Tc Server'];

	spDatabase['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31478 ,Oracle'];
	spDatabase['Mysql'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470,MySQL'];
	spDatabase['DB2'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31688,DB2'];
	spDatabase['PostgreSQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31644,PostgreSQL'];
	spDatabase['Sybase'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31656,Sybase ASE'];
	spDatabase['SQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31668,SQL Server'];

	spJava['IBM'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31918,IBM JDK'];
	spJava['JRocket'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31996,Oracle JRockit JDK'];
	spJava['Java'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31968,Oracle JDK'];
	spJava['Java'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31945,Sun JDK'];

	spBrowser['FireFox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32010,Firefox Support Policy'];
	spBrowser['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31732,Chrome Support'];
	spBrowser['Internet Explorer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762,IE Support Policy'];
	spBrowser['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32039,Safari Support Policy'];

	spOs['Windows'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32055,Windows'];
	spOs['Red'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31911,Red Hat'];
	spOs['AIX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31895,IBM AIX'];
	spOs['Debian'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31812,Debian'];
	spOs['openSUSE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31840,OpenSUSE'];
	spOs['Ubuntu'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32047,Ubuntu'];
	spOs['CentOS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31902,CentOS'];
	spOs['Solaris'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31980,Solaris'];
	spOs['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31847,Oracle Linux'];
	spOs['Other'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32112,"Other" OS'];
	spOs['HP-UX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31820,HP-UX'];
	spOs['Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318,General Linux'];

	tsComponent['Account Administration'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Handling+New+Developer+Requests+On+LESA,Developer Requests SOP'];
	tsComponent['Activation Key'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767,Activation Key Issues'];
	tsComponent['Authentication'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14567,Authentication Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14577,Troubleshooting LDAP','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23077,SAML Issues'];
	tsComponent['Calendar'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145,Calendar Portlet for 6.2'];
	tsComponent['Clustering'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14666,Clustering Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/20851,Install LR in a clustered environment'];
	tsComponent['Collaboration Suite'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15089,Message Board Subscription Manager Issues'];
	tsComponent['Developer Studio'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/49754,Dev Studio'];
	tsComponent['Document Library'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/16339,Guide for Document and Media'];
	tsComponent['LAR/Staging'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14972,Beginner&#39;s Guide','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/48623,Staging Best Practices FAQs'];
	tsComponent['Liferay API'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15200,Javascript API Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15207,Portal-lmpl API Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/26676,Clustering API'];
	tsComponent['Liferay Faces'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/16207,Before Opening a Faces Ticket'];
	tsComponent['Liferay Mobile SDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15277,Mobile SDK Issues'];
	tsComponent['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/liferay-sync,Sync User Guide'];
	tsComponent['Patch Management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14769,Patch Troubleshooting','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/34646,Dockbar display error resolution'];
	tsComponent['Portal Administration'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18554,Web Forms Issues'];
	tsComponent['Portal Deployment'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/12510,Deployment Checklists'];
	tsComponent['Search/Indexing'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base?p_p_id=122_INSTANCE_KVeReewOnFUW&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&p_r_p_564233524_resetCur=true&p_r_p_564233524_categoryId=10995,Search/Indexing Articles'];
	tsComponent['Security'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14727,Security Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23077,SAML Issues'];
	tsComponent['UI'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43697018,Introduction to AlloyUI','https://support-kb.liferay.com/web/knowledge/knowledge-base?p_p_id=122_INSTANCE_KVeReewOnFUW&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&p_r_p_564233524_resetCur=true&p_r_p_564233524_categoryId=10999,UI Articles'];
	tsComponent['Upgrade'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14762,Upgrade Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/42787,Critical Upgrade Tickets','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/52365947,6.2 Upgrade: Known Issue'];
	tsComponent['Web Content Management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14926,WCM in 6.2'];
	tsComponent['Workflows/Forms'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18545,Kaleo Workflow Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22105,Kaleo Forms Issues'];

	tsJava['IBM'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/24963,JDK Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/47529,IBM J9 JDK Issues'];

	tsBrowser['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['Internet Explorer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];

	forumsComponent['Account Administration'] = [null];
	forumsComponent['Activation Key'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697603,Licensing','https://in.liferay.com/web/support/forums/-/message_boards/category/5951274,SME: Licensing'];
	forumsComponent['Authentication'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697603,Authentication'];
	forumsComponent['Calendar'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5951214,SME: Collab & DM'];
	forumsComponent['Clustering'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/16979473,Core Infrastructure'];
	forumsComponent['Collaboration Suite'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5951214,SME: Collab & DM'];
	forumsComponent['Developer Studio'] = [null];
	forumsComponent['Document Library'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4534050,Document Library'];
	forumsComponent['LAR/Staging'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['Liferay API'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5950852,SME: Platform'];
	forumsComponent['Liferay Faces'] = [null];
	forumsComponent['Liferay Mobile SDK'] = [null];
	forumsComponent['Liferay Sync'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5952429,SME: Sync Issues'];
	forumsComponent['Patch Management'] = [null];
	forumsComponent['Performance'] = [null];
	forumsComponent['Portal Administration'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4772239,Portal Administration'];
	forumsComponent['Portal Deployment'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4533678,Portal Deployment'];
	forumsComponent['Search/Indexing'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['Security'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5950866,SME: Security'];
	forumsComponent['UI'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5952679,SME: UI Issues'];
	forumsComponent['Upgrade'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/17065113,SME: Upgrades'];
	forumsComponent['Web Content Management'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697774,WCM','https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['Workflows/Forms'] = [null];

}

var htComponent = new Map(),
	htAppServer = new Map(),
	spMatrix = new Map(),
	spSla = new Map(),
	spComponent = new Map(),
	spAppServer = new Map(),
	spDatabase = new Map(),
	spJava = new Map(),
	spBrowser = new Map(),
	spOs = new Map(),
	tsComponent = new Map(),
	tsJava = new Map(),
	tsBrowser = new Map(),
	forumsComponent = new Map();

var supportPolicyLinks = [],
	howToLinks = [],
	troubleshootingLinks = [],
	supportForumsLinks = [],
	feedbackLinkContent = [];

var applicationServerText = "APPLICATION SERVER: ";
var componentText = "COMPONENT: ";
var dataBaseText = "DATABASE: ";
var lrVersionText = "LIFERAY VERSION: ";
var opSystemText = "OPERATING SYSTEM:  ";
var browserText = "PRIMARY BROWSER:  ";
var javaText = "JAVA VIRTUAL MACHINE: ";

var dataArray = [];

var floatMenu = document.createElement('div');
var outerDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Troubleshooting",
	"How to",
	"Support Policies",
	"Product Support Forums",
	"Service Level Agreement",
	"Was this tool helpful?"
];
