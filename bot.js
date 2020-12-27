const Discord = require('discord.js');
const client =  new Discord.Client();
const discloud = require('discloud-status');
const config = require("./config.json");

function setStatus(){
    const status = [
    {name: `Utilize: p!help`, type:'PLAYING'},
    {name: `#PAWNCODERS OWNA`, type: 'PLAYING'}
      ]
    const randomStatus = status[Math.floor(Math.random() * status.length)]
    client.user.setActivity(randomStatus);
    }

client.on('ready',  () =>{
    
    try{
    console.log(`Iniciado com sucesso!\nEstou pronto para ser usado!\n\nEstou em: ${client.guilds.cache.size} servidor, com um total de ${client.users.cache.size} usuario(s)`)
    
    }catch(err){
    console.log("Erro: " + err)
}
    setStatus();
    setInterval(() => setStatus(), 10000)

    //----------Status BOT------------//
    const canal = client.channels.cache.get("786209142473621534");
    const canal2 = client.channels.cache.get("786013453076791297");
    canal.send('Estou ON-LINE Novamente!')
    //canal2.send(`Reniciado com sucesso <:V_CorretoTKF:759917099451416586>!`)
});
 
client.on('guildMemberAdd', member => {
  const canal = client.channels.cache.get("770398343720599572");
  let emoji = member.guild.emojis.cache.find(e => e.name === 'X_KoraTKF')
  canal.send(`${member} acabou de entrar no nosso servidor!! Agora possuimos: ${client.users.cache.size} membros!! ${emoji}`)

});
client.on('message', async message => {

    if(message.mentions.has(client.user)){

    let embed = new Discord.MessageEmbed()
    .setTitle('Me marcaram!')
    .setColor(`RANDOM`)
    .setDescription(`
    Olá membro Coder!,
    Meu prefixo é: \`\`\`p.\`\`\`\n
    E meu comando de ajuda é: p.help,
    Espero que se divirta no nosso servidor! 
    `)
    .setFooter('Equipe PawnCoders - Todos direitos reservados!')
    message.channel.send(embed)
  } else {

   if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    
    const args = message.content.slice(config.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(message.channel.type == "dm") 
      return;
  
    if(command === "help" || command === "ajuda"){
      let embed = new Discord.MessageEmbed()
      .setTitle('Ajuda')
      .setColor(`RANDOM`)
      .setDescription(
        `Olá ${message.author}, meus comandos atualmente são:\n
        ${config.prefix}help(comando de ajuda do bot)\n
        ${config.prefix}clear(limpa o chat do servidor)\n
        ${config.prefix}ping(verifica a latência do bot)`)
      .setFooter('Equipe PawnCoders - Todos direitos reservados!')
      message.channel.send(embed)
    }
    if(command === "clear" || command === "limpar"){
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('Você precisa ter permissão de gerenciar mesagens para usar este comando!');

        const clear = message.content.split(' ').slice(1);
        const amount = clear.join(' ');
        if (!amount) return message.reply ('Você não informou uma quantidade de menssagens que deveria ser deletada!');
        if (isNaN (amount)) return message.reply ('O parametro de quantidade não  um número!');

        if(amount > 100) return message.reply ('Você não pode deletar mais de 100 menssagens de uma vez!'); 
        if(amount < 1) return message.reply ('Você tem que deletar pelo menos 1 menssagem!'); 
        message.channel.messages.fetch({limit: amount}). then (messages => {
        message.channel.bulkDelete (messages)});

        let embed = new Discord.MessageEmbed()
        .setColor(`RANDOM`)
        .setDescription(`Chat limpo por: ${message.author}! Total de mesagens apagadas: ${amount}`)
        message.channel.send(embed)
    }
    if(command === "ping"){
    let r = discloud.ram();
    let embed = new Discord.MessageEmbed()
    .setDescription(`A Minha Latência é \`\`\`${m.createdTimestamp - message.createdTimestamp}ms.\`\`\`\n A Latencia da API é \`\`\`${Math.round(client.ping)}ms.\`\`\`\n E Meu Consumo de ram é \`\`\`${r}\`\`\``)
    .setColor(`RANDOM`)
    message.channel.send(embed)
  }
    if(command === "message"){
      if(!message.member.permissions.has('MANAGE_MESSAGES')) return message.reply('Você precisa ter permissão de gerenciar mesagens para usar este comando!');

      if(!args[0])
        return message.reply('erro! Informe o ID do canal para que eu possa enviar a mensagem!');

        if(!args[1])
          return message.reply('erro! Informe a Mensagem que deve ser enviada para o canal!');

        const canal = client.channels.cache.get(args[0]);
        canal.send(args.slice(1).join(' '))

    }
    if(command === "perguntar"){
      
      if(!args[0])
        return message.reply("erro! Informe a pergunta!")
      
        let spaceargs = args.join(' ')
        const resp = [
          "Sim", "Talvez", "Não", "Não sei rs"
        ]
        if(spaceargs == "Gomes é gay?"){ 
          let embed = new Discord.MessageEmbed()
          .setColor(`RANDOM`)
          .setDescription(`${message.author} perguntou:\n \`\`\`${spaceargs}\`\`\`\nResposta:\n \`\`\`Sim!!!!!!\`\`\`\ `) 
          message.channel.send(embed)
        }

        else if(spaceargs){
          let randomresp = Math.floor(Math.random() * resp.length)
          let embed = new Discord.MessageEmbed() 
          .setColor(`RANDOM`)
          .setDescription(`${message.author} perguntou:\n \`\`\`${spaceargs}\`\`\`\nResposta:\n \`\`\`${resp[randomresp]}\`\`\`\ `) 
          message.channel.send(embed)

        }
        message.delete(message.author)
      }
  } 
});
client.login(config.token)
