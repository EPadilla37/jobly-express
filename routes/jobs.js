"use strict";

const express = require("express");
const router = new express.Router();
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");
const Job = require("../models/job");
const { BadRequestError, NotFoundError } = require("../expressError");

/** POST / { job } => { job }
 *
 * Adds a new job.
 *
 * This returns the newly created job:
 *  { job: { id, title, salary, equity, companyHandle }}
 *
 * Authorization required: admin
 **/

router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (err) {
    return next(err);
  }
});

/** GET /  =>
 *   { jobs: [ { id, title, salary, equity, companyHandle }, ...] }
 *
 * Returns a list of all jobs.
 *
 * Can filter on provided search filters:
 * - title (case-insensitive, matches-any-part-of-string)
 * - minSalary (jobs with salary greater than or equal to the input)
 * - hasEquity (true returns jobs with equity > 0, false or not included returns all jobs)
 *
 * Authorization required: none
 **/

router.get("/", async (req, res, next) => {
  try {
    const jobs = await Job.findAll(req.query);
    return res.json({ jobs });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  =>  { job }
 *
 * Returns job data for specified job.
 *
 * Authorization required: none
 **/

router.get("/:id", async (req, res, next) => {
  try {
    const job = await Job.get(req.params.id);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[id] { fld1, fld2, ... } => { job }
 *
 * Updates job data.
 *
 * This returns the updated job:
 *  { job: { id, title, salary, equity, companyHandle }}
 *
 * Authorization required: admin
 **/

router.patch("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const job = await Job.update(req.params.id, req.body);
    return res.json({ job });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[id]  =>  { deleted: id }
 *
 * Authorization: admin
 **/

router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    await Job.remove(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
