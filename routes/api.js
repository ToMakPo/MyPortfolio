const db = require('../models')
const moment = require('moment')

/**
 * Check that the end date comes after the start date or is null.
 * @param {moment} startDate 
 * @param {moment} endDate 
 */
function verifyDates(startDate, endDate) {
    if (startDate === null) return 'Start date can not be null.'
    if (endDate !== null && endDate.isBefore(startDate)) return 'End date is set before start date.'
    return null
}

module.exports = function(app) {
    app.get('/api/getCertifications', (res, res) => res.json(db.Certifications.find()))
    app.get('/api/getEducation', (res, res) => res.json(db.Education.find().sort({startDate: "desc"})))
    app.get('/api/getProjects', (res, res) => res.json(db.Projects.find()))
    app.get('/api/getReferences', (res, res) => res.json(db.References.find()))
    app.get('/api/getSkills', (res, res) => res.json(db.Skills.find().sort({pinned: "desc"})))
    app.get('/api/getWorkHistory', (res, res) => res.json(db.WorkHistory.find().sort({startDate: "desc"})))

    /// ADMIN ///
    app.get('/api/checkAdminKey/:key', ({params: {key}}, res) => {
        res.json(key === process.env.ADMIN_KEY)
    })
    app.post('/api/addWorkHistory', ({body}, res) => {
        const err = verifyDates(body.startDate, body.endDate)
        if (err !== null) return res.json(error)
        db.WorkHistory.insertOne(body)
        res.json(body)
    })
};
