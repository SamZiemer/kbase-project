AUI().use("aui-base", "node",
	function(A) {
		var lrVersionText = "LIFERAY VERSION: ";
		var opSystemText = "OPERATING SYSTEM: ";

		var applicationServerText = "APPLICATION SERVER: ";
		var jvmText = "JAVA VIRTUAL MACHINE: ";

		var dataBaseText = "DATABASE: ";       
		var browserText = "PRIMARY BROWSER: ";

		function serverType(serverInfo) {
			var serverTypeNode = A.all(".content-column-content");
			var version = '';

			serverTypeNode.each(
				function() {
					var innerHTML = this.get("innerText");
					if (innerHTML.indexOf(serverInfo) > -1) {
						version = innerHTML;
					}
				}
			);

			if (version) {
				var begin = version.indexOf(serverInfo) + serverInfo.length,
				end = version.indexOf('\n');

				if (serverInfo == opSystemText) {
					end = version.indexOf('\n') + begin;
				}
				version = version.substring(begin, end);

				return version;
			}

			return serverType;
		}

		function replaceText(appServer, textToChange, link) {
			var serverTypeNode =  A.all(".content-column-content");
			var version ='';

			serverTypeNode.each(
				function() {
					var innerHTML = this.get("innerText");
					if (innerHTML.indexOf(appServer) > -1) {
						version = innerHTML;
						if(version){
							var appServerHtml = version;
							if (appServer == lrVersionText) {
								var changingText = serverType(opSystemText);

								appServerHtml = appServerHtml.replace(appServer, "<b>"+appServer+"</b>");
								appServerHtml = appServerHtml.replace(textToChange, link + textToChange + "</a><br>");

								appServerHtml = appServerHtml.replace(opSystemText, "<b>"+opSystemText+"</b>");
								appServerHtml = appServerHtml.replace(changingText, link + changingText + "</a>");
							}
							else if (appServer == applicationServerText) {
								appServerHtml = appServerHtml.replace(appServer, "<b>"+appServer+"</b>");
								appServerHtml = appServerHtml.replace(textToChange, link + textToChange + "</a><br>");
								appServerHtml = appServerHtml.replace(jvmText, "<b>"+jvmText+"</b>");
							}
							else if (appServer == dataBaseText) {
								appServerHtml = appServerHtml.replace(appServer, "<b>"+appServer+"</b>");
								appServerHtml = appServerHtml.replace(textToChange, link + textToChange + "</a><br>");
								appServerHtml = appServerHtml.replace(browserText, "<b>"+browserText+"</b>");

							}
							
							this._node.innerHTML = appServerHtml;
						}
					}
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

		var dataArray = [];
		var arrayOfConstants = [];
		var arrayofLinks = [];

		arrayOfConstants[arrayOfConstants.length] = lrVersionText;
		arrayOfConstants[arrayOfConstants.length] = applicationServerText;
		arrayOfConstants[arrayOfConstants.length] = dataBaseText;

		dataArray[dataArray.length] = serverType(lrVersionText);
		dataArray[dataArray.length] = serverType(applicationServerText);
		dataArray[dataArray.length] = serverType(dataBaseText);

		var lrVers = dataArray[0];

		var kbBase = "https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-";

		arrayofLinks[arrayofLinks.length] = "<a href='"+kbBase+"glassfish-4' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='"+kbBase+"jboss-7-1' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='"+kbBase+"tomcat-7' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='"+kbBase+"oracle-weblogic-12c-12-1-2-and-h' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='"+kbBase+"websphere-8-5' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='https://www.liferay.com/documentation/liferay-portal/6.1/user-guide/-/ai/lp-6-1-ugen11-installing-liferay-on-mule-tcat-0' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='https://www.liferay.com/community/wiki/-/wiki/Main/tcserver+Configuration+and+Tips' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='https://www.liferay.com/community/wiki/-/wiki/Main/Database+Portal+Properties#section-Database+Portal+Properties-mysql' target='_blank'>";
		arrayofLinks[arrayofLinks.length] = "<a href='https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210' target='_blank'>";

		for (index = 0; index < dataArray.length; index++) {
			var linkToAdd;

			if (arrayOfConstants[index] == applicationServerText) {
				linkToAdd = getLink(dataArray[index]);

			}
			else if (arrayOfConstants[index] == dataBaseText) {
				linkToAdd = "<a href='https://www.liferay.com/community/wiki/-/wiki/Main/Database+Portal+Properties' target='_blank'>";
			}
			else if (lrVers.indexOf("2") > -1)  {
				linkToAdd = "<a href='https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210' target='_blank'>";
			}
			else {   
				linkToAdd ="<a href='https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a' target='_blank'>";
			}

			replaceText(arrayOfConstants[index], dataArray[index], linkToAdd);
		}
	}
);
