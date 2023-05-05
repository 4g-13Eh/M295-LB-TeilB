# Dokumentation APIs

### GET /*
* Erwartete Datentyp / Struktur: Keine
* Rückgabewert: Statuscode 404

### POST /login
* Erwartete Datentyp / Struktur: Email und Password "m295" im JSON-Format
* Rückgabewert: Statuscode 200 & JSON mit eingelogte Email bei erfolgreicher Login oder Statuscode 401 & JSON mit Error-Message

### GET /verify
* Erwarteter Datentyp / Struktur: keine
* Rückgabewert: Statuscode 200 & JSON mit eingelogte Email bei erfolgreicher Login oder Statuscode 401 & JSON mit Error-Message

### DELETE /logout
* Erwartete Datentyp / Struktur: Keine
* Rückgabewert: Statuscode 204 bei erfolgreichem Logout oder Statuscode 401 bei nicht erfolgreichem Logout

### GET /tasks
* Erwartete Datentyp / Struktur: Keine
* Rückgabewert: Statuscode 200 & JSON mit allen Tasks

### GET /tasks/{id}
* Erwartete Datentyp / Struktur: Keine
* Rückgabewert: Statuscode 200 & JSON Task oder Statuscode 404 falls Task nicht existiert

### POST /tasks
* Erwartete Datentyp / Struktur: JSON mit den Eigenschaften "id", "title", "Erstellungsdatum" & "Erfüllungsdatum"
* Rückgabewert: Statuscode 201 & JSON mit dem neu erstellten Task

### PUT /tasks/{id}
* Erwarteter Datentyp / Struktur: JSON mit den zu verändernden Eigenschaften
* Rückgabewert: Status 201 & JSON mit veränderte Update oder Statuscode 404 & JSON mit Errormessage

### DELETE /tasks/{id}
* Erwartete Datentyp / Struktur: Keine
* Rückgabewert: Statuscode 202 & json mit der gelöschten Task oder mit dem Statuscode 404 & Errormessage
