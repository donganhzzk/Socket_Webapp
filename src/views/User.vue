<template>
  <div class="card" id="user-wrapper">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <!--begin::Search-->
        <Search @resetSearch="resetSearch" @search="handleSearch"></Search>
        <!--end::Search-->
      </h3>
      <div class="card-toolbar">
        <a
          class="btn btn-sm btn-light-primary"
          data-bs-toggle="modal"
          data-bs-target="#store-user"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          Tạo mới
        </a>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive psn-vh-62">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead class="sticky-top custom-thead-table">
            <tr class="fw-bolder text-muted bg-light">
              <th class="ps-4 min-w-325px">Họ tên</th>
              <th class="min-w-200px">Email</th>
              <th class="min-w-150px">Số điện thoại</th>
              <th class="min-w-100px text-center">Trạng thái</th>
              <th class="pe-5 min-w-200px text-end">Hành động</th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody v-loading="loading">
            <template v-for="(item, index) in users" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div class="symbol symbol-50px me-5">
                      <img
                        v-if="item.avatar"
                        :src="item.avatar"
                        class=""
                        alt="Ảnh đại diện"
                      />
                      <img
                        v-else
                        src="media/avatars/blank.png"
                        class=""
                        alt=""
                      />
                    </div>

                    <div class="d-flex justify-content-start flex-column">
                      <a
                        href="#"
                        class="text-dark fw-bolder text-hover-primary mb-1 fs-6"
                      >
                        {{ item.name ? item.name : "Đang cập nhật" }}
                      </a>
                      <span class="text-muted fw-bold text-muted d-block fs-7">
                        {{ item.name ? item.name : "Đang cập nhật" }}
                      </span>
                    </div>
                  </div>
                </td>

                <td>
                  <span class="text-dark d-block mb-1 fs-6">
                    {{ item.email ? item.email : "Đang cập nhật" }}
                  </span>
                </td>

                <td>
                  <span class="text-dark d-block mb-1 fs-6">
                    {{ item.phone ? item.phone : "Đang cập nhật" }}
                  </span>
                </td>

                <td>
                  <div class="d-flex justify-content-center">
                    <div class="form-check form-check-solid form-switch">
                      <input
                        class="form-check-input w-45px h-30px"
                        type="checkbox"
                        id="googleswitch"
                        @change="handleChangeStatusActive(item)"
                        v-model="item.is_active"
                      />
                      <label class="form-check-label"></label>
                    </div>
                  </div>
                </td>

                <td class="text-end pe-1">
                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Đổi mật khẩu"
                    placement="top"
                  >
                    <a
                      href="#"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <i class="fas fa-lock"></i>
                    </a>
                  </el-tooltip>

                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Thay đổi thông tin"
                    placement="top"
                  >
                    <a
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      data-bs-toggle="modal"
                      data-bs-target="#update-user"
                      @click="showFormUpdate(item)"
                    >
                      <i class="fas fa-user-edit"></i>
                    </a>
                  </el-tooltip>

                  <el-tooltip
                    class="box-item"
                    effect="dark"
                    content="Xóa"
                    placement="top"
                  >
                    <a
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      @click="handleDeleteUser(item._id)"
                    >
                      <span class="svg-icon svg-icon-3">
                        <inline-svg
                          src="media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </a>
                  </el-tooltip>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->

      <!--begin::Pagination-->
      <Pagination
        :page="page"
        @currentChange="handleCurrentChange"
      ></Pagination>
      <!--end::Pagination-->
    </div>
    <!--end::Body-->

    <!--begin::Modal-->
    <Store v-model:reload="reload"></Store>
    <!--end::Modal-->

    <!--begin::Modal-->
    <Update v-model:reload="reload" :data="user"></Update>
    <!--end::Modal-->
  </div>
</template>

<script>
import ApiService from "@/core/services/ApiService";
import _ from "lodash";
import Search from "@/components/tools/Search";
import Pagination from "@/components/tools/Pagination";
import Store from "@/components/users/Store";
import Update from "@/components/users/Update";
import { ref } from "vue";
import { ElNotification } from "element-plus";
import Swal from "sweetalert2";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "User",
  components: {
    Search,
    Pagination,
    Store,
    Update,
  },
  mounted() {
    this.getListUser();
  },
  watch: {
    reload() {
      this.getListUser();
    },
  },
  setup() {
    const qr = ref("");
    const users = ref({});
    const user = ref({});
    const page = ref({
      currentPage: 1,
      pageSize: 10,
      total: 0,
      from: 0,
      to: 0,
    });
    const type = ref("store");
    const loading = ref(true);
    const reload = ref(true);

    return {
      qr,
      users,
      user,
      page,
      type,
      loading,
      reload,
    };
  },
  methods: {
    getListUser(params = {}) {
      this.loading = true;
      ApiService.query("users", params)
        .then(({ data }) => {
          this.users = _.get(data, "data.data");
          this.page.currentPage = _.get(data, "data.current_page");
          this.page.pageSize = _.get(data, "data.per_page");
          this.page.total = _.get(data, "data.total", 0);
          let from = _.get(data, "data.from", 0);
          let to = _.get(data, "data.to", 0);
          this.page.from = from ? from : 0;
          this.page.to = to ? to : 0;
          this.loading = false;
        })
        .catch(() => {
          ElNotification({
            title: "Thất bại",
            message: "Đã có lỗi xảy ra, vui lòng thử lại.",
            type: "error",
          });
        });
    },
    handleSearch(qr) {
      this.qr = qr;
      let data = { params: {} };
      if (this.qr.length > 0) data.params.qr = qr;

      this.getListUser(data);
    },
    resetSearch() {
      this.getListUser();
    },
    handleCurrentChange(page) {
      let data = { params: {} };
      data.params.page = page;
      if (this.qr.length > 0) data.params.qr = this.qr;

      this.getListUser(data);
    },
    showFormUpdate(data) {
      this.user = data;
    },
    handleChangeStatusActive(user) {
      let body = {
        is_active: user.is_active,
      };
      ApiService.post(`users/${user._id}/change-status-active`, body)
        .then(() => {
          ElNotification({
            title: "Thành công",
            message: "Cập nhật trạng thái người dùng thành công.",
            type: "success",
          });

          this.handleCurrentChange(this.page.currentPage);
        })
        .catch(() => {
          ElNotification({
            title: "Thất bại",
            message: "Cập nhật trạng thái người dùng thất bại.",
            type: "error",
          });

          this.handleCurrentChange(this.page.currentPage);
        });
    },
    handleDeleteUser(id) {
      Swal.fire({
        title: "Bạn chắc chắn muốn xóa?",
        text: "Dữ liệu sau khi xóa không thể khôi phục!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Đóng",
      }).then((result) => {
        if (result.isConfirmed) {
          ApiService.delete(`users/${id}/`)
            .then(() => {
              ElNotification({
                title: "Thành công",
                message: "Xóa người dùng thành công.",
                type: "success",
              });

              this.getListUser();
            })
            .catch(() => {
              ElNotification({
                title: "Thất bại",
                message: "Xóa người dùng thất bại.",
                type: "error",
              });

              this.getListUser();
            });
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.custom-thead-table {
  z-index: 1;
}
</style>
