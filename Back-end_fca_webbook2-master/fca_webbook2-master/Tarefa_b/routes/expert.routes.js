const express = require("express");
const router = express.Router();

const ExpertController = require("../controllers/expert.controller");
const AuthController = require("../../controllers/auth.controller");

const {
    body,
    param
} = require("express-validator");

// LISTAR E ADICIONAR ESPECIALISTAS
router.route("/")
    .get(
        AuthController.checkAuth,
        ExpertController.get
    )
    .post(
        AuthController.checkAuth,
        [
            body("name").isString().isLength({ min: 1 }),
            body("specialization").isString().isLength({ min: 1 }),
            body("species").isString().isLength({ min: 1 })
        ],
        ExpertController.create
    );

// CONSULTAR, EDITAR E REMOVER ESPECIALISTA
router.route("/:id")
    .get(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.getOne
    )
    .put(
        AuthController.checkAuth,
        [
            param("id").isMongoId(),
            body("name").optional().isString().isLength({ min: 1 }),
            body("specialization").optional().isString().isLength({ min: 1 }),
            body("species").optional().isString().isLength({ min: 1 })
        ],
        ExpertController.update
    )
    .delete(
        AuthController.checkAuth,
        [param("id").isMongoId()],
        ExpertController.delete
    );

module.exports = router;
