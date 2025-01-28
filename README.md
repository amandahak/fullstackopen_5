# Full Stack Open 5. osan -repository: Blogilista

Tämä repository sisältää Full Stack Open -kurssin osan 5 blogilistasovelluksen. Back-endinä toimii osan 4. [reporsitory](https://chatgpt.com/c/677d4880-f5c8-800b-90f7-e65f6c9f0894).


* [Linkki kurssialustalle](https://fullstackopen.com/)
* [Kurssin 0. 1. ja 2. osuuksien repository](https://github.com/amandahak/fullstackopen_ah)
* [3. osan frontendin repository](https://github.com/amandahak/fullstackopen_3_frontend)
* [3. osan backendin repository](https://github.com/amandahak/fullstackopen_3_backend)
* [4. osan repository](https://github.com/amandahak/fullstackopen_4)
* E2E -testit sisältävä [repository](https://github.com/amandahak/fullstackopen_5_e2e)


Osa 5 keskittyy React-sovellusten testaamiseen ja frontendin tokeneihin perustuvaan autentikaatioon. 

## Osa 5 - React-sovellusten testaaminen

- Kirjautuminen frontendissä
- props.children ja proptypet
- React-sovellusten testaaminen
- End to end -testaus: Playwright

## Ominaisuudet

* **Kirjautuminen:** Käyttäjät voivat kirjautua sisään ja ulos sovelluksesta. 
* **Blogien hallinta:** 
    * Näytä blogilista, jossa blogit on järjestetty tykkäyksien lukumäärän mukaiseen järjestykseen 
    * Lisää uusi blogi kirjautuneena käyttäjänä
    * Tykkää blogeista kirjautuneena käyttäjänä
    * Poista blogi (vain blogin lisännyt käyttäjä)
* **Blogin tykkäysten hallinta**
* **E2E-testitt:** Sovelluksen toiminnallisuuden testaaminen käyttöliittymän kautta Playwrightin avulla

## Käyttöönotto

1. **Kloonaa repository:**
```bash
git clone git@github.com:amandahak/fullstackopen_5.git
```
2. **Asenna riippuvuudet:**
```bash
npm install
```
## Kehitystilan käynnistys

```bash
npm run dev
```
Frontend on saatavilla osoitteessa: ´http://localhost:5173`

## Testaus

**Suorita testit:** 

```bash
npm test
```

**Suorita end-to-end (E2E) testit** Playwrightilla (erillinen repo)