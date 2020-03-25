# Carte imaginaire des transports de Marseille

Projet porté par Chloé Morisset dans le cadre du dispositif ODEON.

## Paramétrage

- Pour changer le rayon des isodistances, modifier la valeur du paramètre `rayon` dans l'adresse. Les valeurs sont exprimées en mètres. Par exemple, pour des cercles de 500 mètres de rayon : `https://mattisg.github.io/carte-imaginaire-transports-marseille?rayon=500`. La valeur par défaut est 200 mètres.
- Pour changer la durée maximale des isochrones, modifier la valeur du paramètre `duree` dans l'adresse. Les valeurs sont exprimées en minutes faisables à pied, calculées selon l'[IGN](https://geoservices.ign.fr/documentation/services_betas/doc-isochrones.html). Par exemple, pour des distances de 5 minutes : `https://mattisg.github.io/carte-imaginaire-transports-marseille?duree=5`. La valeur par défaut est 10 minutes.
- Pour changer les deux valeurs à la fois : `https://mattisg.github.io/carte-imaginaire-transports-marseille?rayon=500&duree=5`.

## Source et licence des données

- [Ville de Marseille](https://www.data.gouv.fr/fr/organizations/ville-de-marseille/), données sous Licence ouverte.

## Licence du code

EUPL v1.2: akin to an AGPL, but more readable and translated and legally binding into all languages of the EU.
