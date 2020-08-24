<!-- <template>
  <div>
    <div class="mt-5 text-center" v-if="isEmpty">
      <img src="../../assets/img-product/food.png" alt="cart-empty" />
      <h4 class="mb-0">Your cart is empty</h4>
      <p>Please add some items from the menu</p>
    </div>
    <ListOrder @clickItem="i" v-if="!isEmpty" />
  </div>
 </template>

<script>
import ListOrder from './ListOrder'

export default {
  name: 'CartOrder',
  components: {
    ListOrder
  },
  data() {
    return {
      isEmpty: true
    }
  },
  methods: {
    clickItem() {
      // console.log('tampil list order')
      this.isEmpty('clikItem', this.isEmpty)
    }
  }
}
</script> -->
