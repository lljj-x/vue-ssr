// store.js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export function createStore() {
    return new Vuex.Store({
        state: {
            data: {}
        },
        actions: {
            fetchData({ commit }, name) {
                // `store.dispatch()` 会返回 Promise，
                // 以便我们能够知道数据在何时更新
                return Promise.resolve().then(() => {
                    commit('setItem', {
                        name,
                        time: new Date()
                    });
                });
            }
        },
        mutations: {
            setItem(state, data) {
                state.data = data;
            }
        }
    });
}
