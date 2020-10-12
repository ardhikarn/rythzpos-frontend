<template>
  <b-container fluid>
    <Header title="Setting Category" />
    <b-container class="my-4 bg-light">
      <b-row class="pt-3">
        <b-col cols="9">
          <b-button variant="secondary" @click="addCategory()"
            >Add Category</b-button
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
            id="table_category"
            striped
            responsive
            hover
            :items="itemCategory"
            :fields="fields"
            :filter="filter"
            :filter-included-fields="['category_name']"
            class="text-center"
            v-if="getCategory.category_id === '1' ? 'Active' : 'Not Active'"
          >
            <template #cell(actions)="item">
              <b-icon
                style="cursor: pointer"
                scale="1.3"
                icon="pencil-square"
                variant="warning"
                class="m-2 d-inline-block align-top img-edit"
                alt="edit"
                @click="editCategory(item)"
              />
              |
              <b-icon
                style="cursor: pointer"
                scale="1.3"
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
      formCategory: {}
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
        .then((response) => {
          this.getCategory()
          this.makeToast('success', 'Success', response.message)
          this.$refs['modal-category'].hide()
        })
        .catch((error) => {
          this.makeToast('danger', 'Error', error.data.message)
        })
    },
    editCategory(data) {
      this.$refs['modal-category'].show()
      this.modalHeader = 'Edit Category'
      this.isUpdate = true
      this.formCategory = {
        category_name: data.item.category_name,
        category_status: data.item.category_status
      }
      this.category_id = data.item.category_id
    },
    onUpdate() {
      const updateData = {
        category_id: this.category_id,
        formCategory: this.formCategory
      }
      this.patchCategory(updateData)
        .then((response) => {
          this.getCategory()
          this.makeToast('success', 'Success', response.message)
          this.$refs['modal-category'].hide()
        })
        .catch((error) => this.makeToast('danger', 'Error', error.data.message))
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
        .then((response) => {
          if (response) {
            this.deleteCategory(data.item.category_id)
              .then((res) => {
                this.getCategory()
                this.makeToast('success', 'Success', res.message)
              })
              .catch((error) => {
                this.makeToast('success', 'Success', error.data.message)
              })
          }
        })
    }
  }
}
</script>

<style src="../assets/css/style.css"></style>
