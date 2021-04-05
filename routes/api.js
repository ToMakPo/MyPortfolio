const router = require("express").Router()
const db = require('../models')

router.get('/getCertifications', async (_, res) => res.json(await db.Certifications.find()))
router.get('/getEducation', async (_, res) => res.json(await db.Education.find().sort({startDate: "desc"})))
router.get('/getProjects', async (_, res) => res.json(await db.Projects.find()))
router.get('/getReferences', async (_, res) => res.json(await db.References.find()))
router.get('/getSkills', async (_, res) => res.json(await db.Skills.find().sort({pinned: "desc"})))
router.get('/getWorkHistory', async (_, res) => res.json(await db.WorkHistory.find().sort({startDate: "desc"})))

/// ADMIN ///
router.get('/checkAdminKey/:key', ({params: {key}}, res) => {
    res.json(key === process.env.ADMIN_KEY)
})
router.post('/addRecord/:table', async ({body, params: {table}}, res) => {
    res.json(await db[table].create(body))
})
router.put('/updateRecord/:table/:_id', async ({body, params: {table, _id}}, res) => {
    res.json(await db[table].updateOne({_id}, {$set: body}))
})
router.delete('/deleteRecord/:table/:_id', async ({params: {table, _id}}, res) => {
    res.json(await db[table].remove({_id}))
})

module.exports = router