<template>
<div id="wrapper" class="toggled-2">
  <div id="page-content-wrapper">
    <div class="container-fluid">
      <div class="card mt-4">
        <div class="card-body">
          <div class="row">
            <div class="col-md-4">
              <div class="form-group row">
                <label for="beerNameBox">Beer name :</label>
                <b-form-input id="beerNameBox" class="form-control check" v-model="searchBeer"
                    type="text"
                    placeholder="Enter Beer name"></b-form-input>
              </div>
            </div>
            <div class="col-md-4">
              <div class="form-group">
                <label for="styleSelect">Select Style :</label>
                <b-form-select id="styleSelect" class="check" v-model="selected" :options="options">
                  <template slot="first">
                    <option :value="null">Please select an option</option>
                  </template>
                </b-form-select>
              </div>
            </div>
            <div class="col-md-4" v-if="cart">
            <router-link :to="{ name: 'Cart' }">Cart<i class="fa fa-shopping-cart"></i>{{cart.length}}</router-link>
          </div>
          </div>
          <div class="table-responsive">
            <div class="table-responsive mt-4 border-top">
            <b-table striped :items="BeerToRender" :fields="fields">
              <template slot="No." slot-scope="data">
                {{ (currentPage - 1) * 10 + data.index + 1 }}
              </template>
              <template slot="action" slot-scope="data">
                <b-button class="btn btn-secondary" @click="addCartData(data.item)">Add to Cart</b-button>
              </template>
            </b-table>
            </div>
          </div>
          <b-pagination size="md" :total-rows="totalRows" v-model="currentPage" :per-page="perPage" @input="sortData()">
          </b-pagination>
      </div>
    </div>
  </div>
  </div>
</div>
</template>
<script>
import axios from "axios";
import { isEmpty as _isEmpty, uniq as _uniq } from "lodash";

export default {
  components: {},
  data() {
    return {
      beersData: [],
      currentPage: 1,
      perPage: 10,
      totalRows: 0,
      firstData: [],
      selected: null,
      searchBeer: null,
      fields: [
        {
          key: "No.",
          sortable: true
        },
        {
          key: "abv",
          sortable: true
        },
        {
          key: "ibu",
          sortable: false
        },
        {
          key: "id",
          sortable: true
        },
        {
          key: "style",
          sortable: false
        },
        {
          key: "ounces",
          sortable: false
        },
        {
          key: "action",
          sortable: false
        }
      ],
      options: ["IPA", "lager", "ale"],
      cart: []
    };
  },
  computed: {
    BeerToRender() {
      if (_isEmpty(this.searchBeer) && _isEmpty(this.selected)) {
        this.totalRows = this.beersData.length;
        return this.firstData;
      } else if (this.searchBeer) {
        const reg = new RegExp(this.searchBeer, "i");
        this.firstData = this.beersData.filter(rt => {
          return reg.test(rt.name);
        });
        this.totalRows = this.firstData.length;
        return this.firstData.slice(0, 10);
      } else {
        const reg = new RegExp(this.selected, "i");
        this.firstData = this.beersData.filter(rt => {
          return reg.test(rt.name);
        });
        this.totalRows = this.firstData.length;
        return (this.firstData = this.firstData.slice(
          this.currentPage * 10,
          (this.currentPage + 1) * 10
        ));
      }
    }
  },
  methods: {
    async fetchData() {
      const { data } = await axios.get(
        "http://starlord.hackerearth.com/beercraft"
      );
      this.beersData = data;
      this.totalRows = this.beersData.length;
      this.firstData = data.slice(0, 10);
    },

    sortData() {
      if (_isEmpty(this.searchBeer) && _isEmpty(this.selected)) {
        this.firstData = this.beersData.slice(
          this.currentPage * 10,
          (this.currentPage + 1) * 10
        );
      } else {
        this.firstData = this.firstData.slice(
          this.currentPage * 10,
          (this.currentPage + 1) * 10
        );
      }
    },

    addCartData(data) {
      this.cart.push(data);
      this.$session.set("cart", this.cart);
    },

    destroy() {
      this.$session.remove("cart");
    }
  },
  beforeMount() {
    this.fetchData();
    if (this.$session.get("cart")) {
      this.cart = this.$session.get("cart");
    }
  }
};
</script>
<style scoped>
.check {
  margin-left: 10px;
  width: 50%;
}
</style>

