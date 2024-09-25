var { Activity, Asset, User } = require("../models/models");
const {Op} = require("sequelize")

async function getSingleActivity(req, res, next) {
	try {
		let activityData = await Activity.findByPk(parseInt(req.params.id), { include: [ Asset, User ] });
		res.json(activityData);
	} catch (error) {
		console.log(error);
		res.status(500).end();
	}
}

async function getAllActivities(req, res, next) {
    try {
        let query = req.query.q;
        let whereClause = query ? { name: { [Op.like]: `%${query}%` } } : {};
        let activityData = await Activity.findAll({
            where: whereClause,
            include: [ Asset, User ]
        });
        res.json(activityData);
    } catch (error) {
        console.error(error);
        res.status(500).end();
    }
}

async function createSingleActivity(req, res, next) {
	try {
		let activityData = await Activity.create({
			name: req.fields.name,
			description: req.fields.description,
			weekday: req.fields.weekday,
			time: req.fields.time,
			maxParticipants: req.fields.maxParticipants,
			minAge: req.fields.minAge,
			maxAge: req.fields.maxAge,
			instructorId: req.fields.instructorId,
			assetId: req.fields.assetId
		});
		res.json(activityData);
	} catch (error) {
		console.error(error);
		res.status(500).end();
	}
}

module.exports = {
	createSingleActivity,
	getSingleActivity,
	getAllActivities
};
