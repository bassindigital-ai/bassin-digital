#!/bin/bash
# ============================================================
#  Double-clique ce fichier pour publier ton site.
#  -> Envoi sur GitHub, puis Netlify met le site a jour tout seul.
# ============================================================

cd "$(dirname "$0")" || exit 1

echo ""
echo "==========================================================="
echo "   BASSIN DIGITAL  -  Envoi du site vers GitHub"
echo "==========================================================="
echo ""

REMOTE="https://github.com/bassindigital-ai/bassin-digital.git"

# Memoriser ton identifiant GitHub apres la toute premiere fois
git config --global credential.helper osxkeychain 2>/dev/null

# Repartir d'un depot propre et leger a chaque envoi : aucun blocage possible
rm -rf .git
git init -q
git branch -M main

# Identite des commits : Netlify n'accepte de construire que si l'auteur du commit
# correspond au compte GitHub relie a Netlify (contactadambrunet-lgtm).
# Adresse Primary + Verified de ce compte : contact.adambrunet@gmail.com
git config user.name "Adam Brunet"
git config user.email "contact.adambrunet@gmail.com"
git remote add origin "$REMOTE"
git config http.postBuffer 524288000

git add -A
git commit -q -m "Mise a jour du site - $(date '+%d/%m/%Y a %Hh%M')"

echo "  Auteur du commit : $(git log -1 --pretty=format:'%an <%ae>')"

echo "  Envoi en cours vers GitHub..."
echo ""
git push -u origin main --force

echo ""
echo "==========================================================="
echo "   Termine ! Si tu vois  'main -> main'  juste au-dessus,"
echo "   c'est bon. Netlify mettra le site a jour dans ~1 min."
echo "==========================================================="
echo ""
echo "(Appuie sur la touche Entree pour fermer)"
read _
