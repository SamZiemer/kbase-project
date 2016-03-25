var hidden = false;//true;
var collapsed = false;

//window.addEventListener('load', function() {
var jq = document.createElement('script');
jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
document.querySelector('head').appendChild(jq);

jq.onload = proceed;
//}, false);

function proceed() {
	getServerInfo();
	addLinksToArrays();
	getLinks();
	floatMenu.id = "floatMenu";
	hideButton.id = "hideButton";

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
				addItems(troubleshootingLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 1:
				addItems(howToLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 2:
				addItems(supportPolicyLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 3:
				addItems(supportForumsLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 4:
				addItems(slaLinks);
				a = document.createElement('a');
				a.href = slaLinks[0].link;
				a.text = slaLinks[0].name;
				if (a.text.length > maxChars) {
					a.title = slaLinks[0].title;
				}
				a.target = '_blank';
				menuItem[i].className = 'slaLink';
				menuItem[i].innerHTML = '';
				menuItem[i].appendChild(a);
				outerDiv[i].appendChild(menuItem[i]);
				addLinksForFeedback(slaLinks[0].link)
				break;
			case 5:
				var feedbackURL = createFeedbackURL("Yes");
				var d = document.createElement('div');
				a = document.createElement('a');
				a.href = feedbackURL;
				a.text = "Was this tool helpful?";
				a.target = '_blank';

				d.appendChild(a);
				menuItem[i].innerHTML = '';
				menuItem[i].className = 'feedBackLink';
				menuItem[i].appendChild(d);
				outerDiv[i].appendChild(menuItem[i]);
				break;
		}
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < categoryNames.length; i++) {
		listDiv.appendChild(outerDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Quick Links";
	var expandAllSpan = document.createElement("span");
	expandAllSpan.id = "expandAll";
	expandAllSpan.innerHTML = " (-)";
	h3.appendChild(expandAllSpan);

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	hideButton.innerHTML = plus;
	hideButton.onclick = showOrHideMenu;

	document.body.appendChild(hideButton);
	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:fixed;\
			top:15%;\
			right:0px;\
			width:0px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border:2px solid #808080;\
			z-index: 999;\
		}\
		#floatMenu h3 {\
			color:black;\
			font-weight:bold;\
			padding:3px;\
			margin:0;\
			background-color:#FFF;\
			border-bottom:1px solid #808080;\
			border-top:1px solid #808080;\
			font-size:18px;\
		}\
		#floatMenu div {\
			margin:0;\
			padding:0;\
			list-style:none;\
		}\
		#hideButton {\
			position:fixed;\
			top:12%;\
			right:0px;\
			width:40px;\
			margin:0;\
			padding:0;\
			z-index: 999;\
		}\
		.menuItem {\
			background-color:#FFF;\
			border-bottom:1px solid #808080;\
			border-top:1px solid #808080;\
			font-size:14px;\
			font-weight:bold;\
			padding-left:10px;\
		}\
		.subMenu {\
			border-bottom:1px solid #808080;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}\
		.qlAnchor {\
			width: 200px;\
			display: block;\
			white-space: nowrap;\
			text-overflow: ellipsis;\
			overflow: hidden;\
		}\
		.slaLink {\
			font-weight: bold;\
			border-top: 1px solid #808080;\
		}\
		.feedBackLink {\
			font-weight: bold;\
			border-bottom: 1px solid #808080;\
		}\
		#expandAll {\
			cursor:pointer;\
			color:blue;\
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
		jQuery('.menuItem').click(function() {
			$menuItem = jQuery(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	jQuery(function() {
		jQuery('.menuHeader').click(function () {
			if (collapsed) {
				document.getElementById("expandAll").innerHTML = " (-)";
				jQuery('.subMenu').show();
				collapsed =  false;
			} else {
				document.getElementById("expandAll").innerHTML = " (+)";
				jQuery('.subMenu').hide();
				collapsed = true;
			}
		});
	});

	function getServerInfo() {
		AUI().use('aui-base', 'node',
			function(A) {
				function serverDetails(typeNode) {
					var childNodes = typeNode.children;
					for (var i = 0; i < childNodes.length; i++) {
						var divNode = childNodes[i];
						var txtUpSpan = divNode.childNodes[1].innerHTML;
						var txtSbSpan = divNode.childNodes[3].innerHTML;
						if(txtUpSpan == "LR:") {
							dataArray[0] = txtSbSpan;
						} else if (txtUpSpan == "OS:") {
							dataArray[1] = txtSbSpan;
						} else if (txtUpSpan == "AS:") {
							dataArray[2] = txtSbSpan;
						} else if (txtUpSpan == "DB:") {
							dataArray[3] = txtSbSpan;
						} else if (txtUpSpan == "JVM:") {
							dataArray[5] = txtSbSpan;
						} else if (txtUpSpan == "BR:") {
							dataArray[4] = txtSbSpan;
						}
					}
					var spanNode = divNode.childNodes[3];
					return spanNode.innerHTML;

				}
				function filterComponent(path) {
					var indexOfUnderscore = path.indexOf("_");
					var indexOfPeriod = path.indexOf(".");
					var component = path.substring(indexOfUnderscore+1, indexOfPeriod);
					component = component.replace("_", " ");
					return component;
				}

				var nodeList = A.all(".sub-section.last");
				var typeNode = nodeList._nodes[0];
				serverDetails(typeNode);
				nodeList = A.all(".ticket-img");
				typeNode = nodeList._nodes[0];
				var componentPath = typeNode.attributes[2].nodeValue;
				dataArray[6] = filterComponent(componentPath);
				dataArray[7] = getCustomerId();
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

		completeFormURL = completeFormURL + "&entry.1550379905=";

		for (var a = 0; a < feedbackLinkContent.length; a++) {
			completeFormURL = completeFormURL + feedbackLinkContent[a] + " , "
		}

		return completeFormURL;
	}

	function showOrHideMenu() {
		if (hidden) {
			document.getElementById("floatMenu").style.width = "200px";
			hideButton.innerHTML = minus;
			hidden = false;
		}
		else {
			document.getElementById("floatMenu").style.width = "0px";
			hideButton.innerHTML = plus;
			hidden = true;
		}
	}

	function addItems(arrayOfLinks){
		for (var j = 0; j < arrayOfLinks.length; j++) {
			a = document.createElement('a');
			a.className = 'qlAnchor';
			a.href = arrayOfLinks[j].link;
			a.text = arrayOfLinks[j].name;
			if (a.text.length > maxChars) {
				a.title = arrayOfLinks[j].title;
			}
			a.target = '_blank';
			li = document.createElement('li');
			li.appendChild(a);
			subMenu[i].appendChild(li);

			addLinksForFeedback(arrayOfLinks[j].link)
		}
	}

	function getLinks() {
		var appServer = dataArray[2].split(" ")[0],
			browser = dataArray[4].split(" ")[0],
			component = dataArray[6],
			db = dataArray[3].split(" ")[0],
			java = dataArray[5].split(" ")[0],
			version = dataArray[0].split(" ")[0],
			osName = dataArray[1].split(" ")[0];

		//find correct how to links
		findLinks(htComponent, howToLinks, component);
		findLinks(htAppServer, howToLinks, appServer);

		//find correct support policy links
		findLinks(spMatrix, supportPolicyLinks, version);
		findLinks(spSla, slaLinks, "sla");
		findLinks(spComponent, supportPolicyLinks, component);
		findLinks(spAppServer, supportPolicyLinks, appServer);
		findLinks(spDatabase, supportPolicyLinks, db);
		findLinks(spJava, supportPolicyLinks, java);
		findLinks(spBrowser, supportPolicyLinks, browser);
		findLinks(spOs, supportPolicyLinks, osName);

		//find correct troubleshooting links
		findLinks(tsComponent, troubleshootingLinks, component);
		findLinks(tsJava, troubleshootingLinks, java);
		findLinks(tsBrowser, troubleshootingLinks, browser);

		//find correct forum links
		findLinks(forumsComponent, supportForumsLinks, component);
	}

	function findLinks(mapToPullFrom, arrayToAddTo, keyToFind) {
		var arrayOfLinks = mapToPullFrom[keyToFind];
		if ((arrayOfLinks != undefined) && (arrayOfLinks[0] != null)) {
			for (i = 0; i < arrayOfLinks.length; i++) {
				var link = [];
				var info = arrayOfLinks[i].split(',');
				link.link = info[0];
				link.name = info[1];
				link.title = info[1];
				arrayToAddTo[arrayToAddTo.length] = link;
			}
		}
	}
}

function addLinksToArrays() {
	htComponent['account administration'] = [null];
	htComponent['activation key'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616,Activation Key Deployment'];
	htComponent['authentication'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658,SAML Start Guide for 6.1+','https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/integrating-liferay-users-into-your-enterprise#ldap,Integrating Liferay Users','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/15472222,NTLM Setup'];
	htComponent['calendar'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-events-and-calendar-resources-with-liferays-c,Managing Events and Calendar'];
	htComponent['clustering'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14264973,Installation in a Clustered Environment','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/37840259,Managing Distributed Cache','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14624847,Echache Configuration','https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/liferay-clustering,Liferay Clustering'];
	htComponent['collaboration suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite,Collaboration Suite'];
	htComponent['developer studio'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27061762,Getting Started', 'https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-1/liferay-ide-and-liferay-developer-studio,IDE and Developer Studio', 'https://dev.liferay.com/develop/learning-paths/mvc/-/knowledge_base/6-2/developing-applications-with-liferay-developer-stu,Developing Applications'];
	htComponent['document library'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14370777,Document and Media Library Guide', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management,Document Management'];
	htComponent['lar staging'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/43449,Staging in 6.2: FAQ', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/staging-page-publication,Staging Page Publication'];
	htComponent['liferay api'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14262850,Thread Dumps from JVM','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/42637305,Liferay\'s Clustering API'];
	htComponent['liferay faces'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27550873,Faces Installation'];
	htComponent['liferay mobile sdk'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile,Mobile SDK'];
	htComponent['liferay sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/administering-liferay-sync,Administering Liferay Sync'];
	htComponent['patch management'] = ['https://www.liferay.com/group/customer/products/portal/patching,Portal Patching'];
	htComponent['portal administration'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14991389,Apply Fix Packs and Hotfixes','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30717691,Portal Properties for Separate Instances'];
	htComponent['portal deployment'] = ['https://dev.liferay.com/discover/deployment,Portal Deployment'];
	htComponent['search indexing'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/search-and-indexing,Search and Indexing','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/searching-for-content-in-liferay,Searching For Content','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14324221,Basic SOLR Setup Guide'];
	htComponent['security'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658,SAML Start Guide for 6.1+'];
	htComponent['ui'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43766704,6.2 UI Features'];
	htComponent['upgrade'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/38711583,Upgrading to 6.2','https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/upgrading-liferay,Upgrading Liferay'];
	htComponent['web content management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management,Web Content Management','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/building-a-site-with-liferay-web-content,Building a Site with WCM','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/searching-for-content-in-liferay,Searching for Content in Liferay','https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/using-the-asset-publisher,Using the Asset Publisher'];
	htComponent['workflows forms'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/kaleo-forms-defining-business-processes,Kaleo Forms Business Processes'];

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

	spSla['sla'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Service+Level+Response+and+Resolution+Times,Service Level Agreement'];

	spComponent['account administration'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Handling+New+Developer+Requests+On+LESA,Handling Developer Requests SOP'];
	spComponent['activation key'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/License+Provisioning+SOP,Provisioning SOP'];
	spComponent['authentication'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40359,SSO','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40366,LDAP'];
	spComponent['calendar'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145,Calendar'];
	spComponent['clustering'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40324,Clustering','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/17258,Distributed Caching Policy'];
	spComponent['collaboration suite'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40284,Chat Portlet'];
	spComponent['developer studio'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/49754,Developer Studio'];
	spComponent['document library'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/38992,CMS Repository','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40344,Office Solutions','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40351,WebDAV','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40331,Preview/Thumbnail Generator'];
	spComponent['lar staging'] = [null];
	spComponent['liferay api'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14673,Approaching Customization Tickets','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23456,Out of Scope Policy'];
	spComponent['liferay faces'] = [null];
	spComponent['liferay mobile sdk'] = [null];
	spComponent['liferay sync'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40300,Liferay Sync SOP'];
	spComponent['patch management'] = [null];
	spComponent['portal administration'] = [null];
	spComponent['portal deployment'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470,MySQL SOP'];
	spComponent['Searching/Indexing'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40308,Search/Indexing SOP'];
	spComponent['security'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/25821,Security SOP'];
	spComponent['ui'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22089,Accessibility Requests'];
	spComponent['upgrade'] = [null];
	spComponent['web content management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40292,Text Editor SOP'];
	spComponent['workflows forms'] = [null];

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
	spBrowser['IE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762,IE Support Policy'];
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

	tsComponent['account administration'] = ['https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Handling+New+Developer+Requests+On+LESA,Developer Requests SOP'];
	tsComponent['activation key'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767,Activation Key Issues'];
	tsComponent['authentication'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14567,Authentication Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14577,Troubleshooting LDAP','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23077,SAML Issues'];
	tsComponent['calendar'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145,Calendar Portlet for 6.2'];
	tsComponent['clustering'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14666,Clustering Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/20851,Install LR in a clustered environment'];
	tsComponent['collaboration suite'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15089,Message Board Subscription Manager Issues'];
	tsComponent['developer studio'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/49754,Dev Studio'];
	tsComponent['document library'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/16339,Guide for Document and Media'];
	tsComponent['lar staging'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14972,Beginner\'s Guide','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/48623,Staging Best Practices FAQs'];
	tsComponent['liferay api'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15200,Javascript API Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15207,Portal-lmpl API Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/26676,Clustering API'];
	tsComponent['liferay faces'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/16207,Before Opening a Faces Ticket'];
	tsComponent['liferay mobile sdk'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15277,Mobile SDK Issues'];
	tsComponent['liferay sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/liferay-sync,Sync User Guide'];
	tsComponent['patch management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14769,Patch Troubleshooting','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/34646,Dockbar display error resolution'];
	tsComponent['portal administration'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18554,Web Forms Issues'];
	tsComponent['portal deployment'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/12510,Deployment Checklists'];
	tsComponent['search indexing'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base?p_p_id=122_INSTANCE_KVeReewOnFUW&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&p_r_p_564233524_resetCur=true&p_r_p_564233524_categoryId=10995,Search/Indexing Articles'];
	tsComponent['security'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14727,Security Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/23077,SAML Issues'];
	tsComponent['ui'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43697018,Introduction to AlloyUI','https://support-kb.liferay.com/web/knowledge/knowledge-base?p_p_id=122_INSTANCE_KVeReewOnFUW&p_p_lifecycle=0&p_p_state=normal&p_p_mode=view&p_p_col_id=column-1&p_p_col_pos=1&p_p_col_count=2&p_r_p_564233524_resetCur=true&p_r_p_564233524_categoryId=10999,UI Articles'];
	tsComponent['upgrade'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14762,Upgrade Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/42787,Critical Upgrade Tickets','https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/52365947,6.2 Upgrade: Known Issue'];
	tsComponent['web content management'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14926,WCM in 6.2'];
	tsComponent['workflows forms'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18545,Kaleo Workflow Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22105,Kaleo Forms Issues'];

	tsJava['IBM'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/24963,JDK Issues','https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/47529,IBM J9 JDK Issues'];
	tsJava['Java'] = [null];

	tsBrowser['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['IE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];
	tsBrowser['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327,Approaching Browser Support Issues'];

	forumsComponent['account administration'] = [null];
	forumsComponent['activation key'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697603,Licensing','https://in.liferay.com/web/support/forums/-/message_boards/category/5951274,SME: Licensing'];
	forumsComponent['authentication'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697603,Authentication'];
	forumsComponent['calendar'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5951214,SME: Collab & DM'];
	forumsComponent['clustering'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/16979473,Core Infrastructure'];
	forumsComponent['collaboration suite'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5951214,SME: Collab & DM'];
	forumsComponent['developer studio'] = [null];
	forumsComponent['document library'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4534050,Document Library'];
	forumsComponent['lar staging'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['liferay api'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5950852,SME: Platform'];
	forumsComponent['liferay faces'] = [null];
	forumsComponent['liferay mobile sdk'] = [null];
	forumsComponent['liferay sync'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5952429,SME: Sync Issues'];
	forumsComponent['patch management'] = [null];
	forumsComponent['performance'] = [null];
	forumsComponent['portal administration'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4772239,Portal Administration'];
	forumsComponent['portal deployment'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4533678,Portal Deployment'];
	forumsComponent['search indexing'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['security'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5950866,SME: Security'];
	forumsComponent['ui'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/5952679,SME: UI Issues'];
	forumsComponent['upgrade'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/17065113,SME: Upgrades'];
	forumsComponent['web content management'] = ['https://in.liferay.com/web/support/forums/-/message_boards/category/4697774,WCM','https://in.liferay.com/web/support/forums/-/message_boards/category/5953181,SME: WEM Issues'];
	forumsComponent['workflows forms'] = [null];

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
	slaLinks = [],
	feedbackLinkContent = [];

var plus = "<img src='https://raw.githubusercontent.com/SamZiemer/kbase-project/master/images/Add.png' style='width:20px;height:20px;'>";
var minus = "<img src='https://raw.githubusercontent.com/SamZiemer/kbase-project/master/images/minus-xxl.png' style='width:20px;height:20px;'>";

var maxChars = 28;

var dataArray = ["", "", "", "", "", "", "", ""];

var floatMenu = document.createElement('div');
var hideButton = document.createElement('div');

var outerDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Troubleshooting",
	"How To",
	"Support Policies",
	"Product Support Forums",
	"Service Level Agreement",
	"Was this tool helpful?"
];
