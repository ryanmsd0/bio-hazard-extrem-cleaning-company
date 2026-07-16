# CleanCore Decon — Contexte projet & tickets

> **Mode d'emploi :** pose ce fichier à la racine du repo et renomme-le `CLAUDE.md`.
> Claude Code le lit automatiquement à chaque session — plus besoin de recoller le contexte
> ni d'envoyer des screenshots. Ensuite tu bosses ticket par ticket : « fais le ticket A2 ».

---

## 1. Le projet

Site vitrine pour **CleanCore Decon** (nom légal : PureBio Decon Corp), entreprise de
**nettoyage biohazard / trauma / scènes de crime** à Los Angeles.

- Domaine : `purebiodecon.com` — la marque affichée est « CleanCore Decon ».
  **C'est intentionnel** (nom d'emprunt voulu par le client). Ne pas « corriger », ne pas signaler.
- Stack : HTML/CSS/JS statique, déployé sur Vercel.
- Contact : (562) 568-6032 · `contact@purebiodecon.com`
- Fondateur : Alex. Associé : Christian. Équipe : ~3 personnes.
- 11 pages service dans `/landing-page/`, plus `index.html`, `why-choose-us.html`,
  `about-us.html`, `contact.html`.

### Qui est le visiteur

Une personne en état de choc, **à 2 h du matin**, sur un iPhone, qui vient de découvrir
quelque chose d'atroce chez elle. Elle ne lit pas. Elle cherche un numéro et une raison
de faire confiance en 3 secondes.

Deuxième public, aujourd'hui quasi absent du site et beaucoup plus rentable :
**property managers, assureurs/adjusters, agents immobiliers, gouvernement/FEMA.**
Une famille appelle une fois dans sa vie ; un property manager appelle 4 fois par an, à vie.

---

## 2. Les deux règles du projet

### Règle 1 — Aucune affirmation sans source

Chaque fait sur le site a un statut :

| Statut | Sens |
|---|---|
| **VÉRIFIÉ** | On a une preuve. |
| **DIT PAR ALEX** | Il l'a écrit, dans le Content Brief ou ses Website Notes. |
| **BROUILLON** | On l'a inventé pour montrer la direction. |

**Un BROUILLON ne part jamais en prod.** La quasi-totalité des tickets ci-dessous, c'est ça :
des brouillons qui ont pris le statut de vérité en cours de route.

> **Si une info te manque : arrête-toi et demande. N'invente jamais.**
> Pas un chiffre, pas une ville, pas un délai, pas un avis client, pas une certification.
> C'est exactement comme ça que les problèmes de ce doc sont arrivés.

### Règle 2 — L'esthétique ne se dégrade pas

Le niveau graphique du site est au-dessus du marché local, et c'est un actif du client.
**Aucun ticket ici ne demande de rendre le site plus fade.** Quand un ticket touche au visuel,
il donne une alternative qui garde le style. Si un fix te force à casser le design,
c'est que le fix est mauvais — dis-le plutôt que de dégrader.

---

## 3. Ordre de travail

```
1. B3 + B4   ← débloquent la sensation. À faire AVANT toute animation.
2. Bloc A    ← les faits. Bloquant pour la mise en ligne.
3. B1, B2    ← les bugs restants.
4. Bloc C    ← conversion.
5. D2, D3    ← motion.
6. E1, E2    ← finition.
```

Un ticket = un commit. Ne groupe pas.

**A9 et A10 sont BLOQUÉS** : on attend une réponse du client. N'y touche pas.

---

## 4. BLOC A — Les faits

### A1 — Retirer la promesse « 90 minutes » généralisée

**Problème.** « Response within 90 minutes » est en H1, dans le `<title>`, dans la meta
description, et répété ~20× — alors que le site annonce une couverture de 9 comtés.
Alex l'a relevé lui-même : *« I feel like some people will find this misleading especially
if they live in san diego »*.

**Fichiers.** `index.html`, `about-us.html`, `why-choose-us.html`, les 11 `/landing-page/*.html`.

**À faire.**
- H1 → `Biohazard & extreme cleaning. Rapid 24/7 emergency response.`
- `<title>` et `meta[name=description]` : retirer « 90-Min Response » / « response within 90 minutes ».
- Garder le délai **uniquement** cadré sur LA County :
  `Typical response within 90 minutes across LA County`
- Retirer aussi de la bulle SMS (voir A5).

**Fini quand.** `grep -ri "90 min" .` ne renvoie que des occurrences suivies de
« across LA County ».

---

### A2 — Supprimer « little to no out-of-pocket »

**Problème.** Content Brief Q09 : *« Can we honestly say "$0 out-of-pocket"? »* →
réponse d'Alex : **« take off »**. C'est toujours là 8 fois. Zone la plus sensible du site
(assurance + prix).

**Search & replace exact.**

| Chercher | Remplacer par |
|---|---|
| `We handle your insurance claim, often with little to no out-of-pocket cost` | `We work directly with your insurance carrier whenever applicable` |
| `often with little to no out-of-pocket cost to you` | *(supprimer la fin de phrase)* |
| `often with little to no out-of-pocket cost` | *(supprimer)* |
| `often with little to nothing out of pocket` | *(supprimer)* |
| `and help with your deductible` | *(supprimer)* |

La formule de remplacement est celle qu'**Alex a écrite lui-même** dans ses Website Notes.

**Fini quand.** `grep -ri "out-of-pocket\|out of pocket\|deductible" .` → 0 résultat.

---

### A3 — Remplacer l'adresse iCloud

**Problème.** `alex.a.robles@icloud.com` est affiché dans le footer et le bloc contact.
Sur un site qui vend la discrétion professionnelle, ça casse tout.

**À faire.** Partout : `alex.a.robles@icloud.com` → `contact@purebiodecon.com`
(texte affiché **et** `href="mailto:"`).

**Fini quand.** `grep -ri "icloud" .` → 0 résultat.

---

### A4 — Découpler la vitesse de la couverture

**Problème.** « Nine counties, dispatched 24/7 » + « 24/7 emergency dispatch across all nine
counties » + une promesse de 90 min. Imperial, Kern et San Diego sont à 3-8 h de route.
L'équipe fait 3 personnes.

**À faire.** On **garde la carte** — Alex veut « Southern California », c'est son ambition,
et le composant est réussi.
- LA County (état sélectionné) → `Typical response within 90 minutes`
- Tous les autres comtés → `24/7 dispatch — call for ETA`
- Remplacer la ligne `24/7 emergency dispatch across all nine counties` par
  `24/7 emergency dispatch across Southern California`
- **`15 cities served` est un chiffre inventé.** Le mettre en placeholder jusqu'à ce
  qu'Alex donne la vraie liste. Ne pas inventer de villes.

---

### A5 — Labelliser la conversation SMS

**Problème.** Sur `/landing-page/biohazard-cleanup.html`, section « This is how every call goes » :
une conversation horodatée 2:14 AM, badge « Online now », avec *« They just arrived. Thank you. »*
et *« I can't thank you enough. »* Aucun client n'a écrit ça. Un visiteur la lit comme réelle.

**À faire.** Le composant est bon, on le garde tel quel.
- Ajouter au-dessus de la fenêtre, en `--muted`, petit :
  `Illustration — how a typical call unfolds`
- Retirer « response within 90 minutes » de la bulle (voir A1).

---

### A6 — Retitrer le bloc before/after

**Problème.** Titre : *« Real results, from families who trusted us with the worst days »* —
sur des images stock/générées. Le client **a** de vraies photos (Content Brief Q22 = « yes »),
elles ne sont juste pas encore transmises.

**À faire (intérim).**
- Titre → `The transformation a certified crew delivers`
- Sous les sliders, en petit : `Representative images`
- Prévoir le swap : ne pas hardcoder les chemins, garder un tableau de config
  pour brancher les vraies photos quand elles arrivent.

**Fichiers.** `index.html`, `why-choose-us.html`, `/landing-page/*.html`.

---

### A7 — Footer : lien mort

**Problème.** « Water & Fire Damage » est encore dans le footer alors que Water Damage a été
retiré du site (Content Brief Q06 = *« Water Damage Remove »*). Le lien pointe vers une
section morte. Le footer liste 5 services quand le site en a 11.

**À faire.** Retirer le lien `Water & Fire Damage`. Aligner la liste sur les services réels
une fois A9 débloqué.

---

### A8 — Citation du fondateur

**Problème.** `about-us.html` et `index.html` affichent 40 mots entre guillemets signés
« Alex — Founder ». Sa réponse à *« Why did you start CleanCore? »* était : **« Family »**.
Un mot. Le reste est inventé.

**À faire.** Garder le bloc et le design. Retirer les guillemets et la signature tant que
le client n'a pas approuvé ou réécrit le texte. Placeholder neutre en attendant.

---

### A9 — 🔴 BLOQUÉ — Liste finale des services

Trois versions circulent :
- Content Brief Q06 : retirer Water Damage → 11 services
- Site live : 11 services
- Website Notes d'Alex : **12 services**, avec Water Damage Cleanup de retour,
  plus `Infectious Disease Cleanup` et `Structure Tear-Out` qui n'existent nulle part.

**Ne touche pas à la section services.** On attend qu'Alex coche la liste finale
et la classe de la plus demandée à la moins demandée (le classement sert à C2).

---

### A10 — 🔴 BLOQUÉ — Badges de certification

**Problème.** « Licensed · Bonded · Insured » apparaît ~12×, et le tableau comparatif attaque
les concurrents là-dessus (*« Unlicensed work can void your insurance claim »*). Le client
est en train d'ouvrir sa structure — les numéros arrivent.

**À faire maintenant.** Construire le **composant badges**, vide, prêt à remplir.
Alex a donné la liste exacte qu'il veut dans ses notes :
```
IICRC Certified Firm
OSHA Trained
EPA Lead-Safe Certified Firm
California Trauma Scene Waste Management Practitioner
```
**En attendant :** pas de « Licensed » tout seul sans rien derrière. Ne remplis aucun numéro.

---

## 5. BLOC B — Les bugs

### B3 — Hover-only → trous sur mobile ⚡ COMMENCER PAR LÀ

**Problème.** Cartes service, lignes du tableau, boutons : les interactions ne vivent qu'au
`:hover`. Sur iPhone il n'y a pas de hover — soit il ne se passe rien, soit l'état reste
collé après le tap.

**À faire.**
```css
@media (hover: hover) and (pointer: fine) {
  .card:hover { /* tout le hover existant vient ici */ }
}
/* équivalent tactile, pour tout le monde */
.card:active, .btn:active { transform: scale(.98); transition: transform 80ms ease-out; }
```
**Règle :** aucune information ne doit être accessible **uniquement** au hover.
Si un contenu n'apparaît qu'au survol, il est invisible sur mobile → le rendre visible.

---

### B4 — Poids des images ⚡ COMMENCER PAR LÀ

**Problème.** `why-choose-us.html` empile 11 sliders avant/après = **22 images pleine taille**,
toutes chargées d'un coup. C'est la cause principale du manque de fluidité sur iPhone.
Le hero est aussi un gros JPG non optimisé.

**À faire.**
- `loading="lazy"` + `decode="async"` sur tout ce qui est sous la ligne de flottaison.
  **Jamais sur le hero** (ça pénalise le LCP).
- AVIF/WebP avec `srcset` + `sizes`.
- `width`/`height` ou `aspect-ratio` sur **chaque** image → tue le layout shift.
- Cible : **< 1,5 Mo sur la première vue**.

---

### B1 — z-index : le CTA passe sous la nav

**Problème.** Le CTA flottant « Call (562… » est tronqué derrière le header.
Conflit `position: sticky` / z-index.

**À faire.** Un seul élément sticky par zone. Les z-index définis **une fois**, en tokens :
```css
:root { --z-nav: 100; --z-cta: 90; --z-modal: 200; }
```
Vérifier à toutes les largeurs, pas seulement 1440.

---

### B2 — Compteurs About à zéro

**Problème.** Le HTML de `about-us.html` contient littéralement `0/7`, `0`, `0`, `0%`.
Les vrais chiffres n'existent que dans le JS de count-up. Si le JS ne part pas
(IntersectionObserver qui ne trigger pas, onglet en arrière-plan, connexion lente),
le visiteur lit **« 0 Counties across SoCal »** et **« 0% Discretion, always »**.
Et Google lit toujours `0`.

**À faire.** Inverser la logique :
```html
<span class="count" data-from="0">24</span>  <!-- valeur finale EN DUR -->
```
Le JS lit la valeur finale, repart de `data-from`, et anime vers elle au reveal.
Si le JS ne part pas → on voit le bon chiffre. Fallback gratuit + meilleur SEO.

---

## 6. BLOC C — Conversion

### C1 — Hiérarchie des CTA
Hero : retirer `Text us a photo` (demande d'Alex), garder **Call en primaire plein** et
`Get a free estimate` en secondaire outline. À 2 h du matin l'appel vaut 10× le formulaire.
**Garder le texto** sur les pages trauma (suicide / crime-scene / unattended-death) et dans
le bloc contact, reformulé : `Can't talk right now? Text us a photo.`

### C2 — Services : virer les onglets
3 onglets → un visiteur voit 4 services sur 11. Alex : *« This is something i for sure want
to change »*. Grille unique, tout visible, **triée par demande décroissante** (ordre bloqué sur A9).
La catégorie devient un petit label sur chaque carte.

### C3 — Demandes groupées d'Alex
- `Learn more` → `View Service` (×11)
- Nav : taille de police plus grande (il les trouve petites vs les concurrents)
- H2 services → `Our Specialized Biohazard Cleanup Services`
- Sous-titre services → `We provide certified biohazard cleanup, trauma scene cleanup, hoarding cleanup, odor removal, and environmental decontamination for residential, commercial, and government clients throughout Southern California.`
- H2 What You Get → `Restoring Safe Spaces After Life's Most Difficult Moments`
- H3 Why Choose Us → `Certified. Compassionate. Available 24/7`
- Image « What You Get » : le type qui essuie un plan de travail = ménage classique, pas biohazard → à remplacer

### C4 — Tableau comparatif : réparer la lecture
Alex **adore** ce bloc (*« I really like how you were able to show why were different as a
company instead of just saying were better »*). **On garde le concept.** Le souci est la lecture :
les 2 colonnes ont le même poids, donc « Uncertified cleaner » a l'air d'une option légitime.
- Colonne CleanCore : **~65 %** de la largeur, fond blanc, ombre, bordure bleue en haut
- Colonne Uncertified : **~25 %**, gris plat, désaturée, petite
- Labels de gauche : foncé, lisible, en gras
- Chaque cellule : **3-4 mots en gras**, le détail passe en expand
- Objectif : compréhensible en 1 seconde **sans rien lire**

### C5 — Les autres acheteurs
Deux sections (puis deux pages), même template que les pages service :
`For Property Managers` et `Government & FEMA contracts`.
Alex a répondu « both and governement » + « FEMA for gov jobs » — c'est aujourd'hui une
subordonnée sur la page About.

### C6 — CalVCB *(à activer après A10)*
Bloc sur suicide / crime-scene / unattended-death :
`You may be eligible for up to $1,709 in California state victim compensation. We handle the paperwork.`
Réf : CalVCB, Gov. Code §13957(a)(9). Conditionné à l'enregistrement TSW du client.

### C7 — L'histoire de famille *(à valider avec Alex)*
Le site dit « you don't reach a national call center » mais ne dit jamais ce qu'on atteint
à la place. Réponse : **une famille**. À 2 h du matin c'est le père d'Alex qui décroche
(Content Brief Q18). À injecter dans le sous-titre du hero, le About, et le bloc
« A real person answers ».

### C8 — Formulaire
- Sous le bouton : `We call you back within X minutes` (X à faire donner par Alex)
- `name` + `phone` suffisent pour un lead d'urgence, le reste en optionnel
- Stat `$0 · Free estimate` → `Free` avec le label `On-site estimate`
  (aujourd'hui « $0 » se lit comme si le chantier était gratuit)
- État de chargement sur le bouton (voir E2)

---

## 7. BLOC D — Motion

> **Ne commence pas ici.** 80 % de la sensation, c'est B3 + B4. Ajouter des animations sur
> un site lourd, ça empire les choses : on rend visible le fait que ça rame.

### D2 — Reveal au scroll

Un seul fichier `reveal.js` + une classe `.reveal`. **Pas de librairie** (GSAP/AOS pèseraient
plus lourd que le gain).

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);           // une animation ne se rejoue jamais
  });
}, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
```

```css
.reveal { opacity: 0; transform: translateY(16px);
          transition: opacity .5s cubic-bezier(.22,.61,.36,1),
                      transform .5s cubic-bezier(.22,.61,.36,1); }
.reveal.is-in { opacity: 1; transform: none; }

/* stagger : 60-80ms, 6 éléments MAX */
.grid .reveal:nth-child(2){transition-delay:.07s}
.grid .reveal:nth-child(3){transition-delay:.14s}
/* ... jusqu'à 6 */

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
}
```

**Règles non négociables :**
- **Uniquement `transform` et `opacity`.** Jamais `top`/`left`/`height`/`margin`/`width` —
  ce sont les 2 seules propriétés que le GPU compose sans repasser par le layout.
  C'est la règle qui fait 90 % de la fluidité.
- **Le hero ne s'anime pas.** On n'anime jamais ce qui est visible au chargement (LCP).
- `will-change: transform` posé juste avant le reveal, **retiré après**. Laissé en permanence,
  il mange la mémoire GPU et dégrade tout le reste.
- **Zéro scroll-jacking.** Pas de parallax lourd sur mobile — c'est le premier truc qui saccade.
- Si on remarque l'animation, c'est qu'elle est trop forte.

### D3 — Le feel au doigt

```css
/* retour tactile — le truc le moins cher et le plus payant */
.btn:active { transform: scale(.98); transition: transform 80ms ease-out; }

/* tuer le flash bleu iOS, mais SEULEMENT en donnant un :active en échange */
* { -webkit-tap-highlight-color: transparent; }

/* le slider avant/après vole le scroll vertical sans ça */
.before-after { touch-action: pan-y; }

/* les ancres atterrissent sous le header sans ça */
:target, [id] { scroll-margin-top: var(--nav-h); }

/* le hero mobile saute au premier scroll avec 100vh */
.hero { min-height: 100dvh; }

/* le scroll "fuit" sur la page derrière sans ça */
.mega-menu { overscroll-behavior: contain; }

/* souvent supprimé sans remplacement = problème d'accessibilité */
:focus-visible { outline: 2px solid var(--teal); outline-offset: 2px; }
```

- Le slider avant/après : **pointer events** (`pointerdown`/`move`/`up`), pas mouse events.
- Le **sticky CTA** : le masquer quand le bloc contact est visible — aujourd'hui il double
  le bouton d'appel déjà à l'écran.

---

## 8. BLOC E — Finition

### E1 — Le footer
Aujourd'hui : 4 colonnes dont une à moitié vide, 5 services sur 11, une adresse iCloud.
Sur un site d'urgence locale, le footer est vu par ceux qui hésitent encore.

À ajouter :
- **NAP complet** : nom légal, zone desservie, téléphone (c'est aussi un signal SEO local)
- `Open 24/7 · 365 days` écrit noir sur blanc
- Les badges de certification (composant de A10)
- Un CTA d'urgence : `Emergency? Call (562) 568-6032`
- Réseaux sociaux + lien Google Business Profile dès qu'il existe
- `Privacy · Terms · Accessibility` — attendu aux US, et l'ADA est un vrai sujet en Californie
- **Année dynamique** (`©️ 2026` est en dur dans le HTML)
- Les 11 services, pas 5

### E2 — Standards manquants
- **Contraste hero** : « Response within 90 minutes » en bleu clair sur photo sombre = limite
  en AA (4.5:1). Un overlay dégradé sous le texte règle ça **sans toucher au design**.
- **État de chargement formulaire** : le bouton passe en `Sending…` + `disabled` au submit.
  Sans ça les gens double-cliquent et on reçoit deux leads.
- **Page 404 brandée** — il n'y en a pas. Une 404 par défaut sur un site d'urgence = onglet fermé.
- **Favicon complet + `<meta name="theme-color">`** — sans le theme-color, la barre Safari
  reste blanche et casse l'immersion mobile.
- **Blur-up** sur les images lourdes : elles « pop » d'un coup aujourd'hui.
- **États des cartes service** : hover seulement, pas de focus ni active (voir B3).
- **Rythme vertical** : les espacements entre sections sont au jugé et ça se sent en scroll
  continu. Poser 3 tokens (`--sp-section`, `--sp-block`, `--sp-item`) et s'y tenir.
- Le logo (2 versions full/mark selon breakpoint) est **bien géré** → ne pas y toucher.

---

## 9. Checklist

```
[ ] B3   hover dans @media (hover:hover) + équivalents :active
[ ] B4   lazy + AVIF/WebP + aspect-ratio (< 1,5 Mo première vue)
[ ] A1   retirer la promesse 90 min (H1, title, meta)
[ ] A2   search & replace out-of-pocket (8 endroits)
[ ] A3   icloud.com → contact@purebiodecon.com
[ ] A4   découpler vitesse / couverture sur la carte
[ ] A5   labelliser la conversation SMS
[ ] A6   retitrer le bloc before/after
[ ] A7   footer : retirer Water & Fire Damage
[ ] A8   citation fondateur → placeholder
[ ] A9   🔴 BLOQUÉ — liste finale des services
[ ] A10  🔴 BLOQUÉ — composant badges (construire vide)
[ ] B1   z-index nav / CTA en tokens
[ ] B2   compteurs About : valeur en HTML
[ ] C1   hiérarchiser les CTA du hero
[ ] C2   services : grille unique triée par demande
[ ] C3   demandes groupées d'Alex (7 items)
[ ] C4   tableau comparatif : colonnes asymétriques
[ ] C5   sections Property Managers + Government & FEMA
[ ] C6   bloc CalVCB (après A10)
[ ] C7   l'histoire de famille
[ ] C8   formulaire : promesse de rappel + « $0 » → « Free »
[ ] D2   reveal.js + reduced-motion
[ ] D3   feel au doigt
[ ] E1   footer complet
[ ] E2   standards de finition
```

---

## 10. Rappel final

- **Si une info manque → tu t'arrêtes et tu demandes.** Jamais inventer.
- **A9 et A10 sont bloqués.** N'y touche pas.
- **L'esthétique ne se dégrade pas.** Si un fix casse le design, le fix est mauvais.
- Un ticket = un commit.
