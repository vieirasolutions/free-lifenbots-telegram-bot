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

bot.command('acessos', async (ctx) => {
  await ctx.reply('*Para acessar os robôs:* \nClique abaixo no botão "Acessar Robôs"\nEmail: *Seu email*\nSenha: *senhaprovisoria*', { parse_mode: 'MarkdownV2', ...keyboard })
})

// const keyboardOff = Markup.inlineKeyboard([
//   Markup.button.url('Quero ser PREMIUM', 'https://lifenbot.com')
// ])

// bot.command('promo', async (ctx) => {
//   await ctx.reply('⭐*[ALERTA DE OPORTUNIDADE]*⭐\nOferta *Promocional* para Usuários do Grupo por tempo *LIMITADO:* \n\nLiberamos o acesso *PREMIUM* com valor promocional para usuários dos 7 dias grátis\\.\nClique em *"Quero ser PREMIUM"* e comece a utilizar todos os recursos PREMIUM, vários robôs \\(robô novo toda semana\\), planilhas de gerenciamento da LifenBots, grupo exclusivo no telegram e aulas *EXCLUSIVAS*', { parse_mode: 'MarkdownV2', ...keyboardOff })
// })

bot.on('new_chat_members', async (ctx) => {
  ctx.update.message.new_chat_members.map(async (member) => {
    await ctx.reply(`${member.first_name}, Seja bem vindo! O próximo passo é assistir o vídeo que está fixado aqui no topo do grupo.`)
  })
})

let intervalManutencao
bot.hears(/\/send|\/stop/, ctx => {
  if (intervalManutencao) {
    clearInterval(intervalManutencao)
  }
  const sendManutencaoMsg = (ctx): void => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ctx.reply('⚠️⚠️⚠️⚠️*Atenção*⚠️⚠️⚠️⚠️\n*Manutenção Realizada*\\.\nCaso tenha algum problema de acesso aos robôs, pedimos que limpe o cache do navegador:\n🖥️*Computador:* Apertar CTRL F5\n📱*Celular:* Abrir os LifenBots na guia anônima\\.', { parse_mode: 'MarkdownV2' })
  }
  if (ctx.update.message.text.includes('/send')) {
    sendManutencaoMsg(ctx)
    intervalManutencao = setInterval(() => {
      sendManutencaoMsg(ctx)
    }, (30 * 60 * 1000)) // 30 minutes
  } else if (ctx.update.message.text.includes('/stop')) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ctx.reply('Mensagem de manutenção desligada!')
  }
})

async function lauch (): Promise<void> {
  await bot.launch()
}

// Launch bot
lauch().catch(error => console.error('An error ocurred.', { error }))

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
