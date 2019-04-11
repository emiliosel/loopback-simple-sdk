import Config from './Config'
import axios from 'axios'

class PersistedModelService {
  constructor ( modelPluralName, baseUrl ) {
    this.axios = axios
    this.modelPluralName = modelPluralName
    this.baseUrl = baseUrl.replace(/\/+$/, "") // trim right slashes
    this.Config = Config
    this.access_token = this.Config.get('access_token') // access_token is set to User Model
  }

  /**
   * @description Create a new instance of the model and persist it into the data
   * @param {[Object] | Object} data Array of Objects or Object
   * @return {Promise} Promise Created objects
   */
  async create(data) {
    let res = await this.axios.post(
      this._buildBaseUrl(),
      data,
      {
        params: this._buildQueryParams()
      }
    )
    return res.data
  }

  async createMany(data) {
    return this.create(data)
  }

  async find(filter) {
    let res = await this.axios.get(
      this._buildBaseUrl(),
      {
        params: this._buildQueryParams(filter)
      }
    )

    return res.data
  }

  async findOne(filter) {
    let res = await this.axios.get(
      this._buildBaseUrl('findOne'),
      {
        params: this._buildQueryParams(filter)
      }
    )

    return res.data
  }

  async findById(id, filter) {
    let res = await this.axios.get(
      this._buildBaseUrl(id),
      {
        params: this._buildQueryParams(filter)
      }
    )

    return res.data
  }

  // TODO
  async findOrCreate() {

  }

  async exists(id) {
    let res = await this.axios.head(
      this._buildBaseUrl(id),
      {
        params: this._buildQueryParams()
      }
    )

    return res.data
  }

  async count(filter) {
    let res = await this.axios.get(
      this._buildBaseUrl('count'),
      {
        params: this._buildQueryParams(filter)
      }
    )

    return res.data
  }

  async replaceById(id, data) {
    let res = await this.axios.post(
      this._buildBaseUrl(id, 'replace'),
      data,
      {
        params: this._buildQueryParams()
      }
    )

    return res.data
  }

  async replaceOrCreate(data) {
    let res = await this.axios.post(
      this._buildBaseUrl('replaceOrCreate'),
      data,
      {
        params: this._buildQueryParams()
      }
    )

    return res.data
  }

  async patchOrCreate(data) {
    let res = await this.axios.patch(
      this._buildBaseUrl(),
      data,
      {
        params: this._buildQueryParams()
      }
    )

    return res.data
  }

  async updateOrCreate(data) {
    return this.patchOrCreate(data)
  }

  async upsert(data) {
    return this.patchOrCreate(data)
  }

  async updateAll(where, data) {
    let res = await this.axios.post(
      this._buildBaseUrl('update'),
      data,
      {
        params: this._buildQueryParams({where})
      }
    )

    return res.data
  }

  

  /**
   * @description 
   * Update an existing model instance or insert a new one into the data source based on the where criteria.
   * 
   * @param {Object=} where Request parameters.
   *  - `where` – `{object=}` - Criteria to match model instances
   * 
   */
  async upsertWithWhere(where, data) {
    let res = await this.axios.get(
      this._buildBaseUrl('upsertWithWhere'),
      data,
      {
        params: this._buildQueryParams(where)
      }
    )

    return res.data
  }

  async deleteById(id) {
    let res = await this.axios.delete(
      this._buildBaseUrl(id),
      {
        params: this._buildQueryParams()
      }
    )

    return res.data
  }

  async destroyById(id) {
    return this.deleteById(id)
  }

  async removeById(id) {
    return this.deleteById(id)
  }

  _buildQueryParams(filter) {
    let access_token = this.Config.get('access_token')
    if (access_token) {
      if (!filter) filter = {}
      if (!filter.access_token) filter.access_token = access_token
    }
    return filter
  }

  _buildBaseUrl(id, kd) {
    let url = this.baseUrl + '/' + this.modelPluralName
    if (id) {
      url += '/' + id
    }
    if (kd) {
      url += '/' + kd
    }

    return url
  }

}

export default PersistedModelService
