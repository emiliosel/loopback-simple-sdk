class Config {
  constructor(){
    if(! Config.instance){
      this._data = {}
      Config.instance = this
    }

    return Config.instance
  }
  
   //rest is the same code as preceding example
  set(key, value) {
    this._data[key] = value
  }

  get(key) {
    return this._data[key]
  }
}
  
const instance = new Config()
Object.freeze(instance)

export default instance