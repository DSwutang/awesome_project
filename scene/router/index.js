import PhotoScene from '../photoScene';
import DeviceManagerScene from '../deviceManagerScene';
import PersonManagerScene from '../personManagerScene';
import SelfInfoScene from '../selfInfo';
import {exp} from 'react-native/Libraries/Animated/src/Easing';
const routes = [
  {
    name: 'photo',
    options: {
      title: 'photo',
    },
    component: PhotoScene,
  },
  {
    name: 'device',
    options: {
      title: 'device',
    },
    component: DeviceManagerScene,
  },
  {
    name: 'person',
    options: {
      title: 'person',
    },
    component: PersonManagerScene,
  },
  {
    name: 'self',
    options: {
      title: 'self',
    },
    component: SelfInfoScene,
  },
];

export default {
  routes,
};
