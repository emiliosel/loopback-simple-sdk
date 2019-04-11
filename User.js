import PersistedModelService from "./PersistedModel";

export default class UserService extends PersistedModelService {
    /**
     * @description Login user with 
     * @param { Object } credentials { username: '', password: '' } or { email: '', password: '' }
     * @param { [String] | String } include String or Array of Strings Usually include = 'user'
     * @returns { Promise }
     */
    async login(credentials, include) {
        let res = await this.axios.post(
            this._buildBaseUrl('login'),
            credentials,
            {
                params: { include }
            }
        )
    
        this.Config.set('access_token', res.data.id)
        return res.data
    }
}