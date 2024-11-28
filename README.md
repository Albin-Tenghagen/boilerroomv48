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


Level Ups (Frivilliga Utmaningar)
1. Caching av Data
Implementera caching för att minska antalet nätverksförfrågningar.
Spara hämtade nyhetsdata i LocalStorage eller en variabel.
Använd den cachade datan vid behov innan nya förfrågningar görs.
Hantera cache-invalidering baserat på tidsstämplar eller användarens interaktion.

2. Infinite Scroll
Implementera infinite scroll för att dynamiskt ladda fler nyheter när användaren scrollar ner på sidan.
Hantera asynkrona förfrågningar för att hämta nästa sida med nyheter.
Se till att användarupplevelsen är smidig och att fel hanteras korrekt.

3. Offline-stöd
Gör applikationen delvis funktionell när användaren är offline.
Använd Service Workers för att cacha nödvändiga filer och data.
Visa meddelanden eller indikationer när användaren är offline.

4. Avancerad Felhantering med Retries
Implementera en mekanism som försöker igen vid misslyckade nätverksförfrågningar.
Begränsa antalet försök och hantera backoff-strategier.
Använd asynkrona funktioner för att hantera retries effektivt.

5. Använda Externa Bibliotek för Asynkronitet
Utforska och använd externa bibliotek som Axios för att hantera HTTP-förfrågningar.
Jämför med fetch() och diskutera fördelar och nackdelar.
Implementera funktioner med hjälp av biblioteket och asynkron programmering.
