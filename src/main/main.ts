/**
 * main.ts.
 */
'use strict'

import { config } from 'dotenv'
import { Telegraf, Markup } from 'telegraf'

// Init .env file data
config()

// Create instance of a bot with telegraf lib
const bot = new Telegraf(process.env.BOT_KEY)

const keyboard = Markup.inlineKeyboard([
  Markup.button.url('Acessar Robôs', 'https://app.lifenbot.com'),
  Markup.button.url('Acessar Aulas', 'https://lifenbot.com/cadastro-portal')
])

bot.command('acessos', async (ctx) => await ctx.reply('*Para acessar os robôs:* \nClique abaixo no botão "Acessar Robôs"\nEmail: *Seu email*\nSenha: *senhaprovisoria*', { parse_mode: 'MarkdownV2', ...keyboard }))

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
