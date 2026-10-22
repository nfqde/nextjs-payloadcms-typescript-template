import {mutationConfig} from '@nfq/cypress-stryker-runner/config';

import cypressConf from './cypress.config';

export default mutationConfig(cypressConf, {root: process.cwd()});