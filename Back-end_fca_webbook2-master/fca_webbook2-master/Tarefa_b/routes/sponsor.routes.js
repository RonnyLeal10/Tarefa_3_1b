
const express = require("express");
const router = express.Router();

const SponsorController = require("../controllers/sponsor.controller");
const AuthController = require("../../controllers/auth.controller");

const {
    body,
    param
} = require("express-validator");

// LISTAR E ADICIONAR PATROCINADORES
router.route("/")
    .get(
        AuthController.checkAuth,
        SponsorController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body("name").isString().isLength({ min: 1 }),
            body("contact").isString().isLength({ min: 1 }),
            body("animal").isMongoId()
        ],
        SponsorController.create
    );

// CONSULTAR, EDITAR E REMOVER PATROCINADOR
router.route("/:id")
    .get(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        SponsorController.getOne
    )
    .put(
        AuthController.checkAuth,
        [
            param("id").isMongoId(),
            body("name").optional().isString().isLength({ min: 1 }),
            body("contact").optional().isString().isLength({ min: 1 }),
            body("animal").optional().isMongoId()
        ],
        SponsorController.update
    )
    .delete(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        SponsorController.delete
    );

module.exports = router;
