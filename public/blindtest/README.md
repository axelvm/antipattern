# Blindtest — fichiers audio

Déposer les fichiers `.mp3` dans ce dossier.

Chaque fichier doit être déclaré dans `src/lib/blindtest/tracks.json` :

```json
{
  "id": "exemple-telephone",
  "title": "Exemple — téléphone",
  "artist": "Artiste",
  "src": "/blindtest/exemple.mp3",
  "filter": "envers-ralenti"
}
```

- `src` commence toujours par `/blindtest/` et se termine par `.mp3`.
- `filter` est l’un de : `dry`, `envers-ralenti`. Un filtre par titre, via le JSON.
- `envers-ralenti` : lecture à l’envers, 20 % de vitesse, passe-bas 400 Hz (fonction `enversRalenti()`).
- `artist` et `title` servent aux réponses du quiz (trim + minuscules).
