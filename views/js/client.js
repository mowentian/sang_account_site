/**
 * Created by hpp on 2017/5/3.
 */

import Utils from './utils';

class Client {
  constructor(vue) {
    this.vue = vue;
  }

  fetchCB(resource, res) {
    this.vue.resources[resource] = res.body;
    for (const key in this.vue.resources) {
      if (this.vue.resources[key].length < 0) return;
    }
    this.vue.updateItems();
  }

  fetchResource(cb) {
    // eslint-disable-next-line
    for (const resource in this.vue.resources) {
      const thenCb = (res) => {
        this.fetchCB(resource, res);
        if (cb !== undefined) cb();
      };
      const errCb = (err) => {
        console.error(err);
      };
      if (this.vue.rangeResources !== undefined &&
        this.vue.rangeResources.indexOf(resource) !== -1) {
        const fund = this.vue.inserts.fund;
        const range = Utils.dateRangeToStr(this.vue.dateRange);
        this.vue.$http.get(`/api/resource/${resource}/${fund}/range/${range}`)
          .then(thenCb, errCb);
      } else {
        this.vue.$http.get(`/api/resource/${resource}`).then(thenCb, errCb);
      }
    }
  }

  updateResourceSelected(id, key, resources) {
    setTimeout(() => {
      const data = {};
      data[key] = Utils.findResourceId(
        this.vue.items.find(a => a.id === id)[key],
        this.vue.resources[resources]);
      this.vue.$http.put(`/api/resource/${this.vue.name}/${id}`, data)
        .then((res) => {
          console.log(res.body);
          if (res.body.success === 1) {
            this.fetchResource();
          }
        });
    }, 500);
  }

  updateResource(id, key) {
    setTimeout(() => {
      const data = {};
      data[key] = this.vue.items.find(a => a.id === id)[key];
      this.vue.$http.put(`/api/resource/${this.vue.name}/${id}`, data)
        .then((res) => {
          console.log(res.body);
          if (res.body.success === 1) {
            this.fetchResource();
          }
        });
    }, 500);
  }

  deleteResource(id) {
    this.vue.$http.delete(`/api/resource/${this.vue.name}/${id}`).then((res) => {
      console.log(res.body);
      if (res.body.success === 1) {
        this.fetchResource();
      }
    });
  }

  insertResource() {
    const columns = this.vue.headers;
    const data = {};
    for (const c of columns) {
      if (this.vue.inserts[c.value] !== '') {
        const v = this.vue.inserts[c.value];
        console.log(this.vue.inserts[c.value]);
        if (v === undefined) continue;
        data[c.value] = v.id !== undefined ? v.id : v;
      }
    }
    console.log(data);
    this.vue.$http.post(`/api/resource/${this.vue.name}`, data).then((res) => {
      console.log(res.body);
      if (res.body.success === 1) {
        for (const c of columns) {
          if (c.model !== undefined)
            this.vue[c.model] = '';
        }
        this.fetchResource();
      }
    });
  }
}

export default Client;
