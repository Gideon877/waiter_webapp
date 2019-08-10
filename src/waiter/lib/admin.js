"use strict";

const _ = require("lodash");
const days = require('../lib/days');


module.exports = models => {
    const WaiterDays = models.WaiterDays;
    const Days = models.Days;
    const getDays = async () => {
        return Days.find();
    }

    const addDays = async () => {
        try {
            const results = await getDays();
            if (_.isEmpty(results)) {
                await Days.create(days)

            }
            const results_2= await getDays();
        } catch (error) {
            console.log(error.message);
        }

    }
    return {
        getDays,
        addDays
    };
};