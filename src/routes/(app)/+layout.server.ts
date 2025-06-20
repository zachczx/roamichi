// import type { LayoutLoad } from './$types';

import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ url, params }) => {
	const tripId = params.trip;

	const paths = url.pathname.split('/');

	return { paths: paths, tripId: tripId };
};
