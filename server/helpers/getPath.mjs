import { event } from "../../testdata/event.mjs";

/**
 * @desc Description
 * @param {*} param0 - Description
 */
export const getPath = (cfEvent) => {
	if (
		cfEvent &&
		cfEvent.Records &&
		cfEvent.Records[0] &&
		cfEvent.Records[0].cf &&
		cfEvent.Records[0].cf.request &&
		cfEvent.Records[0].cf.request.uri
	)
		return cfEvent.Records[0].cf.request.uri;

	return "";
};
