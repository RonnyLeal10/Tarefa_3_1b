const Expert = require("../models/expert.model");
const { validationResult } = require("express-validator");

// LISTAR ESPECIALISTAS
exports.get = (req, res) => {
    Expert.find({})
        .exec((error, experts) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao obter especialistas."
                });
            }

            return res.status(200).send({
                body: experts
            });
        });
};

// ADICIONAR ESPECIALISTA
exports.create = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    new Expert({
        name: req.body.name,
        specialization: req.body.specialization,
        species: req.body.species
    }).save((error, expert) => {
        if (error) {
            return res.status(500).send({
                message: "Erro ao adicionar especialista."
            });
        }

        return res
            .status(201)
            .header("location", "/experts/" + expert._id)
            .send({
                body: expert
            });
    });
};

// EDITAR ESPECIALISTA
exports.update = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    Expert.findOneAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                name: req.body.name,
                specialization: req.body.specialization,
                species: req.body.species
            }
        },
        { new: true, runValidators: true },
        (error, expert) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao atualizar especialista."
                });
            }

            if (!expert) {
                return res.status(404).send({
                    message: "Especialista não encontrado."
                });
            }

            return res.status(200).send({
                body: expert
            });
        }
    );
};

// REMOVER ESPECIALISTA
exports.delete = (req, res) => {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.status(406).send(errors);
    }

    Expert.deleteOne(
        { _id: req.params.id },
        (error, result) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao remover especialista."
                });
            }

            if (result.deletedCount <= 0) {
                return res.status(404).send({
                    message: "Especialista não encontrado."
                });
            }

            return res.status(200).send({
                message: "Especialista removido com sucesso."
            });
        }
    );
};

// OBTER UM ESPECIALISTA
exports.getOne = (req, res) => {
    Expert.findOne({ _id: req.params.id })
        .exec((error, expert) => {
            if (error) {
                return res.status(500).send({
                    message: "Erro ao obter especialista."
                });
            }

            if (!expert) {
                return res.status(404).send({
                    message: "Especialista não encontrado."
                });
            }

            return res.status(200).send({
                body: expert
            });
        });
};
