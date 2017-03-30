echo "Git message:"
read -r line
git add --all
git commit -m"$line"
npm version patch && npm publish && git push --follow-tags
