<template>
  <b-container fluid>
    <Header title="Setting Category" />
    <b-container class="my-4 bg-light">
      <b-row class="py-3">
        <b-col cols="6">
          <b-button variant="success" @click="addCategory()"
            >Add Category</b-button
          >
        </b-col>
        <b-col cols="6">Search Category</b-col>
        <b-col cols="12" class="my-4">
          <b-table
            id="table_category"
            striped
            responsive
            hover
            :items="itemCategory"
            :fields="fields"
            :filter="filter"
            :filterIncludedFields="['category_name']"
            :per-page="limit"
            :current-page="currentPage"
            style="text-align: center"
          >
            <template #cell(actions)="data">
              <b-icon
                icon="pencil"
                class="m-2 d-inline-block align-top img-edit"
                alt="edit"
                v-b-modal.modal-2
                @click="setCategory(data)"
              />
              |
              <b-icon
                icon="trash"
                class="m-2 d-inline-block align-top action-img"
                alt="delete"
                v-b-modal.modal-3
                @click="showDelBoxCat(data)"
              />
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>

    <!-- MODAL-CATEGORY (ADD / UPDATE) -->
    <b-modal ref="modal-category" :title="modalHeader" hide-footer>
      <b-form @submit.prevent="onSubmit">
        <b-form-group label-cols-sm="3" label="Name" label-for="nested-name">
          <b-form-input
            id="nested-name"
            v-model="formCategory.category_name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Status" label-for="nested-name">
          <b-form-input
            id="nested-name"
            v-model="formCategory.category_status"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" v-if="!isUpdate"
          >Submit</b-button
        >
        <b-button
          type="button"
          variant="primary"
          v-if="isUpdate"
          @click="onUpdateCat()"
          >Update</b-button
        >
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
import Header from '@/components/Header'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'SetCategory',
  components: {
    Header
  },
  data() {
    return {
      fields: [
        { key: 'category_id', label: 'ID' },
        { key: 'category_name', label: 'Name', sortable: true },
        { key: 'category_status', label: 'Status', sortable: true },
        { key: 'category_created_at', label: 'Created', sortable: true },
        { key: 'category_updated_at', label: 'Updated', sortable: true },
        'Actions'
      ],
      currentPage: 1,
      filter: null,
      limit: 5,
      modalHeader: '',
      isUpdate: false,
      formCategory: []
    }
  },
  created() {
    this.getCategory()
  },
  computed: {
    ...mapGetters({ itemCategory: 'getItemCategory' })
  },
  methods: {
    ...mapActions(['getCategory', 'postCategory']),
    addCategory() {
      this.formCategory = {
        category_name: '',
        category_status: ''
      }
      this.modalHeader = 'Add Category'
      this.isUpdate = false
      this.$refs['modal-category'].show()
    },
    makeToast(variant, title, message) {
      this.$bvToast.toast(message, {
        title,
        variant: variant,
        solid: true
      })
    },
    onSubmit() {
      this.postCategory(this.formCategory)
        .then(response => {
          this.getCategory()
          this.makeToast('success', 'Success', 'Category Created')
          this.$refs['modal-category'].hide()
        })
        .catch(error => {
          this.makeToast('danger', 'Error', error.data.message)
        })
    }
  }
}
</script>

<style scoped></style>
