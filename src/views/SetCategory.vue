<template>
  <b-container fluid>
    <Header title="Setting Category" />
    <b-container class="my-4 bg-light">
      <b-row class="py-3">
        <b-col cols="8">
          <b-button variant="secondary" @click="addCategory()"
            >Add Category</b-button
          >
        </b-col>
        <b-col cols="4">
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
            style="text-align: center"
          >
            <template #cell(actions)="item">
              <b-icon
                scale="1.5"
                icon="pencil-square"
                variant="warning"
                class="m-2 d-inline-block align-top img-edit"
                alt="edit"
                @click="editCategory(item)"
              />
              |
              <b-icon
                scale="1.5"
                icon="trash"
                variant="danger"
                class="m-2 d-inline-block align-top action-img"
                alt="delete"
                @click="confirmDelete(item)"
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

        <b-button
          type="submit"
          variant="success"
          v-if="!isUpdate"
          class="text-right"
          >Submit</b-button
        >
        <b-button
          type="button"
          variant="warning"
          class="text-white"
          v-if="isUpdate"
          @click="onUpdate()"
          >Update</b-button
        >
      </b-form>
    </b-modal>

    <!-- MODAL CONFIRM DELETE -->
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
      filter: null,
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
    ...mapActions([
      'getCategory',
      'postCategory',
      'patchCategory',
      'deleteCategory'
    ]),
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
    },
    editCategory(data) {
      console.log(data)
      this.$refs['modal-category'].show()
      this.modalHeader = 'Edit Category'
      this.isUpdate = true
      this.formCategory = {
        category_name: data.item.category_name,
        category_status: data.item.category_status
      }
      console.log(this.formCategory)
      this.category_id = data.item.category_id
    },
    onUpdate() {
      const updateData = {
        category_id: this.category_id,
        formCategory: this.formCategory
      }
      this.patchCategory(updateData)
        .then(response => {
          this.getCategory()
          this.makeToast(
            'success',
            'Success',
            `Category ${this.category_id} Updated`
          )
          this.$refs['modal-category'].hide()
        })
        .catch(error => this.makeToast('danger', 'Error', error.data.message))
    },
    confirmDelete(data) {
      this.$bvModal
        .msgBoxConfirm(
          `Are you sure want to delete Category ${data.item.category_name} ?`,
          {
            title: 'Delete Category',
            okVariant: 'danger',
            okTitle: 'YES',
            cancelTitle: 'NO',
            footerClass: 'p-2',
            centered: true
          }
        )
        .then(response => {
          if (response === true) {
            this.deleteCategory(data.item.category_id)
            this.getCategory()
            this.makeToast('success', 'Success', 'Category Deleted')
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>
