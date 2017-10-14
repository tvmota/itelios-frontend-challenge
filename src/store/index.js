import Vue from 'vue'
import Vuex from 'vuex'
import products from '../assets/products.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
  	Basket: [],
  	Products: {}
  },
  mutations: {
    ADD_ITEM( state, obj ){
      state.Basket.push(obj)
    },
    REMOVE_ITEM( state, id ){
      let idx = state.Basket.indexOf(id)
      state.Basket.splice(idx, 1)
    },
    LOAD_ITEMS( state ){
      state.Products = products[0].data
    },
    LOAD_BASKET( state ){
      state.Basket.push( products[0].data.item )
    }
  },
  getters: {
    getBasket: state => state.Basket,
    getProducts: state => state.Products
  },
  actions: {
    loadItems ({ commit }) {
      commit('LOAD_ITEMS')
    },
    loadBasket ({ commit }) {
    	commit('LOAD_BASKET')
    }
  }
})
