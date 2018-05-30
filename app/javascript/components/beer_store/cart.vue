<template>
<div class="container-fluid">
  <router-link :to="{ name: 'Checkout'  }" class="btn-class">Procced To Checkout</router-link>
  <router-link :to="{ name: 'List'  }" class="btn-class-left">Back to Lists</router-link>
  <div class="mainDiv">
    <div class="card">
      <div class="card-body">
        <div class="card-header text-center">
           <div><i class="fa fa-stack-overflow"></i>
           Total Items In The Cart</div>
        </div>
      <b-table striped :items="items" :fields="fields">
        <template slot="remove" slot-scope="data">
          <b-button class="" @click="removeItem(data)"><i class="fa fa-times"></i></b-button>
        </template>
      </b-table>
    </div>
  </div>
</div>
</div>
</template>
<script>
export default {
  data() {
    return {
      items: [],
      fields: [
        {
          key: "abv"
        },
        {
          key: "ibu"
        },
        {
          key: "id"
        },
        {
          key: "style"
        },
        {
          key: "ounces"
        },
        {
          key: "remove"
        }
      ]
    };
  },
  methods: {
    removeItem(data) {
      let index = this.items.indexOf(data.item);
      this.items.splice(index, 1);
      this.$session.set("cart", this.items);
    }
  },
  mounted() {
    this.items = this.$session.get("cart");
  }
};
</script>
<style scoped>
.btn-style {
  width: 25%;
  height: 25%;
}
.mainDiv {
  margin-top: 8%;
  margin-left: 15%;
  margin-right: 20%;
}
.btn-class {
  float: right;
}
.btn-class-left {
  float: left;
  display: block;
}
</style>

