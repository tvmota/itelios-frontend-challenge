<script>
  import { QToolbar, QToolbarTitle, QBtn, QIcon, QPopover, QList, QItem, QItemSide, QItemMain, QItemTile } from 'quasar'
  export default {
    name: 'App',
    components: {
      QToolbar,
      QToolbarTitle,
      QBtn,
      QIcon,
      QPopover,
      QList,
      QItem,
      QItemSide,
      QItemMain,
      QItemTile
    },
    computed:{
      basket(){
        return this.$store.getters.getBasket
      }
    },
    methods:{
      getImg(url){
        let patt = new RegExp(/[\w-]+.(jpg|png|txt)/g)
        let img = patt.exec(url)
        let imgPath = `statics/${img[0]}`
        return imgPath
      }
    },
    methods:{
      removeItem(item){
        this.$store.commit('REMOVE_ITEM', item)
      },
      getImg(url){
        let patt = new RegExp(/[\w-]+.(jpg|png|txt)/g)
        let img = patt.exec(url)
        let imgPath = `statics/${img[0]}`
        return imgPath
      }
    },
    created(){
      this.$store.dispatch('loadBasket')
    }
  }
</script>
<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <header>
      <q-toolbar>
        <q-btn flat>
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Toolbar
        </q-toolbar-title>
        <q-btn flat>
          <q-icon name="shopping_cart" />
          <q-popover ref="popover3" fit>
            <q-list highlight inset-separator>
              <q-item v-for="item in basket">
                <q-item-side>
                  <q-item-tile image>
                    <img :src="getImg(item.imageName)" alt="placeholder+image" width="50">
                  </q-item-tile>
                </q-item-side>
                <q-item-main :label="item.name" label-lines="3"/>
                <q-item-side>
                  <q-btn flat @click="removeItem(item)">
                    <q-icon name="delete" />
                  </q-btn>
                </q-item-side>
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>
      </q-toolbar>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="stylus">
main
  text-align center
  margin-top 20px
  
</style>
