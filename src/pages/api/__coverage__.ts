import {COVERAGE} from '@app/features';
import {connectable, HTTP_METHODS, HTTP_STATUS, TypedRoute} from '@nfq/typed-next-api';

import nextConnect from 'Utils/nextConnect';


/**
 * Coverage endpoint.
 *
 * @param req Request.
 * @param res Response.
 */
const getCoverage = TypedRoute(HTTP_METHODS.GET, async () => {
    if (COVERAGE) {
        return Promise.resolve({
            // eslint-disable-next-line no-underscore-dangle
            coverage: global.__coverage__ ?? null,
            status: HTTP_STATUS.OK
        });
    }

    return Promise.resolve({status: HTTP_STATUS.NOT_FOUND});
});

export default nextConnect()
    .get(connectable(getCoverage));