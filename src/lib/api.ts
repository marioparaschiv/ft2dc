import { createLogger } from '@lib/logger';
import { Routes, URL } from '@constants';
import { sleep } from '@utilities';
import config from '@config';

class API {
	logger = createLogger('FT', 'API');
	chats = [];

	async getPortfolio() {
		try {
			const res = await fetch(URL.API + Routes.Portfolio(config.portfolio), {
				headers: {
					'Authorization': config.auth
				}
			});

			if (!res?.ok) {
				await sleep(500);
				return this.getPortfolio();
			}

			return await res.json();
		} catch (error) {
			await sleep(500);
			return this.getPortfolio();
		}
	}

	async getChats(): Promise<Chat[]> {
		const portfolio = await this.getPortfolio();
		if (!portfolio) return this.chats;

		const chats = portfolio.holdings;
		this.logger.debug('Holdings:', chats);

		if (!chats) this.logger.warn('!!! GOT NO HOLDINGS !!! WTF???');
		if (chats) this.chats = chats;
		this.logger.success('Chats successfully updated.');

		return this.chats;
	}
}

export default new API();