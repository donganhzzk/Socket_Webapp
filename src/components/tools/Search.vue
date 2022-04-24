<template>
  <div class="d-flex align-items-center position-relative my-1">
    <span class="svg-icon svg-icon-1 position-absolute ms-6">
      <inline-svg src="media/icons/duotune/general/gen021.svg" />
    </span>
    <input
      type="text"
      v-model="qr"
      class="form-control form-control-solid w-400px ps-15"
      placeholder="Nhập tên, email hoặc số điện thoại"
      @keyup.enter="searchUser()"
    />
    <span
      v-show="qr"
      @click="reset()"
      class="btn btn-flush btn-active-color-primary position-absolute top-50 pe-3 end-0 translate-middle-y lh-0"
    >
      <span class="svg-icon svg-icon-2 svg-icon-lg-1 me-0">
        <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
      </span>
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Results from "@/layout/header/partials/search/Results.vue";
import Main from "@/layout/header/partials/search/Main.vue";
import Empty from "@/layout/header/partials/search/Empty.vue";
import MenuComponent from "@/components/menu/MenuComponent.vue";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Search",
  watch: {
    qr() {
      if (!this.qr) this.reset();
    },
  },
  data() {
    return {
      qr: "",
    };
  },
  methods: {
    reset() {
      this.qr = "";
      this.$emit("resetSearch");
    },
    searchUser() {
      this.$emit("search", this.qr);
    },
  },
});
</script>
