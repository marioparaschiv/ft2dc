import MimeTypes from 'mime-types';

async function getImage(url: string) {
	try {
		const res = await fetch(url);
		const type = res.headers.get('Content-Type');

		return {
			content: await res.arrayBuffer(),
			extension: MimeTypes.extension(type)
		};
	} catch {
		return null;
	}
}

export default getImage;