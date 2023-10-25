import { createLogger } from '@lib/logger';
import { Routes, URL } from '@constants';
import config from '@config';

class API {
	logger = createLogger('FT', 'API');
	chats = [];

	async getPortfolio() {
		const res = await fetch(URL.API + Routes.Portfolio(config.portfolio), {
			headers: {
				'Authorization': config.auth
			}
		}).catch(() => null);

		if (!res?.ok) {
			this.logger.error('Failed to retrieve profile information.', { res });
			return {};
		}

		return await res.json();
	}

	async getChats(): Promise<Chat[]> {
		const portfolio = await this.getPortfolio();
		this.logger.debug(portfolio);
		const chats = portfolio.holdings;
		this.logger.debug('Holdings:', chats);

		if (!holdings) this.logger.warn('!!! GOT NO HOLDINGS !!! WTF???');

		this.chats = chats;
		this.logger.success('Chats successfully updated.');

		return this.chats;
	}
}

export default new API();