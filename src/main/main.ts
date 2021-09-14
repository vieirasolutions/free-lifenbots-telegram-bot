/**
 * main.ts.
 */
'use strict'

import { config } from 'dotenv'
import { Telegraf } from 'telegraf'

// Init .env file data
config()

// Create instance of a bot with telegraf lib
const bot = new Telegraf(process.env.BOT_KEY)

bot.on('new_chat_members', async (ctx) => {
  ctx.update.message.new_chat_members.map(async (member) => {
    await ctx.reply(`${member.first_name}, Seja bem vindo! O próximo passo é assistir o vídeo que está fixado aqui no topo do grupo.`)
  })
})

async function lauch (): Promise<void> {
  await bot.launch()
}

// Launch bot
lauch().catch(error => console.error('An error ocurred.', { error }))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
