<script type="text/javascript">
  import { QCarousel, QCard, QCardTitle, QItemTile, QCardMain, QCardSeparator, QCardMedia, QCardActions, QBtn} from 'quasar'
  import { chunk } from 'lodash'

  export default{
    name: 'Carousel',
  	components: {
  	  QCarousel,
  	  QCard,
  	  QCardMain,
  	  QItemTile,
  	  QCardTitle,
  	  QCardSeparator,
  	  QCardMedia,
  	  QCardActions,
  	  QBtn
  	},
  	data(){
  		return {
  			paginate:{
  				chunked:[]
  			}
  		}
  	},
  	computed:{
  		products(){
  			return this.$store.getters.getProducts
  		}
  	},
  	methods:{
  		getImg(url){
  			let patt = new RegExp(/[\w-]+.(jpg|png|txt)/g)
  			let img = patt.exec(url)
  			let imgPath = `statics/${img[0]}`
  			return imgPath
  		},
  		addItem(item){
  			this.$store.commit('ADD_ITEM',item)
  		}
  	},
  	created(){
  		let self = this
  		self.$store.dispatch('loadItems')
  		self.$set(self.paginate,'chunked',chunk(self.products.recommendation,4))
  	}
  }
</script>
<template>
	<q-carousel class="text-black qcarousel" arrows>
		<div slot="slide" class="bg-white slot no-padding" v-for="page in paginate.chunked">
			<div class='row'>
				<div class='col-xs-12 col-sm-12 col-md-3 col-lg-auto col-xl-auto' v-for="item in page">
    				<q-card>
    					<q-card-media>
    						<img :src="getImg(item.imageName)" alt="">
    					</q-card-media>
			  			<q-card-separator />
			  			<q-card-main>
			  				<q-item-tile label class="ellipsis-2-lines text-justify">{{ item.name }}</q-item-tile>
			  				<br>
			    			<q-item-tile sublabel class="text-justify" v-if="item.oldPrice && item.oldPrice > item.price">
			    				<p>De: <strong>{{ item.oldPrice }}</strong></p>
			    				<p>por: <strong>{{ item.price }}</strong></p>
			    			</q-item-tile>
			    			<q-item-tile sublabel class="text-justify" v-else>
			    				<p>De: <strong>---</strong></p>
			    				<p>por: <strong>{{ item.price }}</strong></p>
			    			</q-item-tile>
			    			<q-item-tile sublabel class="text-justify ellipsis-2-lines">
			    				<p>ou <strong>{{ item.productInfo.paymentConditions }}</strong> sem juros</p>
			    			</q-item-tile>
			  			</q-card-main>
			  			<q-card-separator />
			  			<q-card-actions>
			  				<q-btn 
			  					color="light text-black" 
			  					icon-right="add_shopping_cart" 
			  					class="full-width" 
			  					push @click="addItem(item)">
			  					Adicionar ao carrinho
			  				</q-btn>
			  			</q-card-actions>
					</q-card>
				</div>
			</div>
  		</div>
	</q-carousel>
</template>
<style lang="stylus">
  @import '~variables'
  .qcarousel
  	border 1px solid $light
  .slot
  	border-bottom 1px solid $light
  	border-top 1px solid $light
  	border-left 1px solid $light
  	padding 0px
</style>