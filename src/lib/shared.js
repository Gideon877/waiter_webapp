'use strict'
const _ = require('lodash');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { BCryptRounds, UserTypes } = require('./constant');


module.exports = (models) => {
    const User = models.User;
    const Days = models.Days;

    /**
     * @param  { string } password
     */
    const hashPassword = (param) => {
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

	/*********************************** User ************************************** */

    /**
     * @param  { string } username
     * @requires username
     */
    const getUserByUsername = (username) => {
        return User.findOne({username});
    };

	const getUserById = async (_id) => {
		return User.findOne({_id});

	}

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

	
	

	/********************************* days **************************************** */
	/**
	 * @param  {Object} params
	 * @param  {string} params.username
	 */
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
	
	const signUpCheck = async (params) => {
		const { password, username } = params;
		const userExist = await checkUser(username);
		const hashedPassword =  await hashPassword(password);
		console.log('userExist', userExist)
		if (!userExist) {
			let user = {
				username,
				password: hashedPassword,
				firstName: _.capitalize(params.firstName),
				lastName: _.capitalize(params.lastName),
				timestamp: {
					created: moment.utc() || new Date(),
					lastUpdated: moment.utc() || new Date()
				},
				type: UserTypes.Waiter
			};

			let days = {
				username,
				days: [],
				timestamp: {
					created: moment.utc() || new Date(),
                    lastUpdated: moment.utc() || new Date()
				}
			}
			let newUser = await createUser(user);
			let userDays = await createDays(days);
			return {
				days: userDays,
				user: newUser
			};
			
		}
		return false;
	}



    return {
       getUserByUsername,
       decryptPassword,
	   hashPassword,
	   checkUserLoginData,
	   signUpCheck,
	   getUserById
    //    createUser,
    //    createDays,
    //    findDays,
    //    getUserDays,
    //    findUsersByType
    //    findAllUsers
    }
}