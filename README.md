Detta projekt är beroende av Axios kontrollera att node.js finns i systemet annars ladda ner det här https://nodejs.org/en

1. klona repot git clone https://github.com/Albin-Tenghagen/boilerroomv48.git

2. byt till rätt branch med hjälp av git checkout PT/Axios

3. skriv i terminalen: npm install axios

Nya funktioner i projeket:

1. I det tidigare projektet anvädnes fetch för att hämta data från apier. I det här projektet har jag bytt ut fetch mot Axios för att förbättra hanteringingen av api anrop

2. Implementerat funktionen cancel i bibloteket Axios för att förbättra
   felhantering så att det inte anropas apier i onödan vid upprepad
   klickningar av knappar och avbryter även anrop ifall användaren 
   ångrar sig vid ett knapp tryck och tryck på en annan knapp. 
