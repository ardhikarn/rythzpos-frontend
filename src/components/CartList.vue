<template>
  <b-col
    xl="4"
    lg="6"
    md="8"
    sm="10"
    cols="12"
    class="mx-auto"
    v-if="cart.length > 0"
  >
    <b-card class="mt-3">
      <b-row class="mb-4" v-for="(item, index) in cart" :key="index">
        <b-col cols="4" class="pr-0">
          <img
            v-bind:src="'http://127.0.0.1:3000/' + item.product_image"
            class="img-order"
          />
        </b-col>
        <b-col cols="8">
          <div
            class="d-flex flex-column justify-content-between"
            style="height: 100%"
          >
            <h4>
              <strong>{{ item.product_name }}</strong>
            </h4>
            <div cols="12">
              <b-row>
                <b-col cols="6">
                  <button class="px-2 groupBtn" @click="minQty(item)">-</button>
                  <button class="px-2 groupBtn" disabled>
                    {{ item.product_qty }}
                  </button>
                  <button class="px-2 groupBtn" @click="incrementQty(item)">
                    +
                  </button>
                </b-col>
                <b-col cols="6" class="text-right"
                  >Rp. {{ item.product_price * item.product_qty }}</b-col
                >
              </b-row>
            </div>
          </div>
        </b-col>
      </b-row>
      <div class="total-order-price">
        <b-row>
          <b-col cols="6">
            <h5>Total</h5>
            *Belum termasuk ppn
          </b-col>
          <b-col cols="6" class="text-right">Rp. {{ totalPrice() }}</b-col>
        </b-row>
      </div>
      <div class="button-checkout">
        <div>
          <b-button class="text-white mt-3 py-2 my-2" @click="addDataOrder()"
            >Checkout</b-button
          >
        </div>
        <b-button class="text-white py-2 my-2" @click="cancelOrder()"
          >Cancel</b-button
        >
      </div>
      <!-- MODAL CONFIRM -->
      <b-modal hide-footer ref="modal-confirm" title="Are You Sure ?">
        <div class="text-right">
          <b-button @click="$refs['modal-confirm'].hide()">Cancel</b-button>
          <b-button @click="postOrder(cart)" class="ml-2" variant="success"
            >OK</b-button
          >
        </div>
      </b-modal>

      <!-- MODAL CHECKOUT -->
      <b-modal hide-footer ref="modal-checkout" title="CHECKOUT BERHASIL">
        <b-row class="mb-2">
          <b-col lg="6" class="text-left">Cashier : {{ user.user_name }}</b-col>
          <b-col lg="6" class="text-right">Receipt no: #{{ invoice }}</b-col>
        </b-row>
        <div class="modal-content">
          <div class="modal-body">
            <b-row v-for="(item, index) in cart" :key="index">
              <b-col lg="6" class="text-left">
                <p>
                  {{ item.product_name }} {{ item.product_qty }}x (@{{
                    item.product_price
                  }})
                </p>
              </b-col>
              <b-col lg="6" class="text-right">
                <p>Rp. {{ item.product_price * item.product_qty }}</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" class="text-left">Ppn 10%</b-col>
              <b-col lg="6" class="text-right">
                Rp. {{ totalPrice() * 0.1 }}
                <hr />
              </b-col>
              <b-col lg="12" class="text-right"
                >Total : Rp. {{ totalPrice() + totalPrice() * 0.1 }}</b-col
              >
              <b-col lg="12" class="text-left">Payment : Cash</b-col>
            </b-row>
            <div class="button-checkout">
              <b-button @click="printCheckout" class="text-white mt-3 py-2 my-2"
                >Print Checkout</b-button
              >
              <p class="mb-0 text-center">Or</p>
              <b-button class="text-white py-2 my-2" @click="sendEmail"
                >Send Email</b-button
              >
            </div>
          </div>
        </div>
      </b-modal>
    </b-card>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Jspdf from 'jspdf'

export default {
  name: 'CartList',
  data() {
    return {
      addOrders: []
    }
  },
  created() {},
  computed: {
    ...mapGetters({ cart: 'getCart', user: 'getUser', invoice: 'getInvoice' })
  },
  methods: {
    ...mapMutations([
      'removeCart',
      'incrementQty',
      'decrementQty',
      'cancelOrder'
    ]),
    ...mapActions(['postOrders']),
    minQty(data) {
      if (data.product_qty === 1) {
        this.removeCart(data)
      } else {
        this.decrementQty(data)
      }
    },
    totalPrice() {
      let total = 0
      for (let i = 0; i < this.cart.length; i++) {
        total += this.cart[i].product_price * this.cart[i].product_qty
      }
      return total
    },
    addDataOrder(data) {
      this.$refs['modal-confirm'].show()
    },
    postOrder(data) {
      for (let i = 0; i < data.length; i++) {
        const dataOrders = {
          product_id: data[i].product_id,
          order_qty: data[i].product_qty
        }
        this.addOrders = [...this.addOrders, dataOrders]
      }
      const setDataOrder = {
        user_id: this.user.user_id,
        orders: this.addOrders
      }
      this.postOrders(setDataOrder)
        .then(response => {
          this.$refs['modal-checkout'].show()
          this.$refs['modal-confirm'].hide()
        })
        .catch(error => {
          console.log(error)
        })
    },
    printCheckout() {
      const doc = new Jspdf()
      doc.setFont('helvetica')
      doc.setFontSize(12)
      doc.text('- Rythz POS -', 10, 10)
      doc.text(`Date : ${new Date().toJSON().slice(0, 10)}`, 160, 10)
      doc.text('CHECKOUT SUCCESS', 80, 30)
      doc.text(`Cashier : ${this.user.user_name}`, 20, 40)
      doc.text(`Receipt no : #${this.invoice}`, 140, 40)
      doc.text('Orders : ', 20, 50)
      var itemOrders = []
      for (var i in this.cart) {
        itemOrders.push(this.cart[i].product_name + '  ' + this.cart[i].product_qty + 'x')
      }
      var qtyOrders = []
      for (var j in this.cart) {
        qtyOrders.push('(@' + this.cart[j].product_price + ') => ' + this.cart[j].product_price * this.cart[j].product_qty)
      }
      console.log(itemOrders.length)
      console.log(qtyOrders.length)
      doc.text(itemOrders, 37, 50)
      doc.text(qtyOrders, 140, 50)
      doc.text('PPN (10%) : ', 20, 50 + (itemOrders.length * 5) + 10)
      doc.text(`Rp. ${this.totalPrice() * 0.1}`, 140, 50 + (itemOrders.length * 5) + 10)
      doc.text('Total Price : ', 20, 50 + (itemOrders.length * 5) + 20)
      doc.text(`Rp. ${this.totalPrice() + (this.totalPrice() * 0.1)}`, 140, 50 + (itemOrders.length * 5) + 20)
      doc.text('THANK YOU FOR COMING HERE', 71, 50 + (itemOrders.length * 5) + 30)
      doc.save('pdf.pdf')
      this.$refs['modal-checkout'].hide()
      this.cancelOrder()
      this.makeToast('success', 'Success', 'Order Success')
    },
    sendEmail() {
      console.log('comingsoon')
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        solid: true
      })
    }
  }
}
</script>
