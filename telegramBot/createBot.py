from aiogram import Bot, types
from aiogram.dispatcher import Dispatcher
import os
from aiogram.contrib.fsm_storage.memory import MemoryStorage

webhook_url = 'https://6073-46-173-42-227.ap.ngrok.io'
rules_file = open('SecretSanta.txt', "r", encoding="utf-8")
text_rules = rules_file.read()

storage = MemoryStorage()

bot = Bot(token = os.getenv('TOKEN'))
dp = Dispatcher(bot, storage = storage)