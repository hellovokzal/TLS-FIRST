apk update
apk upgrade
git clone https://github.com/hellovokzal/TLS-FIRST
cd TLS-FIRST
bash install.sh -y
apk add nodejs
apk add npm
npm i colors
node TLS-FIRST.js https://oda.od.gov.ua 3000 proxy.txt ua.txt 10 100

