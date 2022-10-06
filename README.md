# ryhmaprojekti

Nettisivun luonnissa pääpaino ollut JavaScriptin käytössä.
Ohjelma on hajautettu edelleen pienempiin kokonaisuuksiin selkeyden että Flaskin vaatimusten mukaisesti.

- /static alikansiosta löytyy javascript ja css.
- /moduulit alikansiosta löytyy käytännössä jokainen sivuston osa omana javascript-funktionaan.
  - Sieltä löytyy myös oma moduulinsa etusivun ajastimelle, sekä yksinkertainen funktio datan käsittelyyn. Tällä hetkellä dataa ei vielä tallenneta
    mihinkään vaan se poistuu (kovakoodattuja lukuunottamatta) kun sivu päivitetään.
- /templates on Flaskin vaatima alikansio, josta löytyy index.html

.gitignore on sitä varten, ettei virtuaaliympäristöä turhaan pushata GitHubiin.
requirements.txt-tiedostosta löytyy vaadittavat kirjastot yms. Kun virtuaaliympäristö on asennettu ja käynnistetty, voi ne asentaa käyttämällä pip install -r requirements.txt

#### Dokumentaatio Bootstrapin käyttöön:

https://getbootstrap.com/docs/5.2/getting-started/introduction/

#### JavaScriptin EventListenerit:

https://www.w3schools.com/js/js_htmldom_eventlistener.asp

#### JavaScript moduulit:

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

#### JavaScript Promises ja .then(): (Käytetty handleData.js)

https://javascript.info/promise-basics#consumers-then-catch

> _Wazaaa!!!_

- Miro, 2022
