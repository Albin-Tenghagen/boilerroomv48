Api fetch från polisAPI är implementerad, och promise.all har integrerats i fetchApiResults för att skapa en asynkron funktion som förbättrar prestandan. På grund av promise.all och await så kan fetch requesten köras parallelt med varandra.

Vi har en switch-case med type = "all" som argument som kollar igenom vad som ska sökas på sidan. T.ex. så är den på "all" som start value där detta blir då hem-sidan. sen om man söker på något som t.ex. Tesla så ändras detta value från "all" till "Tesla" därmed får man resultat om just "sTesla" osv.. sen är economyCategory och topHeadlines unikt tillagda i switchcasen då de har andra endpoints. 


Inom funktionen så används try and catch för att försöka fetcha och konvertera datan från api:erna till JavaScript object, om detta ej går så kommer en if sats kolla vilken fetch som misslyckades, som sedan kallar en funktion med argumentet av den specifika responset. Därefter kommer ett throw new Error som baseras på statusen (404,401,429 etc.)

I catch blocket kommer en annan funktion kallas på som erbjuder användarvänlig felhantering som tar fel meddelandet från responseMessage och därifrån skapar en container för att displaya vad för slags error som uppstod, och vilken status kod de nämnda erroret innehåller. Med setTimeout så försvinner error meddelandet efter 5 sekunder. 


Det finns 6 knappar exklusive sök knappen på hemsidans header. Där man kan trycka för att söka på just de ämnen. Annars kan man använda sökrutan för att söka mer specifik eller på annat som inte finns med i knapp-valen.  Home tar dig till hem-sidan där den fetchar api från topheadlines och även economy samt polisAPI:et. Tech, apple och tesla är samma sak som att man faktiskt söker på de i sökrutan. så får man 100 artiklar om de ämnen. Economy och topheadlines är lite annorlunda och fetchar endast 20 artiklar och har andra endpoints än bara sök-parameter som ändras.


