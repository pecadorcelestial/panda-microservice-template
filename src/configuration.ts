let configuration: any = {};
let environment: string = process.env.NODE_ENV || 'development';

switch(environment.toLowerCase().trim()) {
    case 'qa':
        configuration = require('./configuration/configuration.qa.json');
        break;
    case 'staging':
        configuration = require('./configuration/configuration.staging.json');
        break;
    case 'production':
        configuration = require('./configuration/configuration.prod.json');
        break;
    case 'test':
        configuration = require('./configuration/configuration.test.json');
        break;
    case 'development':
        configuration = require('./configuration/configuration.dev.json');
        break;
}

export default configuration;