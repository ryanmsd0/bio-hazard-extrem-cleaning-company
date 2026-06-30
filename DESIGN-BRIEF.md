# CleanCore Decon — Design Brief & Asset Spec
> Biohazard & extreme cleaning · Los Angeles · **Light theme**
> Réf. client : 911biocleaninc.com · Réf. trouvée : hazardcleaning.be
> ⚠️ Logo provisoire — DA volontairement neutre/flexible (survit au changement de logo)

---

## 0. Positionnement & ressenti (mood)
- **Émotion cible** : confiance médicale + calme + réactivité 24/7 + discrétion/compassion.
- **À éviter** : le morbide/glauque. On vend la *tranquillité d'esprit*, pas le sang.
- **Mots-clés DA** : clinique, propre, lumineux, rassurant, pro, humain.
- **Modèle hybride** : crédibilité « US trust » de 911bio + propreté graphique & icônes custom de hazardcleaning.

---

## 1. Palette de couleurs (Light theme) — ✅ VERROUILLÉ : CTA bleu/teal (pas de rouge)

### Couleurs principales
| Rôle | Nom | HEX | Usage |
|---|---|---|---|
| Brand primary | Clinical Blue | `#0B6BCB` | Liens, titres accent, icônes |
| Brand deep | Deep Navy | `#0A2540` | Texte titres, header, footer |
| Accent / clean | Teal | `#13B4A6` | Détails « propreté », hovers, check |
| **CTA principal** | Clinical Blue | `#0B6BCB` | Bouton « Call Now », bandeau 24/7 |
| CTA hover | Blue dark | `#0A56A6` | État hover du CTA |
| CTA alt | Teal | `#13B4A6` | Variante CTA secondaire / accent |

### Neutres (la base d'un thème clair)
| Rôle | HEX |
|---|---|
| Background | `#FFFFFF` |
| Background alt (sections) | `#F5F8FC` |
| Border / divider | `#E2E8F0` |
| Texte principal | `#1A2433` |
| Texte secondaire | `#5A6B82` |
| Texte muted | `#8A99AD` |

### Feedback
- Success `#1FA971` · Warning `#F5A524` · Info `#0B6BCB`

> **Règle 60-30-10** : 60% blanc/gris clair, 30% navy/bleu, 10% teal (accents/hovers).
> Palette monochrome froide « clean/médicale » → calme et rassurante. Le teal porte les accents.

---

## 2. Typographie (Police + tailles) — ✅ VERROUILLÉ : Plus Jakarta Sans + Inter

### Couple retenu (Google Fonts, gratuits, `next/font`)
- Titres : **Plus Jakarta Sans** (600/700/800)
- Corps : **Inter** (400/500/600)

### Échelle typographique (type scale, base 16px / ratio ~1.25)
| Token | Desktop | Mobile | Poids | Usage |
|---|---|---|---|---|
| Display | 56px / 3.5rem | 36px | 800 | Hero H1 |
| H1 | 44px | 32px | 700 | Titre de page |
| H2 | 34px | 26px | 700 | Titres de section |
| H3 | 26px | 22px | 600 | Sous-sections, cartes |
| H4 | 20px | 18px | 600 | Titres de carte service |
| Body L | 18px | 17px | 400 | Intro/lead |
| Body | 16px | 16px | 400 | Texte courant |
| Small | 14px | 14px | 500 | Légendes, badges |
| Caption | 12px | 12px | 600 | Labels, eyebrows (UPPERCASE +1px letter-spacing) |

**Réglages** : line-height titres 1.1–1.2 · corps 1.6 · largeur de lecture max **65–70ch** · `letter-spacing` -0.02em sur les gros titres.

---

## 3. Liste d'icônes

> **Set recommandé** : **Lucide** (ou Phosphor) — open-source, style line cohérent, stroke 1.5–2px, couleur `#0B6BCB`.
> Pour les 12 services → **icônes custom uniformes** (style line, même grille 24×24, même stroke) comme hazardcleaning.be.

### Icônes services (12)
| Service | Icône suggérée |
|---|---|
| Biohazard Cleanup | symbole biohazard / triangle alerte |
| Blood Cleanup | goutte + bouclier |
| Crime Scene Cleanup | ruban périmètre / badge |
| Suicide Cleanup | cœur + main (compassion) |
| Unattended Death Cleanup | maison + croix discrète |
| Hoarder Cleanup | cartons empilés |
| Rodent Biohazard Cleanup | empreinte/rongeur + spray |
| Drug Lab Cleanup | fiole/erlenmeyer + alerte |
| Odor Removal | molécules/ondes + vent |
| Mold Remediation | spores/microscope |
| Water Damage Restoration | goutte + maison |
| Fire Damage Restoration | flamme + maison |

### Icônes « Why Choose Us » / trust
- ✓ Bouclier (licensed & insured)
- ✓ Certificat/médaille (certified IICRC)
- ✓ Horloge 24/7 (rapid response)
- ✓ Camion/localisation (rapid dispatch LA)
- ✓ Œil barré / cadenas (discret & confidentiel)
- ✓ Cœur/mains (compassion)
- ✓ Combinaison/EPP (équipe protégée)
- ✓ Pouce/étoile (satisfaction garantie)

### Icônes UI / fonctionnelles
- Téléphone (click-to-call) · Mail · Localisation (pin) · Flèche/chevron · Menu burger · Croix · Check · Étoile (avis) · Quote/guillemets · Play (vidéo) · Plus/Moins (FAQ accordéon) · Calendrier · Flèche-haut (back-to-top) · Réseaux sociaux.

### Icônes process (étapes)
- 01 Appel/contact · 02 Évaluation gratuite · 03 Intervention/decon · 04 Désinfection · 05 Vérification · 06 Restitution.

---

## 4. Liste d'animations

> **Stack reco** : GSAP + ScrollTrigger (ou Framer Motion si React/Next). Tout en `prefers-reduced-motion: reduce` safe.
> **Philo** : sobre et rapide (sujet sensible). Durées 200–600ms, easing `power2.out` / `cubic-bezier(0.22,1,0.36,1)`. Rien de « fun ».

### Au chargement / hero
1. **Fade + slide-up** du H1 → sous-titre → CTA (stagger 80–120ms).
2. **Bandeau d'urgence sticky** qui glisse depuis le haut (24/7 + tél).
3. Léger **parallax** ou Ken Burns lent sur l'image hero (subtil, 8–12s).

### Au scroll (ScrollTrigger reveal)
4. **Reveal au scroll** : sections fade-up à l'entrée (offset 15%), stagger sur les grilles de cartes.
5. **Compteurs animés** (count-up) sur les chiffres clés (« 24/7 », « +500 interventions », « <60 min response »).
6. **Barres de progression / timeline** du process qui se remplissent au scroll.
7. **Avant/Après slider** (drag handle) sur les visuels de restauration.

### Hover / micro-interactions
8. **Cartes service** : élévation (shadow + translateY -4px), icône qui change de couleur (teal), bordure accent.
9. **Boutons** : remplissage/scale léger (1.02), CTA rouge → rouge foncé.
10. **Liens nav** : underline animé (left→right).
11. **Click-to-call** : pulse discret sur le bouton tél (rappel d'urgence).

### Navigation / état
12. **Header sticky** qui se compacte + ombre légère au scroll.
13. **FAQ accordéon** : ouverture height auto + rotation chevron.
14. **Mobile menu** : slide-in plein écran + fade overlay.
15. **Back-to-top** fade-in après 1 écran.
16. **Form** : focus ring animé, validation inline, état loading sur submit.
17. **Bouton flottant d'appel** (mobile) toujours visible, légère apparition.

---

## 5. Liste des visuels / infographies / images

### Photographie (style : clinique, lumineux, EPP, jamais gore)
- **Hero** : équipe en combinaison blanche/EPP intervenant proprement, lumière naturelle, environnement net (PAS de scène choquante).
- **Équipe** : portraits pro, crew souriant/rassurant.
- **Équipement** : matériel pro (nébuliseurs, UV, EPP, camions brandés).
- **Avant/Après** : pièces restaurées (mold, water, fire) — le « après » impeccable.
- **Détails** : gants, désinfection de surface, certification en main.
- **Zone** : photos LA / quartiers desservis.

> Sourcing : shooting réel idéal (crédibilité US) > sinon banque premium soigneusement triée (éviter le stock cliché).

### Infographies / éléments graphiques
- **Process en 6 étapes** (timeline horizontale desktop / verticale mobile) avec icônes.
- **Carte de zone desservie** (Los Angeles County) interactive ou stylisée light.
- **Bandeau de certifications** : logos IICRC, BBB, OSHA, EPA, Cal/OSHA (rangée monochrome → couleur au hover).
- **Grille des 12 services** avec icônes custom.
- **Bloc « 24/7 response »** avec compteur/horloge.
- **Comparatif « Why us vs others »** (table check/cross).
- **Étoiles + avis Google** (preuve sociale).
- **Badges flottants** : « Licensed · Bonded · Insured », « Free Estimate », « We bill insurance ».

### Médias
- **Vidéo** : présentation 30–60s (équipe, process, rassurance) — placée en hero secondaire ou section « POV » (comme hazardcleaning).
- **Favicon / OG image** déclinés de la DA.

### Illustrations (optionnel, light)
- Petites illustrations spot pour 404/merci/empty states, dans le style line des icônes.

---

## 6. Sections par page (résumé)

**Home** : Hero (H1 + CTA call + tél) → bandeau certifs → bloc urgence 24/7 → grille 12 services → Why choose us (4–6 atouts) → Process 6 étapes → Avant/après → Carte zone LA → Avis/preuve sociale → Vidéo → FAQ → CTA final + form → Footer.

**Page service (×12)** : Hero spécifique + tél → définition du service → quand nous appeler → notre process pour CE service → ce qui est inclus → assurance/facturation → avant/après → FAQ ciblée → CTA. *(template unique réutilisable, optimisé SEO local + Ads landing).*

**Why Choose Us** : atouts détaillés + certifs + témoignages + garanties.
**About** : mission + histoire + standards/certifs + zones desservies + équipe.
**Contact** : click-to-call géant + formulaire de devis instantané + zones + couverture 24/7.

---

## 7. Composants UI à prévoir
Header sticky + bandeau urgence · Bouton CTA call (primaire rouge) · Bouton secondaire (outline navy) · Carte service · Carte atout/trust · Carte avis · Étape process · Badge certif · Accordéon FAQ · Slider avant/après · Carte de zone · Formulaire de devis · Footer multi-colonnes · Bouton flottant tél (mobile) · Toast/feedback form.

---

## 8. Conversion & trust (priorités)
- **Click-to-call partout** : header, hero, sticky mobile, footer. Numéro = élément #1.
- **24/7** martelé visuellement (bandeau + icône horloge).
- **« We bill insurance / Free estimate »** très visible (lève le frein prix).
- **Certifications réelles** au-dessus de la ligne de flottaison.
- **Preuve sociale** : avis Google, nb d'interventions, années d'expérience.
- **Formulaire court** (nom, tél, type d'urgence) — friction minimale.
- **Ton** : compassion + professionnalisme, jamais sensationnaliste.

---

## 9. Technique & accessibilité
- **Stack reco** : Next.js (App Router) + Tailwind — parfait pour 16 pages + SEO local + Vercel.
- **SEO local** : 1 page/service avec slug propre (déjà dans le blueprint), schema `LocalBusiness` + `Service`, balises ville LA.
- **Perf** : images `next/image` (AVIF/WebP), fonts en `next/font`, LCP < 2.5s.
- **A11y** : contraste AA (texte navy sur blanc OK), focus visibles, tél en `tel:` link, alt sur visuels, `prefers-reduced-motion`.
- **Mobile-first** : la majorité du trafic « urgence » est mobile → CTA call toujours au pouce.

---

### Décisions verrouillées ✅
1. **Typo** : Plus Jakarta Sans (titres) + Inter (corps).
2. **CTA** : bleu/teal (pas de rouge) — palette froide clean/médicale.
3. **Photos** : banque d'images premium triée (remplaçables par shooting client plus tard).
4. **Stack** : Next.js (App Router) + Tailwind, déploiement Vercel.
