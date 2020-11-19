/**
 * @format
 */


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { LogBox } from 'react-native';
import _ from 'lodash';

LogBox.ignoreLogs(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
    if(message.indexOf('Setting a timer') <= -1){
        _console.warn(message);
    }
};

AppRegistry.registerComponent(appName, () => App);

