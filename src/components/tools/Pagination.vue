<template>
  <div class="d-flex flex-stack flex-wrap pt-10">
    <div class="fs-6 fw-bold text-gray-700">
      Số lượng kết quả: {{ page.from }} - {{ page.to }} của {{ page.total }}
    </div>

    <!--begin::Pages-->
    <el-pagination
      class="is-background"
      v-model:current-page="pagination.currentPage"
      @current-change="handleCurrentChange"
      :page-size="pagination.pageSize"
      layout="prev, pager, next"
      :total="pagination.total"
      :hide-on-single-page="true"
    >
    </el-pagination>
    <!--end::Pages-->
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: ["page"],
  setup(props) {
    const pagination = ref(props.page);

    return {
      pagination,
    };
  },
  methods: {
    handleCurrentChange(number) {
      this.$emit("currentChange", number);
    },
  },
};
</script>

<style scoped lang="scss">
.el-pagination::v-deep {
  .btn-next,
  .btn-prev,
  .el-pager li {
    background: none;
    border-radius: 0.475rem;
    font-weight: 500;
    font-size: 1.075rem;
    font-family: Poppins, Helvetica, sans-serif;
  }

  .el-pager li:not(.disabled).active {
    background-color: #009ef7;
  }
}
</style>
