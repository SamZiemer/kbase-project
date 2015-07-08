<h1>KBase Project</h1>

<h2>Introduction</h2>
<p>This project adds additional functionality to the Liferay LESA project by including 
links to the Knowledge Base based on information provided by the page.
</p>

<h2>Installation</h2>
<p>
<h3>Chrome</h3> 
<ol>
	<li>In the scripts folder, download the ChromeKBaseScripts.zip.</li>
	<li>Install the <a href="https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en" target="_blank">Tamper Monkey</a> extension to chrome.</li>
	<li>Click the Tamper Monkey icon in chrome and select Dashboard.
	<li>Select the Utilities tab.</li>
	<li>Under the ZIP section, select "Choose File"</li>
	<li>Navigate to the location the zip was downloaded</li>
	<li>Click Import</li>
	<li>The script should be installed and usable on any LESA ticket page.</li>
</ol>

</p>

<p>
	<h3>FireFox <b>38+</b></h3>
	<ol>
		<li>In the scripts folder, download the FirefoxScript.js</li>
		<li>Install the <a href="https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/" target="_blank">Grease Monkey</a> add on to Firefox.</li>
		<li>Click the arrow next to the Grease Monkey icon in Firefox and select "Manage User Scripts"</li>
		<li>Click "New User Script"</li>
		<li>Name the script what you like, and add liferay.com to the Namespace box, then click ok to continue</li>
		<li>Copy the entire contents of the FirefoxScript.js downloaded in step 1, and paste it into the text editor pops up</li>
		<li>Click save, and close the text editor.</li>
		<li>Click preferences, and select "add" in the included pages section</li>
		<li>Paste "https://www.liferay.com/web/*/support*" in the box, and click ok.</li>
	</ol>
</p>

<h3>The script should now be active on your chosen browser on any lesa support ticket.</h3>