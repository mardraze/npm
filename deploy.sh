echo "Git message:"
read -r line
if [ -z "$line" ]; then
  line='.'
fi
echo "message $line"
git add --all
git commit -m"$line"
npm version patch && npm publish && git push --follow-tags
