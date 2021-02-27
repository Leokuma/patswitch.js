export default class Patswitch {
  constructor(obj) {
    if (!obj)
      throw new Error('Object required.');

    this._obj = obj;
    this._check = this.match.bind(this);
    return this._check;
  }

  match(obj) {
    return (this._match(obj, this._obj) ? this._check : false);
  }

  _match(obj1, obj2) {
    for (const prop in obj1) {
      if ((typeof obj1[prop] === 'object') && (typeof obj2[prop] === 'object')) {
        if (!this._match(obj1[prop], obj2[prop]))
          return false;
      }	else if ((obj1[prop] !== undefined) && (obj1[prop] !== obj2[prop])) {
        return false;
      }
    }
    return true;
  }
}