import PersistedModel from './PersistedModel'
import User from './User';
import settings from './settings'
export default {
    model(modelpluralName) {
        if (modelpluralName === 'users') {
            return new User('users', '')
        }
    }
}

