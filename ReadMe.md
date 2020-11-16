# **Fortgeschrittene Webentwicklung**
Dies ist das Backend für die erste Hausaufgabe.

## Setup
- Docker muss auf der Hardware die genutzt wird installiert sein.
- In den Docker Einstellungen **muss**  unter FILE-SHARING  der Projektpfad angeben werden. 

**Hinweis:** Es wird unter Windows eine Pro-Lizenz benötigt. Da sonst das **FILE-SHARING nicht** aktiviert werden kann.
	
- Es muss eine .env - Datei erstellt werden. In dieser kann das Passwort und der Benutzer der Datenbank festgelegt werden, sowie der Namen der Datenbank.

**Hinweis:**  Es kann die .env_example zu .env umbenannt werden. Dies reicht aus, damit die Datenbank korrekt starten kann.

- Der Docker-Container wird mit folgendem Befehl gestartet:

		docker-compose up

## Routen
- Unter **localhost:3000/api** ist die Anwendung erreichbar.

### Task:

- *addLabelsByTaskId*
	- Fügt ein Task eine Label zu.
		- **post** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter nichts.
		- Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
		- 
				{  "labelList": [1, 2] }
- *createTask*
	- Erstellt einen Task.
		- **post** - Request
		- http://localhost:3000/api/task
		- Erwartet als Parameter nichts.
		- Erwartet im Body einen name und eine description.
		- 
				{  "name":"Task Besispiel",
				   "description":  "Beschreibung Beispiel" }
- *deleteLabelsByTaskId*
	- Löscht aus einem Task Labels heraus. Task wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body eine labelList. Diese beinhaltet eine Liste mit Label Ids.
		- 
				{  "labelList": [1, 2] }
- *deleteTaskById*
	- Löscht einen Task. Task wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllLabesByTaskId*
	- Gibt alle Labels eines Task wieder. Task wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/task/label/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTasks*
	- Gibt alle Task zurück.
		- **get** - Request
		- http://localhost:3000/api/task
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTrackingsByTaskId*
	- Gibt alle Trackings eines Task wieder. Task wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/task/tracking/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *getTaskById*
	- Gibt einen Task anhand seiner Id zurück.
		- **get** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *sendSlackAll*
	- Sendet alle Task an Slack Channel.
		- **post** - Request
		- http://localhost:3000/api/task/slack
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *sendSlackByTaskId*
	- Sendet einen Task an Slack Channel. Task wird anhand seiner Id selektiert.
		- **post** - Request
		- http://localhost:3000/api/task/slack/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *updateTaskById*
	- Updatet ein Task anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body mindesten einen der zwei Parameter: name, description
		- 
				{ "name":  "Task Test 2 Update",
				  "description":  "Beschreibung Test 2 Update" }



### Label:

- *createLabel*
	- Erstellt ein Label.
		- **post** - Request
		- http://localhost:3000/api/label
		- Erwartet als Parameter nichts.
		- Erwartet im Body einen name.
		- 
				{  "name":  "Label Test 4" }
- *deleteLabelById*
	- Löscht ein Label. Label wird mit seiner Id selektiert.
		- **delete** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllLabels*
	- Gibt alle Labels zurück.
		- **get** - Request
		- http://localhost:3000/api/label
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTasksByLabelId*
	- Gibt alle Task eines Labels wieder. Label wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/label/task/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body nichts.
		- 
				{}
- *getLabelById*
	- Gibt einen Label anhand seiner Id zurück.
		- **get** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelid.
		- Erwartet im Body nichts.
		- 
				{}
- *updateLabelById*
	- Updatet ein Label anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/label/:labelId
		- Erwartet als Parameter eine labelId.
		- Erwartet im Body name.
		- 
				{ "name":  "Label Test 2 Update" }

### Tracking:

- *createTracking*
	- Erstellt ein Tracking.
		- **post** - Request
		- http://localhost:3000/api/tracking
		- Erwartet als Parameter nichts.
		- Erwartet im Body eine description und eine taskId von einem existierenden Task.
		- 
				{  "description":  "Tracking Test 4",
				   "task":  "55" }
- *deleteTrackingById*
	- Löscht ein Tracking anhand seiner Id.
		- **delete** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body nichts.
		- 
				{}
- *getAllTrackings*
	- Gibt alle Trackings zurück.
		- **get** - Request
		- http://localhost:3000/api/tracking
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *getTrackingById*
	- Gibt ein Tracking anhand seiner Id zurück
		- **get** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body nichts.
		- 
				{}
- *updateTrackingById*
	- Updatet ein Label anhand seiner Id.
		- **patch** - Request
		- http://localhost:3000/api/tracking/:trackingId
		- Erwartet als Parameter eine trackingId.
		- Erwartet im Body mindesten einen der drei Parameter: description, timeStart, timeEnd
		- 
				{"description":  "Tracking Test 2 Update" }
