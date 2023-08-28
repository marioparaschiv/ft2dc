import { createLogger } from '@lib/logger';
import { Socket } from '@structures';
import API from '@lib/api';
import { colorize } from '@utilities';

const Logger = createLogger('FT');

async function init() {
	new Socket();

	const chats = await API.getChats();

	const list = chats.map(chat => `${chat.name} (@${chat.username}) - ${chat.chatRoomId}`).join('\n');
	Logger.info(colorize(list, 'yellow'));
}

init();