import { Middleware } from '@nuxt/types';

const auth: Middleware = async (ctx) => {
  debugger;
  // return Promise.reject(new Error('403 拒绝访问'));
};

export default auth;
