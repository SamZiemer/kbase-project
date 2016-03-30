<h1>KBase Project</h1>

<p>
	<h2>Introduction</h2>
	<p>This project allows a list of links to the Knowledge Base, separated into relevant categories, to be added to the side of any LESA support ticket. Each category can be collapsed by clicking on the category header in addition, the entire list can be collapsed by click on the "Quick Links" text.</p>
<p>

<p>
	<h2>Installation</h2>
	<p>
		<h3>Chrome</h3> 
		<ol>
			<li>Click on the “Scripts” folder.</li>
			<li>Click on the file “ChromeKBaseScripts.zip” file to access the raw data.</li>
				<ul>
					<li>For version 3, click on "LesaLinksVersion3_Chrome.zip"</li>
				</ul>
			<li>Click on the “View Raw” button to download the file.<ul><li>You do not need to extract the files.</li></ul></li>
			<li>Install the <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en" target="_blank">Tamper Monkey</a> extension to chrome.
				<ul>
					<li>Click the “Add to Chrome” button.</li>
				</ul>
			</li>
			<li>After installing the extension, click on the Tampermonkey icon which is located to the right of your search bar. </li>
			<li>Click on the “Dashboard” icon.
			<li>Click on the “Utilities” tab..</li>
			<li>Under the ZIP section, select "Choose File"</li>
			<li>Under the Zip section, click on the “Choose File” button and select the “ChromeKBaseScripts.zip” file you downloaded earlier.</li>
			<li>Click on the “Import” button.</li>
			<li>Navigate to a LESA ticket page and the extension will appear on the right hand side.</li>
		</ol>
	</p>

	<p>
		<h3>FireFox <b>38+</b></h3>
		<ol>
			<li>Check to see that you have a version of Firefox 38 or above.</li>
			<li>Click on the “Scripts” folder.</li>
			<li>Click on the “FirefoxScript.js” file to access the raw data.</li>
			<li>Click on the “Raw” button.</li>
			<li>Select All and Copy the raw script.</li>
			<li>Install the <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/" target="_blank">Grease Monkey</a> add on to Firefox.</li>
				<ul>
					<li>Click the “+ Add to Firefox” button and “Install Now” button.</li>
					<li>Click on the “Restart Now” button to restart your browser.</li>
				</ul>
			</li>
			<li>After installing the extension, click on the arrow to the right of the Greasemonkey icon </li>
			<li>Under the dropdown menu, click on “New User Script…” icon.</li>
			<li>When the pop-up appears, name the script whatever you like in the top field.</li>
			<li>Under Namespace, type “liferay.com” and then click “OK” to continue.</li>
			<li>Under the text editor pop-up, paste the “FirefoxScript.js” script you copied earlier on top of any existing script in the text editor.
				<ul>
					<li>If you have difficulty pasting, type ‘allow pasting’ in your text editor and you will be able to paste any content afterwards.</li>
				</ul>
			</li>
			<li>Click the “Save” button and close the text editor.</li>
			<li>Click on the arrow next to the Greasemonkey icon (in step 8) and now click on the “Manage User Scripts..” icon.</li>
			<li>Click on the “Options” button to the right of the script you just created.</li>
			<li>Under the “User Settings” tab, click on the “Add…” button to include a page.</li>
			<li>Enter https://www.liferay.com/web/*/support* as the URL and click the “OK” button.</li>
			<li>Click the “OK” button again to close the pop-up window.</li>
			<li>Navigate to a LESA ticket page and the extension will appear on the right hand side.</li>
		</ol>
	</p>

	<h3>The script should now be active on your chosen browser on any lesa support ticket.</h3>
</p>

