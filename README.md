Krav för Projektet
Grundläggande Funktionalitet
1. Omstrukturera Datahämtning med Promises
Refaktorisera era befintliga fetch()-anrop för att använda Promises.
Säkerställ att alla nätverksförfrågningar hanteras med Promises.
Använd .then() och .catch() för att hantera lyckade förfrågningar och fel.
2. Implementera Async/Await
Skriv om era Promise-kedjor med async/await för att förenkla koden.
Använd async-funktioner och await-operatorn för att hantera asynkrona operationer.
Implementera try och catch för att hantera fel i asynkrona funktioner.
3. Förbättrad Felhantering
Implementera robust felhantering i alla asynkrona funktioner.
Hantera nätverksfel, felaktiga svar och undantag.
Visa användarvänliga felmeddelanden eller notifieringar vid problem.
4. Optimera Asynkrona Förfrågningar
Använd Promise.all() för att hantera flera asynkrona förfrågningar parallellt när det är lämpligt.
T.ex., hämta nyheter från flera källor samtidigt.
Förbättra applikationens prestanda genom att minimera laddningstider.
5. Ny Funktionalitet: Realtidsuppdateringar (Valfritt men rekommenderat)
Implementera en funktion som periodiskt hämtar de senaste nyheterna utan att användaren behöver uppdatera sidan.
Använd setInterval() i kombination med asynkrona funktioner.
Se till att hantera resursanvändning och undvika överbelastning av API:et.
Validering och Felhantering
Kontrollera att alla asynkrona operationer har korrekt felhantering.
Hantera oväntade värden och undantag som kan uppstå under exekveringen.
Validera användarinmatning innan asynkrona förfrågningar skickas.
