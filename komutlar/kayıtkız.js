const Discord = require('discord.js');
const db = require('wio.db');

exports.run = async(client, message, args) => {
   if(!message.member.roles.cache.has('814911530255908904'))  //Kayıt yetkilisi rolü  ID 
  return message.channel.send('Bu komutu kullanabilmek için gerekli yetkiye sahip değilsin ')
   let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
   if(!member) {
       return message.channel.send('Bir kişi etiketlemelisin')
   }
//Burayı Doldur
   let devtr = message.guild.roles.cache.find(r => r.id === '814911532190269443') // Kız rolü
   let kayıtsız = message.guild.roles.cache.find(r => r.id === '814911533922517033') //Kayıtsız 
//Burayı Doldur
   if(!devtr) {
       return message.channel.send('Kız rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   if(!kayıtsız) {
       return message.channel.send('Kayıtsız rolü ayarlanmamış veya rol aranırken bir hata oluştu logu kontrol et')
   }
   let kayıt = message.guild.member(member)
   let isim = args[1]
   let yas = args[2]

   if(!isim) return message.channel.send('İsim belirtmelisin')
   if(isNaN(yas)) return message.channel.send('Yaş belirtmelisin')

   kayıt.setNickname(`✞ ${isim} | ${yas}`)
   kayıt.roles.add(devtr)
   kayıt.roles.remove(kayıtsız)
   let embed = new Discord.MessageEmbed()
   .setColor('GREEN')
   .setTitle('Kayıt Tamamlandı')
   .addField('Kayıt edilen kullanıcı',member)
   .addField('Adı :', isim)
   .addField('Yaşı :', yas)
   .addField('Kayıt eden yetkili', message.author)
   client.channels.cache.get('814911601852284960').send(embed)
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases:['kız','k'],
    permlevel: 0
};

exports.help = {
    name: "kayıt-kız"
}