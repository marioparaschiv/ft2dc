import { RESTPostAPIWebhookWithTokenJSONBody } from 'discord-api-types/v10';
import { createLogger } from '@lib/logger';
import { Readable } from 'stream';
import FormData from 'form-data';

class Webhook {
	public logger = createLogger('Discord', 'Webhook');

	async send(url: string, message: RESTPostAPIWebhookWithTokenJSONBody, files?: { content: ArrayBuffer, extension: string; }[]) {
		try {
			const form = new FormData();

			form.append('payload_json', JSON.stringify(message));

			if (files?.length) {
				for (let i = 1; i < files.length + 1; i++) {
					const file = files[i - 1];
					const field = 'file' + i;
					const buffer = Buffer.from(new Uint8Array(file.content));
					const stream = Readable.from(buffer);

					form.append(field, stream, { filename: field + '.' + file.extension });
				}
			}

			form.submit(url, (err, res) => {
				if (err) throw err;

				res.resume();
			});
		} catch (e) {
			console.error('!!! Failed to send to webhook !!!\n', e, { url, message });
		}
	};
}

export default new Webhook();