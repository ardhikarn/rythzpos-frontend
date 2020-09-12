<template>
  <b-col xl="8" class="main-product" style="height:100%;">
    <b-row>
      <!-- SEARCH AND SORT -->
      <b-col xl="12" class="my-3">
        <!-- SEARCH -->
        <b-row>
          <b-col cols="9">
            <b-form @submit.prevent="searchProduct" inline>
              <b-input placeholder="Search Product" v-model="search"></b-input>
              <b-button type="submit" class="ml-2">Search</b-button>
            </b-form>
          </b-col>
          <!-- SORT -->
          <b-col cols="3" class="text-right">
            <b-dropdown :text="sortText" v-show="!isSearch">
              <b-dropdown-group header="Name">
                <b-dropdown-item-button @click="sortBy('product_name ASC')">A-Z</b-dropdown-item-button>
                <b-dropdown-item-button @click="sortBy('product_name DESC')">Z-A</b-dropdown-item-button>
              </b-dropdown-group>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-group header="Price">
                <b-dropdown-item-button @click="sortBy('product_price DESC')">Highest</b-dropdown-item-button>
                <b-dropdown-item-button @click="sortBy('product_price ASC')">Lowest</b-dropdown-item-button>
              </b-dropdown-group>
            </b-dropdown>
          </b-col>
        </b-row>
      </b-col>

      <!-- card product -->
      <b-col xl="12">
        <b-row>
          <!-- card product looping -->
          <b-col xl="4" lg="4" md="6" v-for="(item, index) in product" :key="index" class="my-3">
            <b-card>
              <b-card
                v-bind:img-src="
                        'http://127.0.0.1:3000/' + item.product_image
                      "
                img-alt="Image"
                no-body
                class
              >
                <!-- CHECKLIST -->
                <div class="checklist" v-if="checklistPlusMinus(item)">
                  <i class="far fa-check-circle text-white"></i>
                </div>
              </b-card>
              <b-row class="m-1">
                <b-col xl="12" class="card-product-name p-0">
                  <strong>{{ item.product_name }}</strong>
                </b-col>
                <b-col xl="12" class="card-product-price p-0">Rp. {{ item.product_price }}</b-col>
              </b-row>
              <!-- BUTTON ICON MAIN PRODUCT -->
              <template v-slot:footer>
                <b-row>
                  <b-col cols="4" align="center">
                    <span v-if="!checklistPlusMinus(item)">
                      <i class="fas fa-plus-circle icon-product" @click="addToCart(item)"></i>
                    </span>
                    <span v-else>
                      <i class="fas fa-minus-circle icon-product" @click="removeCart(item)"></i>
                    </span>
                  </b-col>
                  <b-col cols="4" align="center">
                    <span>
                      <i class="fas fa-edit icon-product" @click="editProduct(item)"></i>
                    </span>
                  </b-col>
                  <b-col cols="4" align="center">
                    <span>
                      <i class="fas fa-trash-alt icon-product" @click.prevent="deleteProduct(item)"></i>
                    </span>
                  </b-col>
                </b-row>
              </template>
            </b-card>
          </b-col>
        </b-row>
      </b-col>

      <!-- PAGINATION -->
      <b-col cols="12" class="mt-5">
        <b-pagination
          align="center"
          v-model="currentPage"
          :total-rows="totalData"
          :per-page="limit"
          @change="pageChange"
          v-show="!isSearch"
        ></b-pagination>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'MainProduct',
  data() {
    return {
      search: '',
      sortText: 'Sort',
      isSearch: false,
      currentPage: 1
    }
  },
  computed: {
    ...mapGetters({
      cart: 'getCart',
      product: 'getProduct2',
      totalData: 'getTotalData',
      limit: 'getLimit',
      page: 'getPage',
      sort: 'getSort'
    })
  },
  methods: {
    ...mapActions(['getProducts', 'searchProducts']),
    ...mapMutations(['addToCart', 'removeCart', 'sortProduct', 'setPage']),
    searchProduct() {
      this.$router.push(`?q=${this.search}`)
      if (this.search === '') {
        this.getProducts()
        this.isSearch = false
      } else {
        this.isSearch = true
        this.sortText = 'Sort'
        this.searchProduct(this.search)
      }
    },
    sortBy(data) {
      if (data === 'product_name ASC') {
        this.sortText = 'A-Z'
      } else if (data === 'product_name DESC') {
        this.sortText = 'Z-A'
      } else if (data === 'product_price ASC') {
        this.sortText = 'Lowest Price'
      } else if (data === 'product_price DESC') {
        this.sortText = 'Highest Price'
      }
      this.sortProduct(data)
      this.getProducts()
      this.$router.push(`?ob=${data}&p=${this.currentPage}`)
    },
    checklistPlusMinus(data) {
      return this.cart.some((value) => value.product_id === data.product_id)
    },
    pageChange(data) {
      this.pageChange(data)
      this.$router.push(`?ob=${this.sort}&p=${data}`)
      this.getProducts()
    }
  }
}
</script>
