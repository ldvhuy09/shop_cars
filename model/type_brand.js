var query = require('./query');


var TypeCar = () => {
  this._table = "_TYPE_CAR",
  this._att_id = "_type",
  this._att = '_type',

  this.loadAll = function() {
    return query._loadAll();
  },

  this.single = (_type) => {
    return query._single(this._table, this._att, _type);
  },

  this.add = (_type) => {
    return query._add(this._table, this._att, _type);
  },

  this.delete = (_type) => {
    return query._delete(this._table, this._att_id, _type);
  },

  this.update = (_type) => {
    return query._update(this._table, this._att, _type, this._att_id, _type);
  }
};

var BrandCar = () => {
  this._table = "_BRAND_CAR",
  this._att_id = "_brand",
  this._att = '_brand',

  this.loadAll = () => {
    return query._loadAll();
  }

  this.single = (_brand) => {
    return query._single(this._table, this._att, _brand);
  }

  this.add = (_brand) => {
    return query._add(this._table, this._att, _brand);
  }

  this.delete = (_brand) => {
    return query._delete(this._table, this._att_id, _brand);
  }

  this.update = (_brand) => {
    return query._update(this._table, this._att, _brand, this._att_id, _brand);
  }
}

module.exports = {
  TypeCar: {
    _table: "_TYPE_CAR",
    _att_id: "_type",
    _att: '_type',

    loadAll: function() {
      return query._loadAll(this._table);
    },

    single: (_type) => {
      return query._single(this._table, this._att, _type);
    },

    add: (_type) => {
      return query._add(this._table, this._att, _type);
    },

    delete: (_type) => {
      return query._delete(this._table, this._att_id, _type);
    },

    update: (_type) => {
      return query._update(this._table, this._att, _type, this._att_id, _type);
    }
  },

  BrandCar: {
    _table: "_BRAND_CAR",
    _att_id: "_brand",
    _att: '_brand',

    loadAll: function() {
      return query._loadAll(this._table);
    },

    single: (_brand) => {
      return query._single(this._table, this._att, _brand);
    },

    add: (_brand) => {
      return query._add(this._table, this._att, _brand);
    },

    delete: (_brand) => {
      return query._delete(this._table, this._att_id, _brand);
    },

    update: (_brand) => {
      return query._update(this._table, this._att, _brand, this._att_id, _brand);
    }
  }
};