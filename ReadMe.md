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

###	Task:

- Task erzeugen:
	- **post** - Request
	- http://localhost:3000/api/task
	- Im Body müssen folgende Parameter angegeben werden:

			{  "name":"Task Besispiel",
			   "description":  "Beschreibung Beispiel" }
- Task löschen:
	- **delete** - Request
	- http://localhost:3000/api/task/:taskId
	-  Es muss die TaskId übergeben werden, die gelöscht werden soll.