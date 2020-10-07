<template>
  <b-container fluid>
    <Header title="Setting Product" />
    <b-container class="my-4 bg-light">
      <b-row class="pt-3">
        <b-col cols="9">
          <b-button variant="secondary" @click="addCategory()"
            >Add Product</b-button
          >
        </b-col>
        <b-col cols="3">
          <b-form-group>
            <b-input-group>
              <b-form-input
                v-model="filter"
                type="search"
                placeholder="Search"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
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
            :items="itemUser"
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
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'SetProduct',
  components: {
    Header
  },
  data() {
    return {}
  },
  created() {},
  computed: {},
  methods: {}
}
</script>

<style scoped></style>
