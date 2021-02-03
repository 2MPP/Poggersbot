const {
	MessageEmbed
} = require('discord.js');
const {
	stripIndents
} = require('common-tags');
const {
	getMember,
	formatDate
} = require('../../functions.js');

const flags = {
	DISCORD_EMPLOYEE: '<:staff_badge:766725403653963826> ',
	DISCORD_PARTNER: '<:new_partner_badge:766725415330512916> ',
	BUGHUNTER_LEVEL_1: '<:BugHunter:766725468203253820>',
	BUGHUNTER_LEVEL_2: '<:BugHunterLvl2:766725455705276417> ',
	HYPESQUAD_EVENTS: '<:hypesquad_badge:766725428646772778>',
	HOUSE_BRAVERY: '<:bravery_badge:766725497899188244>',
	HOUSE_BRILLIANCE: '<:brilliance_badge:766725480983953446> ',
	HOUSE_BALANCE: '<:balance_badge:766725508519297084> ',
	EARLY_SUPPORTER: '<:early_supporter_badge:766725440789938238> ',
	TEAM_USER: 'Team User',
	SYSTEM: '<:System:766729428943372328> ',
	VERIFIED_BOT: '<:verifiedbot:766729428898021426>',
	VERIFIED_DEVELOPER: '<:verified_developer_badge:766725388432572476>',
};


module.exports = {
	name: 'whois',
	category: 'info',
	aliases: ['who', 'user', 'info', 'userinfo'],
	description: 'Returns user information',
	usage: '[username | id | mention]',
	run: async (client, message, args) => {
		const member = await getMember(message, args.join(' '));

		// Member variables
		const UserFlags = member.user.flags.toArray();
		const joined = formatDate(member.joinedAt);
		const roles = member.roles.cache
			.filter(r => r.id !== message.guild.id)
			.map(r => r).join(', ') || 'N/A';

		// User variables
		const created = formatDate(member.user.createdAt);

		const embed = new MessageEmbed()
			.setFooter(member.displayName, member.user.avatarURL())
			.setThumbnail(member.user.avatarURL())
			.setColor(member.displayHexColor === '#000000' ? '#ffffff' : member.displayHexColor)

			.addField('Member information:', stripIndents `**- Display name:** ${member.displayName}
            **- Joined at:** ${joined}
            **- Roles:** ${roles}`, true)


			.addField('User information:', stripIndents `**- ID:** ${member.user.id}
            **- Username**: ${member.user.username}
            **- Tag**: ${member.user.tag}
            **- User badges**: ${UserFlags.length ? UserFlags.map(flag => flags[flag]).join(' ') : 'N/A'} 
            **- Created at**: ${created}`, true)


			.setTimestamp();

		message.channel.send(embed);
	},
};