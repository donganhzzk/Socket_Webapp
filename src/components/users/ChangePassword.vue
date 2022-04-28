<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="changePasswordUser"
    id="change-password-user"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div
          class="modal-header pt-3 pb-3 mb-2"
          id="kt_modal_new_address_header"
        >
          <!--begin::Modal title-->
          <h3>Đổi mật khẩu</h3>
          <!--end::Modal title-->

          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
            @click="handleCloseModal()"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
          <!--begin:Form-->
          <el-form
            @submit.prevent="handleChangePassword(formRef)"
            :model="user"
            :rules="rules"
            ref="formRef"
            class="form"
          >
            <!--begin::Input group-->
            <div class="d-flex flex-column mb-1 fv-row mt-5">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Mật khẩu mới</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="password">
                <el-input
                  :class="{ custom_error: errorUser.password }"
                  v-model="user.password"
                  placeholder="Nhập mật khẩu"
                  name="password"
                  type="password"
                ></el-input>
                <div class="el-form-item__error" v-if="errorUser.password">
                  {{ errorUser.password }}
                </div>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-1 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Nhập lại mật khẩu</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="password_confirmation">
                <el-input
                  :class="{ custom_error: errorUser.password_confirmation }"
                  v-model="user.password_confirmation"
                  placeholder="Nhập lại mật khẩu"
                  name="password_confirmation"
                  type="password"
                  @blur="checkConfirmPassword()"
                ></el-input>
                <div
                  class="el-form-item__error"
                  v-if="errorUser.password_confirmation"
                >
                  {{ errorUser.password_confirmation }}
                </div>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center mt-5">
              <button
                type="reset"
                class="btn btn-white me-3"
                data-bs-toggle="modal"
                data-bs-target="#change-password-user"
                @click="handleCloseModal()"
              >
                Đóng
              </button>

              <!--begin::Button-->
              <button
                class="btn btn-lg btn-primary"
                type="submit"
                :disabled="loading"
              >
                <span v-if="!loading" class="indicator-label"> Xác nhận </span>
                <span v-if="loading" class="indicator-label">
                  Vui lòng đợi...
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
              <!--end::Button-->
            </div>
            <!--end::Actions-->
          </el-form>
          <!--end:Form-->
        </div>
        <!--end::Modal body-->
      </div>
    </div>
    <!--end::Modal dialog-->

    <!--begin::Close modal-->
    <span ref="closeModal" data-bs-dismiss="modal"></span>
    <!--end::Close modal-->
  </div>
  <!--end::Modal - New Address-->
</template>

<script>
import { ref } from "vue";
import { ElNotification } from "element-plus";
import ApiService from "@/core/services/ApiService";
import _ from "lodash";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "ChangePasswordUser",
  props: ["reload", "id"],
  mounted() {
    this.handleResetForm();
  },
  watch: {
    "user.password"(value) {
      if (
        value.length === 0 ||
        this.user.password === this.user.password_confirmation
      ) {
        this.errorUser.password_confirmation = "";
      }
    },
    "user.password_confirmation"(value) {
      if (
        value.length === 0 ||
        this.user.password === this.user.password_confirmation
      ) {
        this.errorUser.password_confirmation = "";
      }
    },
  },
  setup() {
    const user = ref({
      password: "",
      password_confirmation: "",
    });
    const errorUser = ref({
      password: "",
      password_confirmation: "",
    });
    const formRef = ref(null);
    const rules = ref({
      password: [
        {
          required: true,
          message: "Mật khẩu không được để trống.",
          trigger: "change",
        },
      ],
      password_confirmation: [
        {
          required: true,
          message: "Mật khẩu xác nhận không được để trống.",
          trigger: "change",
        },
      ],
    });
    const loading = ref(false);

    return {
      user,
      errorUser,
      formRef,
      rules,
      loading,
    };
  },
  methods: {
    checkConfirmPassword() {
      let error = false;
      if (this.user.password_confirmation.length > 0) {
        if (this.user.password_confirmation !== this.user.password) {
          this.errorUser.password_confirmation =
            "Mật khẩu xác nhận không khớp.";
          error = true;
        }
      }

      return error;
    },
    handleResetForm() {
      // Reset data
      this.user.password = "";
      this.user.password_confirmation = "";

      // Reset errors
      this.errorUser.password = "";
      this.errorUser.password_confirmation = "";
    },
    handleCloseModal() {
      this.$refs.formRef.resetFields();
      this.$refs.closeModal.click();
      this.handleResetForm();
    },
    handleChangePassword(formRef) {
      this.loading = true;
      formRef.validate((valid) => {
        if (valid && !this.checkConfirmPassword()) {
          let data = {
            password: this.user.password,
            password_confirmation: this.user.password_confirmation,
          };

          ApiService.delete("users", data)
            .then(() => {
              this.loading = false;
              ElNotification({
                title: "Thành công",
                message: "Đổi mật khẩu người dùng thành công.",
                type: "success",
              });

              this.handleCloseModal();
              this.$emit("update:reload", !this.reload);
            })
            .catch((error) => {
              this.loading = false;
              let errors = _.get(error.response, "data.errors", {});
              if (Object.keys(errors).length === 0) {
                ElNotification({
                  title: "Thất bại",
                  message: "Đổi mật khẩu người dùng thất bại.",
                  type: "error",
                });
              }
              if (Object.keys(errors).length > 0) {
                this.errorUser.password = _.get(errors, "password[0]", "");
                this.errorUser.password_confirmation = _.get(
                  errors,
                  "password_confirmation[0]",
                  ""
                );
              }
            });
        } else {
          this.loading = false;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.custom_error::v-deep {
  .el-input__inner {
    border-color: #f56c6c;
  }
}
.parent-error {
  display: flex;
  justify-content: center;
  height: 20px;

  .el-form-item__error {
    position: unset;
  }
}
</style>
