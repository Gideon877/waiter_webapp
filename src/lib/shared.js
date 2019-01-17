'use strict'
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { BCryptRounds } = require('./constant');


module.exports = (models) => {
    const User = models.User;
    const Days = models.Days;

    /**
     * @param  { string } password
     */
    const hashPassword = (password) => {
        const password = _.isString(param) ? param : param.toString();
        return bcrypt.genSalt(BCryptRounds)
            .then(salt => {
                return bcrypt.hash(password, salt).then((result) => {
                    return result;
                });
            })
            .catch((err) => {
                return err;
            });
    };

    /**
     * @param  {Object} param
     * @param  {String} param.password
     * @param  {String} param.user.password
     */
    const decryptPassword = param => {
        let { password, user } = param;
        return bcrypt.compare(password, user.password)
        .then((result) => {
            return result;
        }).catch((err) => {
            return err;
        });
    };

	/************************************************************************* */

    /**
     * @param  { string } username
     * @requires username
     */
    const getUserByUsername = (username) => {
        return User.findOne({username});
    };

	const findUsersByType = (type) => {
		return User.find({type});
	}

	const findAllUsers = () => {
		return User.find();
	}

	const createUser = (params) => {
		return User.create(params);
	};

	const deleteUserByUsername = (username) => {
		return User.remove({username});
	};

	
	

	/************************************************************************* */

	const createDays = (params) => {
		return Days.create(params);
	};

	const removeAllDays = () => {
		return Days.remove();
	};

	const removeUserDaysByUsername = (username) => {
		return Days.remove({username});
	};


	const findDays = () => {
		return Days.find();
	}

	/**
	 * @param  { string } username
	 */
	const getUserDaysByUsername = (username) => {
		return Days.findOne({username});
	}


	const checkUser = async (username) => {
		try {
			let user = await getUserByUsername(username);
			return (!_.isEmpty(user) ? true : false);
		} catch (error) {
			return error;
		}
	};

	const checkUserLoginData = async (username, password) => {
		// check if user exist first
		let userExist = await checkUser(username);

		if (userExist) {
			// verify user password
			const user = await getUserByUsername(username);
			const checkPassword = await decryptPassword({password, user});
			return (checkPassword ? true : false);
		} 
		
		return false;
	}
	



    return {
       getUserByUsername,
       decryptPassword,
	   hashPassword,
	   checkUserLoginData
    //    createUser,
    //    createDays,
    //    findDays,
    //    getUserDays,
    //    findUsersByType
    //    findAllUsers
    }
}