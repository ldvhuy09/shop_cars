var query = require('./query');


module.exports = {
  DbTable: function(_table, _att_id, _att) {
    this._table = _table,
    this._att_id = _att_id,
    this._att = _att,
    this.loadAll =  function() {
      return query._loadAll(this._table);
    },

    this.loadBy = function(_att, _val) {
      return query._loadBy(this._table, _att, _val);
    },

    this.loadLimit = function(_att, _val, _limit) {
      return query._loadLimit(this._table, _att, _val, _limit);
    },

    this.single =  function(_id) {
      return query._single(this._table, this._att_id, _id);
    },

    this.add =  function(_type) {
      return query._add(this._table, this._att, _type);
    },

    this.delete =  function(_type) {
      return query._delete(this._table, this._att_id, _type);
    },

    this.update =  function(_type) {
      return query._update(this._table, this._att, _type, this._att_id, _type);
    }

  }
}

// module.exports = {
//   DbTable: {
//     _table: "_TYPE_CAR",
//     _att_id: "_type",
//     _att: '_type',

//     loadAll: function() {
//       return query._loadAll(this._table);
//     },

//     single: (_type) => {
//       return query._single(this._table, this._att, _type);
//     },

//     add: (_type) => {
//       return query._add(this._table, this._att, _type);
//     },

//     delete: (_type) => {
//       return query._delete(this._table, this._att_id, _type);
//     },

//     update: (_type) => {
//       return query._update(this._table, this._att, _type, this._att_id, _type);
//     }
//   },

//   BrandCar: {
//     _table: "_BRAND_CAR",
//     _att_id: "_brand",
//     _att: '_brand',

//     loadAll: function() {
//       return query._loadAll(this._table);
//     },

//     single: (_brand) => {
//       return query._single(this._table, this._att, _brand);
//     },

//     add: (_brand) => {
//       return query._add(this._table, this._att, _brand);
//     },

//     delete: (_brand) => {
//       return query._delete(this._table, this._att_id, _brand);
//     },

//     update: (_brand) => {
//       return query._update(this._table, this._att, _brand, this._att_id, _brand);
//     }
//   }
// };