import { RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { createLogger } from '@lib/logger';
import FormData from 'form-data';
import config from '@config';

class Webhook {
	public url: string;
	public logger = createLogger('Discord', 'Webhook');

	constructor(url: string) {
		this.url = url;
	}

	async send(message: RESTPostAPIWebhookWithTokenJSONBody) {
		try {
			const form = new FormData();

			form.append('payload_json', JSON.stringify(message));

			form.submit(this.url, (err, res) => {
				if (err) throw err;

				res.resume();
			});
		} catch (e) {
			console.error('!!! Failed to send to webhook !!!\n', e, { url: this.url, message });
		}
	};
}

export default new Webhook(config.webhook);