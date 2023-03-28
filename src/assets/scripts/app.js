/**
 * IMPORTS
 * - [Utils] import { queryString } from './utils'
 * - [jQuery] import $ from 'jquery'
 * - [Swiper] import Swiper from 'swiper'
 * - [Image] import imageSample from '../images/image-sample.jpg';
 */

const app = {
  header: () => {
    const el = document.querySelector('header');
    console.log(el);
  },
  footer: () => {
    const el = document.querySelector('footer');
    console.log(el);
  },
  init: () => {
    app.header();
    app.footer();
  }
};

window.addEventListener('DOMContentLoaded', () => app.init());
