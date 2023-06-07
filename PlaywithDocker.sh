apk update
apk upgrade
git clone https://github.com/hellovokzal/TLS-FIRST
cd TLS-FIRST
bash install.sh -y
apk add nodejs
apk add npm
npm i colors
node TLS-FIRST.js https://tls.mrrage.xyz/nginx_status 3000 proxy.txt ua.txt 15 64
