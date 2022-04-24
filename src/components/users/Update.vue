<template>
  <!--begin::Modal - New Address-->
  <div
    class="modal fade"
    ref="updateUser"
    id="update-user"
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
          <h3>Thay đổi thông tin</h3>
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
            @submit.prevent="handleUpdateUser(formRef)"
            :model="user"
            :rules="rules"
            ref="formRef"
            class="form"
          >
            <!--begin::Input group-->
            <div class="row mb-6 mt-4">
              <!--begin::Col-->
              <div class="col-12 d-flex align-items-center flex-column">
                <!--begin::Image input-->
                <div
                  class="image-input image-input-outline"
                  data-kt-image-input="true"
                  style="background-image: url(media/avatars/blank.png)"
                >
                  <!--begin::Preview existing avatar-->
                  <div
                    class="image-input-wrapper w-125px h-125px"
                    :style="`background-image: url(${avatarUrl})`"
                  ></div>
                  <!--end::Preview existing avatar-->

                  <!--begin::Label-->
                  <label
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                    data-kt-image-input-action="change"
                    data-bs-toggle="tooltip"
                    title="Change avatar"
                  >
                    <i class="bi bi-pencil-fill fs-7"></i>

                    <!--begin::Inputs-->
                    <input
                      type="file"
                      name="avatar"
                      accept=".png, .jpg, .jpeg"
                      @change="onFileChange"
                    />
                    <input type="hidden" name="avatar_remove" />
                    <!--end::Inputs-->
                  </label>
                  <!--end::Label-->

                  <!--begin::Remove-->
                  <span
                    class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-white shadow"
                    data-kt-image-input-action="remove"
                    data-bs-toggle="tooltip"
                    @click="removeImage()"
                    title="Remove avatar"
                  >
                    <i class="bi bi-x fs-2"></i>
                  </span>
                  <!--end::Remove-->
                </div>
                <!--end::Image input-->

                <!--begin::Hint-->
                <div class="form-text">
                  Hỗ trợ định dạng: jpg, jpeg, png, bmp, gif, svg, or webp.
                </div>
                <!--end::Hint-->

                <!--begin::Error-->
                <div class="position-relative w-100 parent-error">
                  <div class="el-form-item__error" v-if="errorUser.avatar">
                    {{ errorUser.avatar }}
                  </div>
                </div>
                <!--end::Error-->
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-1 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Họ tên</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="name">
                <el-input
                  :class="{ custom_error: errorUser.name }"
                  v-model="user.name"
                  maxlength="50"
                  show-word-limit
                  placeholder="Nhập họ tên"
                  name="name"
                ></el-input>
                <div class="el-form-item__error" v-if="errorUser.name">
                  {{ errorUser.name }}
                </div>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-1 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span class="required">Email</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="email">
                <el-input
                  :class="{ custom_error: errorUser.email }"
                  v-model="user.email"
                  maxlength="64"
                  show-word-limit
                  placeholder="Nhập email"
                  name="email"
                ></el-input>
                <div class="el-form-item__error" v-if="errorUser.email">
                  {{ errorUser.email }}
                </div>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-column mb-1 fv-row">
              <!--begin::Label-->
              <label class="d-flex align-items-center fs-6 fw-bold mb-2">
                <span>Số điện thoại</span>
              </label>
              <!--end::Label-->

              <el-form-item prop="phone">
                <el-input
                  :class="{ custom_error: errorUser.phone }"
                  v-model="user.phone"
                  maxlength="10"
                  show-word-limit
                  placeholder="Nhập số điện thoại"
                  name="phone"
                ></el-input>
                <div class="el-form-item__error" v-if="errorUser.phone">
                  {{ errorUser.phone }}
                </div>
              </el-form-item>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="row g-9 mb-1">
              <!--begin::Col-->
              <div class="col-12 fv-row">
                <label class="fs-6 fw-bold mb-2">Vai trò</label>

                <el-form-item prop="role_id">
                  <el-select
                    :class="{ custom_error: errorUser.role_id }"
                    v-model="user.role_id"
                    placeholder="Chọn vai trò"
                    name="role_id"
                    as="select"
                  >
                    <el-option value="">Select user...</el-option>
                    <el-option label="Karina Clark" value="1"
                      >Karina Clark</el-option
                    >
                    <el-option label="Robert Doe" value="2"
                      >Robert Doe</el-option
                    >
                    <el-option label="Niel Owen" value="3">Niel Owen</el-option>
                    <el-option label="Olivia Wild" value="4"
                      >Olivia Wild</el-option
                    >
                    <el-option label="Sean Bean" value="5">Sean Bean</el-option>
                  </el-select>
                  <div class="el-form-item__error" v-if="errorUser.role_id">
                    {{ errorUser.role_id }}
                  </div>
                </el-form-item>
              </div>
              <!--end::Col-->
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="d-flex flex-stack mb-5">
              <!--begin::Label-->
              <div class="me-5 position-relative w-100">
                <label class="fs-6 fw-bold">Trạng thái</label>
                <div class="el-form-item__error" v-if="errorUser.is_active">
                  {{ errorUser.is_active }}
                </div>
              </div>
              <!--end::Label-->

              <!--begin::Switch-->
              <label
                class="form-check form-switch form-check-custom form-check-solid"
              >
                <input
                  :class="{ custom_error: errorUser.is_active }"
                  class="form-check-input"
                  type="checkbox"
                  v-model="user.is_active"
                />
                <span class="form-check-label fw-bold text-gray-400"></span>
              </label>
              <!--end::Switch-->
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="text-center mt-5">
              <button
                type="reset"
                class="btn btn-white me-3"
                data-bs-toggle="modal"
                data-bs-target="#update-user"
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
import _, { cloneDeep } from "lodash";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "UpdateUser",
  props: ["data", "reload"],
  watch: {
    "user.avatar"() {
      this.errorUser.avatar = "";
    },
    "user.name"() {
      this.errorUser.name = "";
    },
    "user.email"() {
      this.errorUser.email = "";
    },
    "user.phone"() {
      this.errorUser.phone = "";
    },
    "user.is_active"() {
      this.errorUser.is_active = "";
    },
    "user.role_id"() {
      this.errorUser.role_id = "";
    },
    data(value) {
      this.user = cloneDeep(value);
      this.user.avatar = "";
      this.avatarUrl = value.avatar;
    },
  },
  setup() {
    const user = ref({
      avatar: "",
      name: "",
      email: "",
      phone: "",
      is_active: false,
      role_id: "",
    });
    const errorUser = ref({
      name: "",
      email: "",
      phone: "",
      avatar: "",
      is_active: "",
      role_id: "",
    });
    const formRef = ref(null);
    const rules = ref({
      name: [
        {
          required: true,
          message: "Họ tên không được để trống.",
          trigger: "change",
        },
      ],
      email: [
        {
          required: true,
          message: "Email không được để trống.",
          trigger: "change",
        },
        {
          type: "email",
          message: "Email sai định dạng.",
          trigger: "blur",
        },
      ],
      phone: [
        {
          type: "regexp",
          pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\\b/g,
          message: "Số điện thoại không hợp lệ.",
          trigger: "blur",
        },
      ],
    });
    const loading = ref(false);
    const avatarUrl = ref("media/avatars/blank.png");

    return {
      user,
      errorUser,
      formRef,
      rules,
      loading,
      avatarUrl,
    };
  },
  methods: {
    onFileChange(e) {
      let avatar = e.target.files[0];
      this.avatarUrl = URL.createObjectURL(avatar);
      this.user.avatar = avatar;
    },
    removeImage() {
      this.avatarUrl = "media/avatars/blank.png";
      this.user.avatar = "";
    },
    handleResetForm() {
      // Reset data
      this.user.name = "";
      this.user.email = "";
      this.user.phone = "";
      this.user.avatar = "";
      this.user.is_active = false;
      this.user.role_id = "";
      this.avatarUrl = "media/avatars/blank.png";

      // Reset errors
      this.errorUser.name = "";
      this.errorUser.email = "";
      this.errorUser.phone = "";
      this.errorUser.avatar = "";
      this.errorUser.is_active = "";
      this.errorUser.role_id = "";
    },
    handleCloseModal() {
      this.$refs.formRef.resetFields();
      this.$refs.closeModal.click();
      this.handleResetForm();
    },
    handleUpdateUser(formRef) {
      this.loading = true;
      formRef.validate((valid) => {
        if (valid) {
          let data = new FormData();
          data.append("name", this.user.name);
          data.append("email", this.user.email);
          data.append("phone", this.user.phone ? this.user.phone : "");
          data.append("is_active", this.user.is_active);
          data.append("role_id", this.user.role_id ? this.user.role_id : "");
          if (this.user.avatar) data.append("avatar", this.user.avatar);

          ApiService.update("users", this.user._id, data)
            .then(() => {
              this.loading = false;
              ElNotification({
                title: "Thành công",
                message: "Cập nhật thông tin người dùng thành công.",
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
                  message: "Cập nhật thông tin người dùng thất bại.",
                  type: "error",
                });
              }
              if (Object.keys(errors).length > 0) {
                this.errorUser.avatar = _.get(errors, "avatar[0]", "");
                this.errorUser.name = _.get(errors, "name[0]", "");
                this.errorUser.email = _.get(errors, "email[0]", "");
                this.errorUser.phone = _.get(errors, "phone[0]", "");
                this.errorUser.role_id = _.get(errors, "role_id[0]", "");
                this.errorUser.is_active = _.get(errors, "is_active[0]", "");
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
