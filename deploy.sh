echo 'pull and checkout repo'
git pull origin master
git checkout master
echo 'build reactjs'
(
  cd app || exit
  npm install
  npm run build
  rm -rf build/api
  rm -rf build/example_api
)
echo 'stop express server'
(
  cd express-server || exit
  npm run stop
)
echo 'copy build'
rm -rf express-server/build
cp -R app/build express-server/build
echo 'start express server'
cd express-server || exit
npm install
npm run migrate
npm run start
