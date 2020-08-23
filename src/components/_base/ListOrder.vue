<template>
  <div class="mt-4 mb-5">
    <b-row>
      <b-col xl="4" class="pr-0">
        <img src="../../assets/img-order/blackforest.jpg" class="img-order" />
      </b-col>
      <b-col xl="8">
        <div
          class="d-flex flex-column justify-content-between"
          style="height:100%;"
        >
          <div>
            <h3>Black Forest</h3>
          </div>
          <div xl="12">
            <b-row>
              <b-col xl="6">
                <div class="btn-add btn-group">
                  <button class="px-2">
                    <span class="span-quantity">-</span>
                  </button>
                  <button class="px-2 bg-white">
                    <span class="span-quantity">1</span>
                  </button>
                  <button class="px-2">
                    <span class="span-quantity">+</span>
                  </button>
                </div>
              </b-col>
              <b-col xl="6" class="text-right">Rp. 30.000</b-col>
            </b-row>
          </div>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'ListOrder'
}
</script>
