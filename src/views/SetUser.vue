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
                placeholder="Search User Email"
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
            :filter-included-fields="['user_email']"
            :per-page="getLimitUser"
            :current-page="currentPage"
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
                v-b-modal.modal-user
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
          ></b-pagination>
        </b-col>
      </b-row>
    </b-container>

    <b-modal id="modal-user" title="Edit User" hide-footer>
      <b-form>
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input
            id="nested-name"
            v-model="form.user_name"
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Email" label-for="nested-email">
          <b-form-input
            id="nested-email"
            v-model="form.user_email"
            disabled
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-sm="3" label="Role" label-for="nested-role">
          <b-form-select
            id="nested-role"
            v-model="form.user_role"
            :options="roleOpt"
          ></b-form-select>
        </b-form-group>
        <b-form-group
          label-cols-sm="3"
          label="Status"
          label-for="nested-status"
        >
          <b-form-select
            id="nested-status"
            v-model="form.user_status"
            :options="statusOpt"
          ></b-form-select>
        </b-form-group>
        <b-button type="button" variant="primary" @click="onUpdateUser()"
          >Update</b-button
        >
      </b-form>
    </b-modal>
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
      isSearch: false,
      form: {},
      roleOpt: [
        { value: 1, text: 'Admin' },
        { value: 2, text: 'Cashier' }
      ],
      statusOpt: [
        { value: 0, text: 'Not Active' },
        { value: 1, text: 'Active' }
      ],
      currentPage: 1
    }
  },
  created() {
    this.getUsers()
  },
  computed: {
    ...mapGetters([
      'getDataUser',
      'getPageUser',
      'getLimitUser',
      'getTotalDataUser'
    ])
  },
  methods: {
    ...mapActions(['getUsers', 'patchUsers']),
    ...mapMutations(['setPageUser']),
    pageChange(numbPage) {
      this.setPageUser(numbPage)
      this.getUsers()
      // this.$router.push(`?page=${numbPage}`)
    },
    editUser(data) {
      this.form = {
        user_email: data.item.user_email,
        user_name: data.item.user_name,
        user_role: data.item.user_role,
        user_status: data.item.user_status
      }
      this.userId = data.item.user_id
    },
    onUpdateUser() {
      const payload = {
        id: this.userId,
        form: this.form
      }
      this.patchUsers(payload)
        .then((response) => {
          this.makeToast('success', 'Success', response.message)
          this.$bvModal.hide('modal-user')
          this.getUsers()
        })
        .catch((error) => {
          this.makeToast('danger', 'Error', error.data.message)
        })
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title: 'Success',
        variant: variant,
        solid: true
      })
    }
  }
}
</script>

<style scoped></style>
