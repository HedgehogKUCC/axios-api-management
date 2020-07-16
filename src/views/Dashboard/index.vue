<template>
  <div class="container mt-5">
      <div>
        <div class="text-right">
          <button
            type="button"
            class="btn btn-outline-warning mr-3"
            @click="signout"
          >
            登出
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="openModal('new')"
          >
            迎接遛噠星人
          </button>
        </div>
        <table class="table mt-3">
          <thead>
            <tr>
              <th width="120">分類</th>
              <th>產品名稱</th>
              <th width="120">原價</th>
              <th width="120">售價</th>
              <th class="text-center" width="100">是否啟用</th>
              <th width="150">功能</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in pets" :key="item.id">
              <td>{{ item.category }}</td>
              <td>{{ item.title }}</td>
              <td class="text-right">{{ item.origin_price }}</td>
              <td class="text-right">{{ item.price }}</td>
              <td class="text-center">
                <span v-if="item.is_enabled" class="text-success">啟用</span>
                <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-primary"
                    @click="openModal('edit', item)"
                  >
                    編輯
                  </button>
                  <button
                    type="button"
                    class="btn btn-sm btn-outline-danger"
                    @click="openModal('del', item)"
                  >
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- productModal -->
        <div
          id="productModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                  <span v-if="modalFeature === 'new'">新增 遛噠星人 個資</span>
                  <span v-else-if="modalFeature === 'edit'">編輯個資</span>
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label for="imageUrl">輸入圖片網址</label>
                      <input
                        id="imageUrl"
                        v-model="tempData.imageUrl"
                        type="text"
                        class="form-control"
                        placeholder="請輸入圖片連結"
                      />
                    </div>
                    <img class="img-fluid" :src="tempData.imageUrl" alt />
                  </div>
                  <div class="col-sm-8">
                    <div class="form-group">
                      <label for="title">綽號</label>
                      <input
                        id="title"
                        v-model="tempData.title"
                        type="text"
                        class="form-control"
                        placeholder="請輸入綽號"
                      />
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="category">分類</label>
                        <input
                          id="category"
                          v-model="tempData.category"
                          type="text"
                          class="form-control"
                          placeholder="請輸入分類"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">單位</label>
                        <input
                          id="unit"
                          v-model="tempData.unit"
                          type="unit"
                          class="form-control"
                          placeholder="隻"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="origin_price">罐頭原價</label>
                        <input
                          id="origin_price"
                          v-model="tempData.origin_price"
                          type="number"
                          class="form-control"
                          placeholder="請輸入罐頭原價"
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="price">罐頭售價</label>
                        <input
                          id="price"
                          v-model="tempData.price"
                          type="number"
                          class="form-control"
                          placeholder="請輸入罐頭售價"
                        />
                      </div>
                    </div>
                    <hr />

                    <div class="form-group">
                      <label for="description">品種</label>
                      <textarea
                        id="description"
                        v-model="tempData.description"
                        type="text"
                        class="form-control"
                        placeholder="請輸入品種"
                      >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <label for="content">語錄</label>
                      <textarea
                        id="description"
                        v-model="tempData.content"
                        type="text"
                        class="form-control"
                        placeholder="請輸入 murmur"
                      >
                      </textarea>
                    </div>
                    <div class="form-group">
                      <div class="form-check">
                        <input
                          id="is_enabled"
                          v-model="tempData.is_enabled"
                          class="form-check-input"
                          type="checkbox"
                          :true-value="1"
                          :false-value="0"
                        />
                        <label class="form-check-label" for="is_enabled"
                          >是否啟用</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-dismiss="modal"
                >
                  取消
                </button>
                <button
                  v-if="modalFeature === 'new'"
                  type="button"
                  class="btn btn-primary"
                  @click="updatePets"
                >
                  新增確認
                </button>
                <button
                  v-else-if="modalFeature === 'edit'"
                  type="button"
                  class="btn btn-primary"
                  @click="updatePets"
                >
                  編輯確認
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- delProductModal -->
        <div
          id="delProductModal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="delProductModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content border-0">
              <div class="modal-header bg-danger text-white">
                <h5 id="delProductModalLabel" class="modal-title">
                  <span>刪除遛噠星人</span>
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                是否刪除
                <strong class="text-danger">{{ tempData.title }}</strong>
                資料檔(刪除後將無法恢復)。
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  data-dismiss="modal"
                >
                  取消
                </button>
                <button type="button" class="btn btn-danger" @click="delPet">
                  確認刪除
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import $ from 'jquery';
import { apiUserLogout } from '@/api/index';

export default {
  data() {
    return {
      pets: [
        {
          id: 1594291248631,
          unit: '隻',
          category: '喵星人',
          title: '愛睏喵',
          origin_price: 100,
          price: 50,
          description: '米克斯',
          content: '好想睡',
          is_enabled: 1,
          imageUrl: 'https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
        {
          id: 1594291965421,
          unit: '隻',
          category: '汪星人',
          title: '活潑汪',
          origin_price: 100,
          price: 50,
          description: '馬爾濟斯',
          content: '好想你',
          is_enabled: 0,
          imageUrl: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
        },
      ],
      tempData: {},
      modalFeature: '',
    };
  },
  methods: {
    openModal(features, item) {
      switch (features) {
        case 'new':
          this.modalFeature = features;
          this.tempData = {};
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.modalFeature = features;
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#productModal').modal('show');
          break;
        case 'del':
          this.modalFeature = features;
          this.tempData = JSON.parse(JSON.stringify(item));
          $('#delProductModal').modal('show');
          break;
        default:
          break;
      }
    },
    updatePets() {
      if (this.tempData.id) {
        this.pets.forEach((item, index) => {
          if (item.id === this.tempData.id) {
            this.pets[index] = this.tempData;
          }
        });
      } else {
        this.tempData.id = new Date().getTime();
        if (!this.tempData.is_enabled) {
          this.tempData.is_enabled = 0;
        }
        const newTempData = { ...this.tempData, unit: '隻' };
        this.pets.push(newTempData);
      }
      this.tempData = {};
      $('#productModal').modal('hide');
    },
    delPet() {
      if (this.tempData.id) {
        // FIXME: ESLint 提示用 object destructuring
        const { id } = this.tempData;
        console.log('id', id);
        this.pets.forEach((item, index) => {
          if (item.id === id) {
            this.pets.splice(index, 1);
            this.tempData = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
    signout() {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)0717Demo\s*=\s*([^;]*).*$)|^.*$/, '$1');

      const params = {
        Authorization: `Bearer ${token}`,
        api_token: `${token}`,
      };

      apiUserLogout(params).then((res) => {
        if (res.data.success) {
          this.$Toast.add('帳號登出成功', 'success');
          document.cookie = '0717Demo=; expires=;';
          this.$router.push('/');
        } else {
          this.$Toast.add(res.data.message, 'warning');
        }
      }).catch((err) => {
        console.log(err);
      });
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
