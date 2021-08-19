/**
 * main.ts.
 */
'use strict'

import { config } from 'dotenv'
import { Telegraf } from 'telegraf'

// Irá inicializar e procurar o arquivo .env e carregar suas chaves e valores.
config()

// Criará a instância do bot.
const bot = new Telegraf(process.env.BOT_KEY)

bot.start(async (ctx) => await ctx.reply('Hello User!'))
bot.help(async (ctx) => await ctx.reply('Help message'))

async function lauch (): Promise<void> {
  await bot.launch()
}

// Launch bot
lauch().catch(error => console.error('Oh no!', { error }))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
