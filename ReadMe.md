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
		- **get** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter nichts.
		- Erwartet im Body nichts.
		- 
				{}
- *sendSlackByTaskId*
	- Sendet einen Task an Slack Channel. Task wird anhand seiner Id selektiert.
		- **get** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body nichts.
		- 
				{}
- *updateTaskById*
	- Updatet ein Task anhand seiner Id.
		- **get** - Request
		- http://localhost:3000/api/task/:taskId
		- Erwartet als Parameter eine taskId.
		- Erwartet im Body mindesten einen der zwei Parameter: name, description
		- 
				{ "name":  "Task Test 2 Update",
				  "description":  "Beschreibung Test 2 Update" }