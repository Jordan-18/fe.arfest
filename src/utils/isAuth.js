import store from '@/store/index'

export const isAuth = async (to, from, next) => {
    let isLoggedIn = store.modules.Auth.getters.loginData.loggedIn || false;
    let requireAuth = to.meta.requireAuth ?? true;

    if (isLoggedIn && requireAuth) {
        next();
    } else if (!isLoggedIn && !requireAuth) {
      next();
    } else {
      next('/login');
    }
}