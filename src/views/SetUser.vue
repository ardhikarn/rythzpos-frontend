<template>
  <b-container fluid>
    <Header title="Setting User" />
    <b-container class="my-4 bg-light">
      <b-row class="pt-3">
        <b-col cols="9"></b-col>
        <b-col cols="3">
          <b-form-group>
            <b-input-group>
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search"
              ></b-form-input>
              <b-input-group-append>
                <!-- <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                > -->
                <div class="btn bg-secondary" style="cursor: default">
                  <b-icon icon="search" scale="1"></b-icon>
                </div>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col cols="12" class="mt-3">
          <b-table
            id="table-user"
            striped
            hover
            responsive
            :items="getDataUser"
            :fields="fields"
            :filter="filter"
            :filter-included-fields="['user_name']"
            class="text-center"
          >
            <template #cell(actions)="item">
              <b-icon
                icon="pencil-square"
                scale="1.5"
                variant="warning"
                class="m-2 d-inline-block align-top img-edit"
                alt="edit"
                @click="editUser(item)"
              />
            </template>
          </b-table>
        </b-col>
        <b-col cols="12" class="mt-5">
          <b-pagination
            align="center"
            v-model="currentPage"
            :total-rows="getTotalDataUser"
            :per-page="getLimitUser"
            @change="pageChange"
            v-show="!isSearch"
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import Header from '@/components/Header'
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'SetUser',
  components: {
    Header
  },
  data() {
    return {
      fields: [
        { key: 'user_id', label: 'User ID' },
        { key: 'user_name', label: 'Name' },
        { key: 'user_email', label: 'Email' },
        { key: 'user_role', label: 'Role' },
        { key: 'user_status', label: 'Status' },
        { key: 'user_created_at', label: 'Created' },
        { key: 'user_updated_at', label: 'Updated' },
        'Actions'
      ],
      filter: null,
      currentPage: 1,
      isSearch: false
    }
  },
  created() {
    this.getAllUser()
  },
  computed: {
    ...mapGetters(['getDataUser', 'getTotalDataUser', 'getLimitUser'])
  },
  methods: {
    ...mapActions(['getAllUser']),
    ...mapMutations(['setPageUser']),
    pageChange(numbPage) {
      // this.$router.push(`?page=${numbPage}`)
      this.setPageUser(numbPage)
      this.getProducts()
    }
  }
}
</script>

<style scoped></style>
